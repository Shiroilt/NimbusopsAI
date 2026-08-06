import React, { useState } from 'react';
import { 
  Menu, X, LayoutDashboard, Server, Rocket, Activity, 
  ShieldCheck, Settings, Plus, LifeBuoy, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mainMenuItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: false },
  { icon: <Server size={20} />, label: 'Infrastructure', active: true },
  { icon: <Rocket size={20} />, label: 'Deployments', active: false },
  { icon: <Activity size={20} />, label: 'Monitoring', active: false },
  { icon: <ShieldCheck size={20} />, label: 'Security', active: false },
  { icon: <Settings size={20} />, label: 'Settings', active: false },
];

const bottomMenuItems = [
  { icon: <Plus size={20} />, label: 'Deploy Resource', isPrimary: true },
  { icon: <LifeBuoy size={20} />, label: 'Support' },
  { icon: <BookOpen size={20} />, label: 'Documentation' },
];

export default React.memo(function Sidebar({ isOpen, setIsOpen, className = '' }) {
  const [collapsed, setCollapsed] = useState(false);

  // Reusable NavItem Component with Tooltip Support
  const NavItem = ({ item, isBottom }) => (
    <div className="relative group">
      <div 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden
          ${item.isPrimary 
            ? 'bg-[#FF9D00]/10 text-[#FF9D00] hover:bg-[#FF9D00]/20 border border-[#FF9D00]/20' 
            : item.active 
              ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#FF9D00]' 
              : 'text-white/60 hover:bg-white/5 hover:text-white backdrop-blur-md'
          }
        `}
      >
        <span className={`shrink-0 transition-transform duration-300 ${item.active ? 'scale-110 text-[#FF9D00]' : 'group-hover:scale-110'}`}>
          {item.icon}
        </span>
        
        <div className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <span className="font-medium text-[14px] ml-1">{item.label}</span>
        </div>
      </div>
      
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
          {item.label}
          <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1a1a1a] border-l border-b border-white/10 rotate-45" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar Shell */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#111111] border-r border-white/5 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-[90px]' : 'w-[280px]'}
        ${className}`}
      >
        {/* Header */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-white/5 shrink-0">
          <div className={`flex flex-col overflow-hidden transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
            <span className="text-lg font-bold text-white tracking-wide whitespace-nowrap">NimbusOps <span className="text-[#FF9D00]">AI</span></span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Enterprise Cloud</span>
          </div>
          
          {collapsed && <span className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-[#FF9D00]">N</span>}
          
          <button 
            className="hidden lg:flex shrink-0 p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors z-10"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <button 
            className="lg:hidden shrink-0 p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors z-10"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 flex flex-col gap-1">
          {mainMenuItems.map((item, idx) => (
            <NavItem key={idx} item={item} />
          ))}
        </div>
        
        {/* Footer Navigation */}
        <div className="py-4 px-4 border-t border-white/5 flex flex-col gap-1 shrink-0 bg-white/[0.02]">
          {bottomMenuItems.map((item, idx) => (
            <NavItem key={idx} item={item} isBottom />
          ))}
        </div>
      </aside>
    </>
  );
});
