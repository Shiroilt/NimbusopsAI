import { NavLink } from "react-router-dom";

export default function NavItem({ to, icon: Icon, children, mode, isButton = false, isText = false, onClick }) {
    if (mode === "landing") {
        if (isButton) {
            return (
                <button
                    type="button"
                    onClick={onClick}
                    className="inline-flex items-center justify-center h-[44px] px-6 text-[16px] font-medium text-white transition-colors duration-300 bg-white/10 rounded-full hover:bg-[#FF9D00] hover:text-black"
                >
                    {children}
                </button>
            );
        }

        if (isText) {
            return (
                <button
                    type="button"
                    onClick={onClick}
                    className="text-[16px] font-medium text-white/80 hover:text-white transition-colors duration-300"
                >
                    {children}
                </button>
            );
        }

        return (
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    `group relative text-[16px] font-medium transition-colors duration-[250ms] ${
                        isActive ? "text-white" : "text-white/80 hover:text-[#FF9D00]"
                    }`
                }
            >
                {children}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF9D00] transition-all duration-[250ms] ease-out group-hover:w-full" />
            </NavLink>
        );
    }

    // Dashboard mode
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center px-3 py-2 my-1 text-sm font-medium rounded-md transition-all duration-200 group ${
                    isActive
                        ? "bg-[#FF9D00]/10 text-[#FF9D00]"
                        : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                }`
            }
        >
            {Icon && (
                <Icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        "group-[.active]:text-[#FF9D00]"
                    }`}
                />
            )}
            {children}
        </NavLink>
    );
}
