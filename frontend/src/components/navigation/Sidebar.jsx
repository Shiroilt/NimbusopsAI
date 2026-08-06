import {
    Server,
    LayoutDashboard,
    Rocket,
    Activity,
    Shield,
    Settings,
    PlusCircle,
    LifeBuoy,
    BookOpen
} from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

export default function Sidebar() {
    return (
        <aside className="w-[280px] bg-[#111111] border-r border-[#262626] flex flex-col h-screen sticky top-0">
            {/* Header / Logo */}
            <div className="h-[72px] flex items-center px-6 border-b border-[#262626]">
                <Logo mode="dashboard" />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col">
                <SearchBar />

                <div className="space-y-1 mb-8">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Core
                    </p>
                    <NavItem to="/dashboard" mode="dashboard" icon={LayoutDashboard}>
                        Dashboard
                    </NavItem>
                    <NavItem to="/infrastructure" mode="dashboard" icon={Server}>
                        Infrastructure
                    </NavItem>
                    <NavItem to="/deployments" mode="dashboard" icon={Rocket}>
                        Deployments
                    </NavItem>
                    <NavItem to="/monitoring" mode="dashboard" icon={Activity}>
                        Monitoring
                    </NavItem>
                    <NavItem to="/security" mode="dashboard" icon={Shield}>
                        Security
                    </NavItem>
                </div>

                <div className="space-y-1 mt-auto pt-8 border-t border-[#262626]">
                    <NavItem to="/deploy" mode="dashboard" icon={PlusCircle}>
                        Deploy Resource
                    </NavItem>
                    <NavItem to="/support" mode="dashboard" icon={LifeBuoy}>
                        Support
                    </NavItem>
                    <NavItem to="/docs" mode="dashboard" icon={BookOpen}>
                        Documentation
                    </NavItem>
                    <NavItem to="/settings" mode="dashboard" icon={Settings}>
                        Settings
                    </NavItem>
                </div>
            </div>
            
            {/* Footer / User Profile Placeholder */}
            <div className="p-4 border-t border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ProfileMenu mode="dashboard" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200">Admin User</span>
                        <span className="text-xs text-gray-500">Workspace Owner</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
