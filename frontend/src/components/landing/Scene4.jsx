import { forwardRef } from "react";
import { useAuth } from "../../context/AuthContext";

const Scene4 = forwardRef((props, ref) => {
    const { openSignIn, openSignUp } = useAuth();

    return (
        <div 
            ref={ref}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
            <div className="scene max-w-[760px] w-full flex flex-col items-center text-center pointer-events-auto">
                <span className="text-[#FF9D00] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block">
                    Get Started Today
                </span>
                
                <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.1] mb-6">
                    Ready to Automate<br />Your Infrastructure?
                </h2>
                
                <p className="max-w-[600px] text-[17px] text-[#a0a0a0] leading-[1.6] mb-12">
                    Join leading engineering teams using NimbusOps to predict failures, eliminate downtime, and scale autonomously.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button 
                        onClick={openSignUp}
                        className="h-[48px] px-8 rounded-full bg-[#FF9D00] text-black text-[15px] font-medium hover:bg-[#ffaa22] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,157,0,0.25)] transition-all duration-300"
                    >
                        Create Account
                    </button>
                    <button 
                        onClick={openSignIn}
                        className="h-[48px] px-8 rounded-full bg-white/5 border border-white/20 text-white text-[15px] font-medium backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
});

Scene4.displayName = "Scene4";

export default Scene4;
