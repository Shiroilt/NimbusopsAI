import { User } from "lucide-react";

export default function ProfileMenu({ mode }) {
    return (
        <button
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border ${
                mode === "dashboard" ? "border-[#262626]" : "border-gray-700"
            } hover:border-[#FF9D00] transition-colors overflow-hidden group`}
        >
            <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>
    );
}
