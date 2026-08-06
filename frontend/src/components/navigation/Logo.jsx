import { Cloud } from "lucide-react";

export default function Logo({ mode }) {
    const isDashboard = mode === "dashboard";

    return (
        <div className="flex items-center gap-2">
            <Cloud className={`w-8 h-8 ${isDashboard ? 'text-[#FF9D00]' : 'text-white'}`} />
            <span
                className={`font-bold text-xl tracking-tight ${
                    isDashboard ? "text-white" : "text-white"
                }`}
            >
                NimbusOps<span className="text-[#FF9D00]">AI</span>
            </span>
        </div>
    );
}
