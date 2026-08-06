import { useState, useRef, useEffect } from "react";
import { Mail, Lock, ArrowRight, X, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import GoogleAuthButton from "./GoogleAuthButton";

export default function SignInCard() {
    const { openSignUp, closeAuth, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState({ email: false, password: false });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.trim().length > 0;
    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || loading) return;

        setError(null);
        setLoading(true);

        try {
            console.log("Calling authService.login...");
            const data = await authService.login({ email, password });
            console.log("authService.login returned:", data);
            console.log("Calling AuthContext.login(data)...");
            login(data);
            console.log("AuthContext.login(data) finished");
        } catch (err) {
            console.error("Email login caught error:", err);
            setError(err.message || "Unable to connect to server.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[440px] bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-[#FF9D00]/10 blur-[80px] pointer-events-none rounded-full" />
            
            <button 
                onClick={closeAuth}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-200 z-10"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="relative z-10">
                <div className="mb-6">
                    <h2 className="text-[28px] font-bold text-white mb-2">Welcome back</h2>
                    <p className="text-white/50 text-[15px]">Enter your credentials to access NimbusOps.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-400 text-[13px]">
                        <div className="mt-0.5">•</div>
                        <div>{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-white/80 ml-1 block">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className={`w-4 h-4 ${touched.email && !isEmailValid ? 'text-red-400' : 'text-white/40'}`} />
                            </div>
                            <input
                                ref={emailRef}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched({ ...touched, email: true })}
                                disabled={loading}
                                className={`w-full bg-white/5 border ${touched.email && !isEmailValid ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#FF9D00]/50'} rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 ${touched.email && !isEmailValid ? 'focus:ring-red-500' : 'focus:ring-[#FF9D00]/50'} transition-all disabled:opacity-50`}
                                placeholder="name@company.com"
                            />
                        </div>
                        {touched.email && !isEmailValid && email.length > 0 && (
                            <p className="text-red-400 text-[12px] ml-1 mt-1">Please enter a valid email address.</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-[13px] font-medium text-white/80 block">Password</label>
                            <a href="#" className="text-[12px] text-[#FF9D00] hover:text-[#FF9D00]/80 transition-colors">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="w-4 h-4 text-white/40" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF9D00]/50 focus:ring-1 focus:ring-[#FF9D00]/50 transition-all disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-1">
                        <input type="checkbox" id="remember" disabled={loading} className="w-4 h-4 rounded bg-white/5 border-white/10 accent-[#FF9D00] cursor-pointer disabled:opacity-50" />
                        <label htmlFor="remember" className="text-[13px] text-white/60 cursor-pointer select-none">Remember me for 30 days</label>
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full group flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                            isFormValid && !loading
                            ? 'bg-white text-black hover:bg-[#FF9D00] hover:scale-[1.02]' 
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
                            </>
                        )}
                    </button>
                    
                    <div className="relative flex items-center justify-center my-6">
                        <div className="absolute w-full h-[1px] bg-white/10" />
                        <span className="relative z-10 bg-[#0c0c0c] px-4 text-[12px] text-white/40 uppercase tracking-widest">Or continue with</span>
                    </div>

                    <GoogleAuthButton loading={loading} setLoading={setLoading} setError={setError} />
                </form>

                <p className="mt-8 text-center text-[14px] text-white/50">
                    Don't have an account?{' '}
                    <button onClick={openSignUp} disabled={loading} className="text-[#FF9D00] hover:text-[#FF9D00]/80 font-medium transition-colors disabled:opacity-50">
                        Create Account
                    </button>
                </p>
            </div>
        </div>
    );
}
