import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

export default function GoogleAuthButton({ loading, setLoading, setError }) {
    const { login } = useAuth();

    const handleGoogleSuccess = async (credentialResponse) => {
        if (loading) return;
        setError(null);
        setLoading(true);

        try {
            const data = await authService.googleLogin(credentialResponse.credential);
            login(data);
        } catch (err) {
            setError(err.message || "Google authentication failed.");
            setLoading(false);
        }
    };

    return (
        <div className={`w-full flex justify-center ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login widget failed.")}
                useOneTap
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
                width={320}
            />
        </div>
    );
}
