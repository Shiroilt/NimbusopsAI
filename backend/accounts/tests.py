# pyrefly: ignore [missing-import]
from rest_framework.test import APITestCase
# pyrefly: ignore [missing-import]
from rest_framework import status
# pyrefly: ignore [missing-import]
from django.urls import reverse
# pyrefly: ignore [missing-import]
from django.contrib.auth import get_user_model
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import UserProfile

User = get_user_model()

class RegistrationTests(APITestCase):
    def setUp(self):
        self.url = reverse('register')
        self.valid_payload = {
            'email': 'test@example.com',
            'password': 'StrongPassword123!',
            'password_confirm': 'StrongPassword123!',
            'first_name': 'Test',
            'last_name': 'User'
        }

    def test_successful_registration(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='test@example.com').exists())
        self.assertIn('id', response.data)
        self.assertNotIn('password', response.data)

    def test_duplicate_email(self):
        User.objects.create_user(email='test@example.com', password='password123')
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_password_mismatch(self):
        payload = self.valid_payload.copy()
        payload['password_confirm'] = 'DifferentPassword123!'
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password_confirm', response.data)

    def test_weak_password(self):
        payload = self.valid_payload.copy()
        payload['password'] = '123'
        payload['password_confirm'] = '123'
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_missing_fields(self):
        response = self.client.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn('password', response.data)


