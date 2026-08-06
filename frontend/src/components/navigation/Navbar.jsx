import Logo from "./Logo";
import NavItem from "./NavItem";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ mode = "landing" }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { openSignIn, openSignUp, isAuthenticated, user, logout } = useAuth();

    if (mode === "dashboard") {
        return <Sidebar />;
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        openSignIn();
        setMobileMenuOpen(false);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        openSignUp();
        setMobileMenuOpen(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-8 left-0 right-0 z-50 w-[88%] max-w-7xl mx-auto h-[72px] bg-[#0c0c0c]/25 backdrop-blur-[18px] border border-white/10 rounded-[20px] flex items-center justify-between px-6 shadow-sm">
                <Logo mode="landing" />

                <nav className="hidden md:flex items-center gap-10">
                    <NavItem to="/architecture" mode="landing">
                        Architecture
                    </NavItem>
                    <NavItem to="/docs" mode="landing">
                        Documentation
                    </NavItem>
                </nav>
                
                <div className="hidden md:flex items-center gap-6">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 text-white/80">
                                <User className="w-4 h-4" />
                                <span className="text-[14px] font-medium">{user?.first_name} {user?.last_name}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-[14px]">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavItem to="#" mode="landing" isText onClick={handleSignIn}>
                                Sign In
                            </NavItem>
                            <NavItem to="#" mode="landing" isButton onClick={handleSignUp}>
                                Get Started
                            </NavItem>
                        </>
                    )}
                </div>

                <button 
                    className="md:hidden text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Mobile Menu */}
            <div 
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileMenuOpen(false)}
            />
            
            <div 
                className={`fixed top-0 right-0 z-[70] w-64 h-full bg-[#111111] border-l border-white/10 p-6 flex flex-col gap-8 transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end">
                    <button 
                        className="text-white/80 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="flex flex-col gap-6">
                    <NavItem to="/architecture" mode="landing" onClick={() => setMobileMenuOpen(false)}>
                        Architecture
                    </NavItem>
                    <NavItem to="/docs" mode="landing" onClick={() => setMobileMenuOpen(false)}>
                        Documentation
                    </NavItem>
                    <div className="h-px w-full bg-white/10 my-2"></div>
                    
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 text-white/80 px-4 py-2">
                                <User className="w-4 h-4" />
                                <span className="text-[14px] font-medium">{user?.first_name} {user?.last_name}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2 transition-colors duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-[14px]">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavItem to="#" mode="landing" isText onClick={handleSignIn}>
                                Sign In
                            </NavItem>
                            <NavItem to="#" mode="landing" isButton onClick={handleSignUp}>
                                Get Started
                            </NavItem>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
}
