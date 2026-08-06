import React from 'react';
import { Bell, HelpCircle, History, Menu, Search, User, Settings, LogOut } from 'lucide-react';
import Avatar from '../Avatar/Avatar';
import Dropdown from '../Dropdown/Dropdown';

export default React.memo(function TopNavbar({ onMenuClick, className = '' }) {
  const avatarDropdownItems = [
    { label: 'Profile', icon: <User size={16} /> },
    { label: 'Settings', icon: <Settings size={16} /> },
    { divider: true },
    { label: 'Logout', icon: <LogOut size={16} />, danger: true },
  ];

  return (
    <header className={`h-[72px] bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-all duration-300 ${className}`}>
      
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Enhanced Search Placeholder */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl text-white/40 text-sm hover:bg-white/5 hover:border-white/20 transition-all cursor-text min-w-[320px] group shadow-inner">
          <Search className="w-4 h-4 group-hover:text-[#FF9D00] transition-colors" />
          <span className="flex-1">Search resources, docs...</span>
          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <kbd className="px-1.5 py-0.5 text-[11px] font-sans font-medium bg-white/10 rounded border border-white/10 text-white/80">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[11px] font-sans font-medium bg-white/10 rounded border border-white/10 text-white/80">K</kbd>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all relative group">
          <History className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#2563EB] rounded-full ring-2 ring-[#0c0c0c]" />
        </button>
        
        <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all relative group hidden sm:block">
          <HelpCircle className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" />
        </button>
        
        <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all relative group">
          <Bell className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF9D00] rounded-full ring-2 ring-[#0c0c0c] animate-pulse" />
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block" />
        
        {/* Avatar with Dropdown placeholder */}
        <Dropdown 
          align="right"
          trigger={
            <div className="p-1 hover:bg-white/5 rounded-full transition-colors">
              <Avatar initials="AD" size="sm" className="hover:ring-2 hover:ring-[#FF9D00]/50 transition-all cursor-pointer" />
            </div>
          }
          items={avatarDropdownItems}
        />
      </div>
    </header>
  );
});
