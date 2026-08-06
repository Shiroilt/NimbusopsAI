# pyrefly: ignore [missing-import]
from django.conf import settings
# pyrefly: ignore [missing-import]
from django.contrib.auth import get_user_model
# pyrefly: ignore [missing-import]
from django.utils import timezone
# pyrefly: ignore [missing-import]
from django.db import transaction
# pyrefly: ignore [missing-import]
from google.oauth2 import id_token
# pyrefly: ignore [missing-import]
from google.auth.transport import requests
# pyrefly: ignore [missing-import]
from google.auth.exceptions import GoogleAuthError
# pyrefly: ignore [missing-import]
from rest_framework.exceptions import AuthenticationFailed
# pyrefly: ignore [missing-import]
from accounts.models import UserProfile

User = get_user_model()

class GoogleAuthService:
    @staticmethod
    def verify_google_token(credential: str):
        """
        Verify the Google ID token and return user data.
        Raises AuthenticationFailed if verification fails.
        """
        try:
            if not getattr(settings, 'GOOGLE_CLIENT_ID', None):
                from django.core.exceptions import ImproperlyConfigured
                raise ImproperlyConfigured("GOOGLE_CLIENT_ID is not set in settings.")
            
            # Verify token
            idinfo = id_token.verify_oauth2_token(
                credential, requests.Request(), settings.GOOGLE_CLIENT_ID
            )
            
            # Check if email is verified
            if not idinfo.get('email_verified', False):
                raise AuthenticationFailed("Google email is not verified.")
                
            # Check audience and issuer (id_token.verify_oauth2_token already checks this by default, but we enforce it conceptually)
            if idinfo['aud'] != settings.GOOGLE_CLIENT_ID:
                raise AuthenticationFailed("Token audience mismatch.")
                
            return idinfo
            
        except ValueError:
            # Invalid token format or signature
            raise AuthenticationFailed("Invalid Google credential.")
        except GoogleAuthError:
            # Any official google-auth library exception
            raise AuthenticationFailed("Google authentication failed.")

    @staticmethod
    def authenticate_or_create_user(idinfo: dict):
        """
        Takes verified Google payload and performs account linking/creation.
        Executes atomically to prevent race conditions.
        Returns the User object.
        """
        email = idinfo.get('email')
        google_sub = idinfo.get('sub')
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        picture = idinfo.get('picture', '')

        if not email or not google_sub:
            raise AuthenticationFailed("Google payload missing email or subject.")

        with transaction.atomic():
            try:
                # Select user for update to prevent concurrent modification race conditions
                user = User.objects.select_for_update().get(email=email)
                
                # Get or create profile atomically
                profile, created = UserProfile.objects.get_or_create(user=user)
                
                # Verify google_sub matches if one exists, to prevent ATO
                if profile.google_sub and profile.google_sub != google_sub:
                    raise AuthenticationFailed("Google account mismatch. Email already registered to a different Google account.")
                
                # Link account if not linked
                if not profile.google_sub:
                    profile.google_sub = google_sub
                
                # Update names ONLY if they are currently blank
                name_updated = False
                if not user.first_name and first_name:
                    user.first_name = first_name
                    name_updated = True
                if not user.last_name and last_name:
                    user.last_name = last_name
                    name_updated = True
                if name_updated:
                    user.save(update_fields=['first_name', 'last_name'])

                # Synchronize specific Google fields
                profile.google_profile_picture = picture
                profile.google_last_sync = timezone.now()
                profile.last_google_login = timezone.now()
                profile.save(update_fields=['google_sub', 'google_profile_picture', 'google_last_sync', 'last_google_login'])
                
                return user
                
            except User.DoesNotExist:
                # New User creation
                user = User.objects.create_user(
                    email=email,
                    first_name=first_name,
                    last_name=last_name
                )
                
                UserProfile.objects.create(
                    user=user,
                    google_sub=google_sub,
                    google_profile_picture=picture,
                    google_last_sync=timezone.now(),
                    last_google_login=timezone.now()
                )
                
                return user
