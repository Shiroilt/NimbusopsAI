import { forwardRef } from "react";
import { Cloud, Mouse } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Hero = forwardRef((props, ref) => {
    const { openSignUp, openSignIn } = useAuth();

    return (
        <div
            ref={ref}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
            <div
                className="hero scene max-w-[760px] w-full flex flex-col items-center text-center pointer-events-auto -translate-y-10"
            >
                {/* Small Label */}
                <div className="hero-item flex items-center gap-2 mb-8">
                    <Cloud className="w-[14px] h-[14px] text-[#FF9D00]" />
                    <span className="text-[#FF9D00] text-[11px] font-semibold uppercase tracking-[0.25em]">
                        NimbusOps AI
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="hero-item text-[52px] md:text-[76px] font-bold text-white leading-[1.05] tracking-tight mb-8">
                    Predict Infrastructure<br />Before It Breaks.
                </h1>

                {/* Description */}
                <p className="hero-item max-w-[660px] text-[17px] text-[#a0a0a0] leading-[1.6] mb-12">
                    NimbusOps continuously monitors cloud infrastructure,
                    predicts workload spikes using machine learning,
                    and automatically scales compute resources before
                    performance degradation impacts users.
                </p>

                {/* Feature Tags */}
                <div className="hero-item flex flex-wrap justify-center gap-5 mb-12">
                    {["🧠 AI Prediction", "☁ AWS Integration", "⚡ Autonomous Scaling"].map((tag, i) => (
                        <div
                            key={i}
                            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/5 text-white/80 text-[14px] font-medium backdrop-blur-md hover:border-[#FF9D00]/40 hover:text-[#FF9D00] hover:bg-white/10 transition-colors duration-300 cursor-default"
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="hero-item flex flex-col sm:flex-row items-center gap-4">
                    <button onClick={openSignIn} className="h-[48px] px-8 rounded-full bg-[#FF9D00] text-black text-[15px] font-medium hover:bg-[#ffaa22] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,157,0,0.25)] transition-all duration-300">
                        Sign In
                    </button>
                    <button onClick={openSignUp} className="h-[48px] px-8 rounded-full bg-white/5 border border-white/20 text-white text-[15px] font-medium backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70 pointer-events-auto">
                <div className="animate-bounce">
                    <Mouse className="w-5 h-5 text-white/60" />
                </div>
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium">
                    Scroll to Explore
                </span>
            </div>
        </div>
    );
});

Hero.displayName = "Hero";

export default Hero;
