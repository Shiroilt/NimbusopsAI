# pyrefly: ignore [missing-import]
from rest_framework import generics
# pyrefly: ignore [missing-import]
from rest_framework.permissions import AllowAny
from .serializers import RegistrationSerializer

class RegistrationView(generics.CreateAPIView):
    """
    API endpoint to register a new user.
    Overrides global authentication to allow anonymous access.
    Returns 201 Created on success, 400 Bad Request on failure.
    """
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

# pyrefly: ignore [missing-import]
from rest_framework.response import Response
# pyrefly: ignore [missing-import]
from rest_framework import status
from .serializers import LoginSerializer

# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(generics.GenericAPIView):
    """
    API endpoint to authenticate a user.
    Returns JWT access and refresh tokens along with public user information.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    # TODO: Add throttling classes here in future phases (e.g., throttle_classes = [AnonRateThrottle])

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # Standardize response using AuthenticationResponseSerializer
        # pyrefly: ignore [missing-import]
        from .serializers import AuthenticationResponseSerializer
        response_serializer = AuthenticationResponseSerializer({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": user
        })
        
        return Response(response_serializer.data, status=status.HTTP_200_OK)

# pyrefly: ignore [missing-import]
from rest_framework.permissions import IsAuthenticated
from .serializers import LogoutSerializer, UserSerializer, UserProfileSerializer

class LogoutView(generics.GenericAPIView):
    """
    API endpoint to logout a user.
    Requires authentication. Blacklists the provided refresh token.
    Returns 205 Reset Content on success to instruct the client to flush its state.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)

class UserMeView(generics.RetrieveAPIView):
    """
    API endpoint to retrieve the currently authenticated user's public profile.
    Leverages JWTAuthentication. Executes exactly 1 database query via request.user.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint to retrieve and safely update the authenticated user's profile.
    Ensures users can only access their own profile (1 database query via request.user).
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

# pyrefly: ignore [missing-import]
from .serializers import GoogleLoginSerializer

class GoogleLoginView(generics.GenericAPIView):
    """
    API endpoint to authenticate a user via Google OAuth ID token.
    Uses GoogleAuthService for verification and AuthenticationResponseSerializer for response parity.
    """
    permission_classes = [AllowAny]
    serializer_class = GoogleLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # Standardize response
        # pyrefly: ignore [missing-import]
        from .serializers import AuthenticationResponseSerializer
        response_serializer = AuthenticationResponseSerializer({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": user
        })
        
        return Response(response_serializer.data, status=status.HTTP_200_OK)
