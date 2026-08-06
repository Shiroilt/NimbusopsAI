import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authMode, setAuthMode] = useState("closed"); // 'closed' | 'signin' | 'signup'
    
    // Auth State
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const openSignIn = useCallback(() => setAuthMode("signin"), []);
    const openSignUp = useCallback(() => setAuthMode("signup"), []);
    const closeAuth = useCallback(() => setAuthMode("closed"), []);

    // Load from localStorage on startup
    useEffect(() => {
        const storedUser = localStorage.getItem("nimbus_user");
        const storedAccess = localStorage.getItem("nimbus_access_token");
        const storedRefresh = localStorage.getItem("nimbus_refresh_token");

        if (storedUser && storedAccess && storedRefresh) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedAccess);
            setRefreshToken(storedRefresh);
            setIsAuthenticated(true);
        }
        
        setIsLoading(false);
    }, []);

    const login = useCallback((response) => {
        console.log("AuthContext.login() called with data:", response);
        const { access, refresh, user: userData } = response;
        
        // Save to localStorage
        localStorage.setItem("nimbus_access_token", access);
        localStorage.setItem("nimbus_refresh_token", refresh);
        localStorage.setItem("nimbus_user", JSON.stringify(userData));
        console.log("Tokens saved to localStorage");
        
        // Update state
        setAccessToken(access);
        setRefreshToken(refresh);
        setUser(userData);
        setIsAuthenticated(true);
        console.log("AuthContext state updated: isAuthenticated=true");
        
        // Close modal if open
        closeAuth();
    }, [closeAuth]);

    const navigate = useNavigate();

    const logout = useCallback(async () => {
        const refresh = localStorage.getItem("nimbus_refresh_token");
        
        if (refresh) {
            try {
                await api.post('auth/logout/', { refresh });
            } catch (error) {
                // Ignore backend failures (network error, already blacklisted, etc.)
                console.warn("Backend logout failed, proceeding with local cleanup");
            }
        }

        // Remove from localStorage
        localStorage.removeItem("nimbus_access_token");
        localStorage.removeItem("nimbus_refresh_token");
        localStorage.removeItem("nimbus_user");
        
        // Reset state
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);

        // Redirect home
        navigate('/');
    }, [navigate]);

    // Listen for custom events dispatched by the Axios interceptor
    useEffect(() => {
        const handleTokenRefresh = (e) => {
            if (e.detail && e.detail.accessToken) {
                setAccessToken(e.detail.accessToken);
            }
        };

        const handleForceLogout = () => {
            logout();
        };

        window.addEventListener('nimbus:token_refresh', handleTokenRefresh);
        window.addEventListener('nimbus:force_logout', handleForceLogout);

        return () => {
            window.removeEventListener('nimbus:token_refresh', handleTokenRefresh);
            window.removeEventListener('nimbus:force_logout', handleForceLogout);
        };
    }, [logout]);

    return (
        <AuthContext.Provider value={{ 
            authMode, openSignIn, openSignUp, closeAuth,
            user, accessToken, refreshToken, isAuthenticated, isLoading,
            login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