class LoginTests(APITestCase):
    def setUp(self):
        self.url = reverse('login')
        self.user = User.objects.create_user(
            email='login@example.com',
            password='StrongPassword123!',
            first_name='Login',
            last_name='User'
        )
        self.valid_payload = {
            'email': 'login@example.com',
            'password': 'StrongPassword123!'
        }

    def test_successful_login(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['email'], 'login@example.com')
        self.assertIn('id', response.data['user'])
        self.assertIn('first_name', response.data['user'])
        self.assertIn('last_name', response.data['user'])
        self.assertIn('date_joined', response.data['user'])
        self.assertIn('last_login', response.data['user'])
        self.assertNotIn('password', response.data)

    def test_wrong_password(self):
        payload = self.valid_payload.copy()
        payload['password'] = 'WrongPassword!'
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_unknown_email(self):
        payload = self.valid_payload.copy()
        payload['email'] = 'unknown@example.com'
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_inactive_account(self):
        self.user.is_active = False
        self.user.save()
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_missing_password(self):
        payload = {'email': 'login@example.com'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_missing_email(self):
        payload = {'password': 'StrongPassword123!'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)


class JWTAuthenticationTests(APITestCase):
    def setUp(self):
        self.refresh_url = reverse('token_refresh')
        self.user = User.objects.create_user(
            email='jwt@example.com',
            password='StrongPassword123!'
        )
        self.token = RefreshToken.for_user(self.user)

    def test_refresh_token(self):
        payload = {'refresh': str(self.token)}
        response = self.client.post(self.refresh_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        # Because ROTATE_REFRESH_TOKENS=True, it should also return a new refresh token
        self.assertIn('refresh', response.data)

    def test_invalid_refresh_token(self):
        payload = {'refresh': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature'}
        response = self.client.post(self.refresh_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['code'], 'token_not_valid')

    def test_blacklisted_token(self):
        # Blacklist the token
        self.token.blacklist()
        payload = {'refresh': str(self.token)}
        response = self.client.post(self.refresh_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_malformed_jwt_header(self):
        # Protected endpoints aren't built yet, but we can test that passing a malformed header doesn't crash
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid_token')
        response = self.client.get(reverse('login')) # Using allow-any endpoint just to check no 500 error
        self.assertNotEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogoutTests(APITestCase):
    def setUp(self):
        self.url = reverse('logout')
        self.user = User.objects.create_user(
            email='logout@example.com',
            password='StrongPassword123!'
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')

    def test_successful_logout(self):
        payload = {'refresh': str(self.token)}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

    def test_logout_invalid_refresh_token(self):
        payload = {'refresh': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('refresh', response.data)

    def test_logout_already_blacklisted_token(self):
        self.token.blacklist()
        payload = {'refresh': str(self.token)}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('refresh', response.data)

    def test_logout_without_authentication(self):
        self.client.credentials() # clear credentials
        payload = {'refresh': str(self.token)}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_missing_refresh_token(self):
        response = self.client.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('refresh', response.data)

class UserMeTests(APITestCase):
    def setUp(self):
        self.url = reverse('me')
        self.user = User.objects.create_user(
            email='me@example.com',
            password='StrongPassword123!',
            first_name='Me',
            last_name='User'
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')

    def test_valid_jwt(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'me@example.com')
        self.assertIn('id', response.data)
        self.assertIn('first_name', response.data)
        self.assertIn('last_name', response.data)
        self.assertIn('date_joined', response.data)
        self.assertNotIn('password', response.data)
        self.assertNotIn('is_superuser', response.data)

    def test_no_jwt(self):
        self.client.credentials()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_malformed_jwt(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid.token.value')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_expired_jwt(self):
        # We simulate expiration by artificially backdating the token and re-encoding it
        access = self.token.access_token
        access.payload['exp'] -= 36000
        # pyrefly: ignore [missing-import]
        from rest_framework_simplejwt.state import token_backend
        expired_token_string = token_backend.encode(access.payload)
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {expired_token_string}')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_inactive_user(self):
        self.user.is_active = False
        self.user.save()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class UserProfileTests(APITestCase):
    def setUp(self):
        self.url = reverse('profile')
        self.user = User.objects.create_user(
            email='profile@example.com',
            password='StrongPassword123!',
            first_name='Profile',
            last_name='User'
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')

    def test_get_profile(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'profile@example.com')
        self.assertIn('first_name', response.data)
        self.assertIn('last_name', response.data)
        self.assertIn('last_login', response.data)

    def test_update_first_name(self):
        payload = {'first_name': 'Updated'}
        response = self.client.patch(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Updated')
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Updated')

    def test_update_last_name(self):
        payload = {'last_name': 'Name'}
        response = self.client.patch(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['last_name'], 'Name')
        self.user.refresh_from_db()
        self.assertEqual(self.user.last_name, 'Name')

    def test_update_both(self):
        payload = {'first_name': 'New', 'last_name': 'Name'}
        response = self.client.patch(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'New')
        self.assertEqual(self.user.last_name, 'Name')

    def test_attempt_email_update(self):
        payload = {'email': 'hacked@example.com'}
        response = self.client.patch(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertEqual(response.data['email'][0], 'This field cannot be updated.')
        
    def test_attempt_protected_fields_update(self):
        protected_fields = [
            'id', 'password', 'date_joined', 'last_login',
            'is_staff', 'is_superuser', 'groups', 'user_permissions', 'is_active'
        ]
        
        for field in protected_fields:
            payload = {field: 'some_value'}
            response = self.client.patch(self.url, payload, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertIn(field, response.data)
            self.assertEqual(response.data[field][0], 'This field cannot be updated.')

    def test_attempt_multiple_protected_fields_update(self):
        payload = {
            'email': 'hacked@example.com',
            'password': 'newpassword123',
            'first_name': 'Allowed'
        }
        response = self.client.patch(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn('password', response.data)
        # Verify first_name didn't get updated because the whole request is rejected
        self.user.refresh_from_db()
        self.assertNotEqual(self.user.first_name, 'Allowed')

    def test_unauthenticated(self):
        self.client.credentials()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_malformed_jwt(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer garbage')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_expired_jwt(self):
        access = self.token.access_token
        access.payload['exp'] -= 36000
        # pyrefly: ignore [missing-import]
        from rest_framework_simplejwt.state import token_backend
        expired_token_string = token_backend.encode(access.payload)
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {expired_token_string}')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# pyrefly: ignore [missing-import]
# pyrefly: ignore [missing-import]
from unittest.mock import patch
from django.conf import settings

class GoogleLoginTests(APITestCase):
    def setUp(self):
        self.url = reverse('google_login')
        self.valid_payload = {'credential': 'fake_google_id_token'}
        
        self.mock_idinfo = {
            'email': 'google@example.com',
            'sub': '1234567890',
            'given_name': 'Google',
            'family_name': 'User',
            'picture': 'https://example.com/photo.jpg',
            'email_verified': True,
            'aud': settings.GOOGLE_CLIENT_ID
        }

    @patch('accounts.services.google_auth.id_token.verify_oauth2_token')
    def test_new_google_user(self, mock_verify):
        mock_verify.return_value = self.mock_idinfo
        
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('user', response.data)
        
        user = User.objects.get(email='google@example.com')
        self.assertEqual(user.profile.google_sub, '1234567890')
        self.assertEqual(user.first_name, 'Google')
        
    @patch('accounts.services.google_auth.id_token.verify_oauth2_token')
    def test_existing_user_linking(self, mock_verify):
        # Create user without Google sub
        user = User.objects.create_user(email='google@example.com', password='password123')
        # Simulate Profile existing
        UserProfile.objects.get_or_create(user=user)
        
        mock_verify.return_value = self.mock_idinfo
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        user.refresh_from_db()
        self.assertEqual(user.profile.google_sub, '1234567890')

    @patch('accounts.services.google_auth.id_token.verify_oauth2_token')
    def test_unverified_email_rejection(self, mock_verify):
        invalid_info = self.mock_idinfo.copy()
        invalid_info['email_verified'] = False
        mock_verify.return_value = invalid_info
        
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('accounts.services.google_auth.id_token.verify_oauth2_token')
    def test_duplicate_email_prevention_ato(self, mock_verify):
        # Create user with DIFFERENT Google sub
        user = User.objects.create_user(email='google@example.com', password='password123')
        UserProfile.objects.create(user=user, google_sub='DIFFERENT_SUB_001')
        
        mock_verify.return_value = self.mock_idinfo # Uses sub '1234567890'
        
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
