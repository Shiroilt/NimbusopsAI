import { forwardRef } from "react";
import { Activity, Cpu, Zap, Cloud } from "lucide-react";
import ArchitectureCard from "./ArchitectureCard";
import PipelineConnector from "./PipelineConnector";

const Scene3 = forwardRef((props, ref) => {
    const stages = [
        {
            icon: Cloud,
            title: "Collect Metrics",
            description: "Continuous telemetry ingestion from your cloud infrastructure in real-time."
        },
        {
            icon: Cpu,
            title: "AI Analysis",
            description: "Deep learning models analyze historical patterns and current resource usage."
        },
        {
            icon: Zap,
            title: "Predict Failure",
            description: "Identify performance bottlenecks and predict exact failure thresholds."
        },
        {
            icon: Activity,
            title: "Auto Scale",
            description: "Autonomous, preemptive scaling of containers before users are impacted."
        }
    ];

    return (
        <div 
            ref={ref}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
            <div className="scene-3 w-full max-w-[1200px] flex flex-col pointer-events-auto">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <span className="text-[#FF9D00] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block">
                        How NimbusOps Works
                    </span>
                    <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-[1.1]">
                        One AI Platform.<br />Four Intelligent Stages.
                    </h2>
                </div>

                {/* Pipeline */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between w-full relative">
                    {stages.map((stage, index) => (
                        <div key={index} className="flex flex-col lg:flex-row items-center flex-1">
                            <ArchitectureCard 
                                icon={stage.icon}
                                title={stage.title}
                                description={stage.description}
                                index={index + 1}
                            />
                            {index < stages.length - 1 && <PipelineConnector />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

Scene3.displayName = "Scene3";

export default Scene3;
