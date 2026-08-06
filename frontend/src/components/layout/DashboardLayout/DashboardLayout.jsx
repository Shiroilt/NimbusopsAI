import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopNavbar from '../TopNavbar/TopNavbar';
import PageContainer from '../PageContainer/PageContainer';

export default React.memo(function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex overflow-hidden">
      {/* Sidebar is fixed, layout pushes content via padding on desktop */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <PageContainer>
          {children}
        </PageContainer>
      </div>
    </div>
  );
});
