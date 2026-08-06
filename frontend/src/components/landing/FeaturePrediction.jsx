import { forwardRef } from "react";
import { Sparkles, ArrowDown } from "lucide-react";

const FeaturePrediction = forwardRef((props, ref) => {
    return (
        <div 
            ref={ref} 
            className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
            <div className="scene prediction max-w-[760px] w-full flex flex-col items-center pointer-events-auto translate-y-8">
                {/* Small Label */}
                <div className="mb-6">
                    <span className="text-[#FF9D00] text-[11px] font-semibold uppercase tracking-[0.25em]">
                        AI Prediction
                    </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.1] text-center mb-6">
                    Predict Workloads<br />Before They Peak
                </h2>

                {/* Description */}
                <p className="max-w-[600px] text-[17px] text-[#a0a0a0] leading-[1.6] text-center mb-12">
                    NimbusOps AI continuously analyzes infrastructure metrics, detects workload trends and predicts future resource demand before users experience slowdowns or failures.
                </p>

                {/* Visual Card */}
                <div className="w-full max-w-[500px] rounded-[24px] bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {/* Subtle Background Glow */}
                    <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-[#FF9D00]/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <span className="text-white/90 font-medium tracking-wide">AI Prediction Engine</span>
                        <div className="flex items-center gap-1.5 bg-[#FF9D00]/10 px-2.5 py-1 rounded-full border border-[#FF9D00]/20">
                            <Sparkles className="w-3.5 h-3.5 text-[#FF9D00]" />
                            <span className="text-[#FF9D00] text-[10px] uppercase font-bold tracking-wider">AI Active</span>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {/* Current CPU */}
                        <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/5">
                            <span className="text-white/60 text-sm">Current CPU</span>
                            <span className="text-white font-medium text-lg">38%</span>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center -my-2 relative z-20">
                            <div className="bg-[#111] border border-white/10 rounded-full p-1.5 shadow-sm">
                                <ArrowDown className="w-3.5 h-3.5 text-white/40" />
                            </div>
                        </div>

                        {/* Predicted CPU */}
                        <div className="flex items-center justify-between bg-[#FF9D00]/10 rounded-xl p-4 border border-[#FF9D00]/20">
                            <span className="text-[#FF9D00] text-sm font-medium">Predicted in 10 Minutes</span>
                            <span className="text-[#FF9D00] font-medium text-lg">86%</span>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center -my-2 relative z-20">
                            <div className="bg-[#111] border border-white/10 rounded-full p-1.5 shadow-sm">
                                <ArrowDown className="w-3.5 h-3.5 text-white/40" />
                            </div>
                        </div>

                        {/* Confidence */}
                        <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/5">
                            <span className="text-white/60 text-sm">Confidence</span>
                            <span className="text-white font-medium">92%</span>
                        </div>

                        {/* Recommendation */}
                        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                            <span className="text-white/60 text-sm">Recommendation</span>
                            <span className="text-white font-medium bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-lg text-sm shadow-sm">
                                Scale ECS Service (+2 Tasks)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="mt-8 text-[12px] text-white/30 tracking-wider">
                    Prediction generated from historical metrics and live telemetry.
                </p>
            </div>
        </div>
    );
});

FeaturePrediction.displayName = "FeaturePrediction";

export default FeaturePrediction;
