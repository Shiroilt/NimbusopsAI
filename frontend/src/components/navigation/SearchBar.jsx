import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
                type="text"
                placeholder="Search resources..."
                className="block w-full pl-10 pr-3 py-2 border border-[#262626] rounded-md leading-5 bg-[#1a1a1a] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#222] focus:border-[#FF9D00] focus:ring-0 sm:text-sm transition-colors"
            />
        </div>
    );
}
