import { useState, useRef, useEffect } from "react";
import { Mail, Lock, User, ArrowRight, X, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

import GoogleAuthButton from "./GoogleAuthButton";

export default function SignUpCard() {
    const { openSignIn, closeAuth } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmPassword: false });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    const isNameValid = name.trim().length > 1;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 8;
    const isConfirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;
    const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || loading) return;

        setError(null);
        setLoading(true);

        try {
            const nameParts = name.trim().split(" ");
            const first_name = nameParts[0];
            const last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "-";

            await authService.register({
                email,
                password,
                first_name,
                last_name
            });

            setSuccess(true);
        } catch (err) {
            setError(err.message || "Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full max-w-[440px] bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-[#34A853]/10 blur-[80px] pointer-events-none rounded-full" />
                
                <button onClick={closeAuth} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10">
                    <X className="w-5 h-5" />
                </button>

                <CheckCircle2 className="w-16 h-16 text-[#34A853] mb-6 relative z-10" />
                <h2 className="text-[24px] font-bold text-white mb-2 relative z-10">Account Created!</h2>
                <p className="text-white/60 mb-8 relative z-10 text-[15px]">Account created successfully. Please sign in.</p>

                <button
                    onClick={openSignIn}
                    className="w-full relative z-10 bg-white text-black hover:bg-[#FF9D00] hover:scale-[1.02] py-3 rounded-xl font-medium transition-all duration-300"
                >
                    Sign In Now
                </button>
            </div>
        );
    }

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
                    <h2 className="text-[28px] font-bold text-white mb-2">Create Account</h2>
                    <p className="text-white/50 text-[15px]">Join NimbusOps and orchestrate your infrastructure.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-400 text-[13px]">
                        <div className="mt-0.5">•</div>
                        <div>{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-white/80 ml-1 block">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <User className={`w-4 h-4 ${touched.name && !isNameValid ? 'text-red-400' : 'text-white/40'}`} />
                            </div>
                            <input
                                ref={nameRef}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setTouched({ ...touched, name: true })}
                                disabled={loading}
                                className={`w-full bg-white/5 border ${touched.name && !isNameValid ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#FF9D00]/50'} rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 ${touched.name && !isNameValid ? 'focus:ring-red-500' : 'focus:ring-[#FF9D00]/50'} transition-all disabled:opacity-50`}
                                placeholder="Steve Jobs"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-white/80 ml-1 block">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className={`w-4 h-4 ${touched.email && !isEmailValid ? 'text-red-400' : 'text-white/40'}`} />
                            </div>
                            <input
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
                        <label className="text-[13px] font-medium text-white/80 ml-1 block">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className={`w-4 h-4 ${touched.password && !isPasswordValid ? 'text-red-400' : 'text-white/40'}`} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                                disabled={loading}
                                className={`w-full bg-white/5 border ${touched.password && !isPasswordValid ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#FF9D00]/50'} rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 ${touched.password && !isPasswordValid ? 'focus:ring-red-500' : 'focus:ring-[#FF9D00]/50'} transition-all disabled:opacity-50`}
                                placeholder="Min. 8 characters"
                            />
                        </div>
                        {touched.password && !isPasswordValid && password.length > 0 && (
                            <p className="text-red-400 text-[12px] ml-1 mt-1">Password must be at least 8 characters.</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-white/80 ml-1 block">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className={`w-4 h-4 ${touched.confirmPassword && !isConfirmPasswordValid ? 'text-red-400' : 'text-white/40'}`} />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                                disabled={loading}
                                className={`w-full bg-white/5 border ${touched.confirmPassword && !isConfirmPasswordValid ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#FF9D00]/50'} rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 ${touched.confirmPassword && !isConfirmPasswordValid ? 'focus:ring-red-500' : 'focus:ring-[#FF9D00]/50'} transition-all disabled:opacity-50`}
                                placeholder="Match your password"
                            />
                        </div>
                        {touched.confirmPassword && !isConfirmPasswordValid && confirmPassword.length > 0 && (
                            <p className="text-red-400 text-[12px] ml-1 mt-1">Passwords do not match.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full group flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-medium transition-all duration-300 ${
                            isFormValid && !loading
                            ? 'bg-white text-black hover:bg-[#FF9D00] hover:scale-[1.02]' 
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Create Account</span>
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
                    Already have an account?{' '}
                    <button onClick={openSignIn} disabled={loading} className="text-[#FF9D00] hover:text-[#FF9D00]/80 font-medium transition-colors disabled:opacity-50">
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
}
