# pyrefly: ignore [missing-import]
from rest_framework import serializers
# pyrefly: ignore [missing-import]
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validators
# pyrefly: ignore [missing-import]
from django.core.exceptions import ValidationError

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Handles email uniqueness, password confirmation, and password strength validation.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'password_confirm', 'date_joined')
        read_only_fields = ('id', 'date_joined')

    def validate(self, data):
        """
        Ensure passwords match and meet strength requirements.
        """
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        
        # Validate password strength natively
        try:
            validators.validate_password(password=data.get('password'))
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
            
        return data

    def create(self, validated_data):
        """
        Create the user with hashed password.
        """
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

# pyrefly: ignore [missing-import]
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    Validates credentials securely without issuing tokens.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Use Django's authentication backend
        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            # Generic error to prevent email enumeration
            raise serializers.ValidationError({"non_field_errors": ["Invalid email or password."]})
            
        if not user.is_active:
            raise serializers.ValidationError({"non_field_errors": ["Invalid email or password."]}) # Generic error to prevent enumeration

        data['user'] = user
        return data

# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class LogoutSerializer(serializers.Serializer):
    """
    Serializer for user logout.
    Validates and blacklists the provided refresh token.
    """
    refresh = serializers.CharField(required=True)

    def validate(self, data):
        self.token = data.get('refresh')
        return data

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            raise serializers.ValidationError({"refresh": "Token is invalid or expired."})

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning public user information.
    Specifically engineered to exclude sensitive credentials, hashes, and permission flags.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'date_joined')
        read_only_fields = ('id', 'email', 'first_name', 'last_name', 'date_joined')

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving and safely updating user profile.
    Exposes last_login in addition to public info, but restricts PATCH to name fields.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'date_joined', 'last_login')
        read_only_fields = ('id', 'email', 'date_joined', 'last_login')

    def validate(self, attrs):
        # Prevent silent ignoring of read-only/protected fields
        protected_fields = {
            'id', 'email', 'password', 'date_joined', 'last_login',
            'is_staff', 'is_superuser', 'groups', 'user_permissions', 'is_active'
        }
        
        errors = {}
        for field in protected_fields:
            if field in self.initial_data:
                errors[field] = ["This field cannot be updated."]
                
        if errors:
            raise serializers.ValidationError(errors)
            
        return attrs

    def validate_first_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("First name cannot be blank.")
        return value

    def validate_last_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Last name cannot be blank.")
        return value

class AuthenticationResponseSerializer(serializers.Serializer):
    """
    Standardized response serializer for all authentication methods.
    Guarantees that Email Login, Google OAuth, etc., return identical JSON structures.
    """
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserProfileSerializer()

# pyrefly: ignore [missing-import]
from accounts.services.google_auth import GoogleAuthService

class GoogleLoginSerializer(serializers.Serializer):
    """
    Serializer to accept and validate Google ID token.
    Delegates actual verification and user creation to GoogleAuthService.
    """
    credential = serializers.CharField(required=True)

    def validate(self, data):
        credential = data.get('credential')
        
        # Verify with Google Service Layer
        idinfo = GoogleAuthService.verify_google_token(credential)
        
        # Authenticate or create user
        user = GoogleAuthService.authenticate_or_create_user(idinfo)
        
        data['user'] = user
        return data
