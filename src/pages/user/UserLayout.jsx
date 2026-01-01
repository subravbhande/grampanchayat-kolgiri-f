import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function UserLayout() {
  // Initialize: Open on Desktop (width > 768px), Closed on Mobile
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Toggle Function: Switches between True/False
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden flex flex-col">
      {/* Pass toggle function to Header */}
      <Header onMenuClick={toggleSidebar} />
      
      <div className="flex h-full pt-16">
        {/* Sidebar Component */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area 
            - Added transition-all for smooth animation
            - Added md:ml-64 to push content when sidebar is open on desktop
            - If sidebarOpen is false, margin is 0 (full width)
        */}
        <main 
          className={`flex-1 h-full overflow-y-auto p-6 transition-all duration-300 ${
            sidebarOpen ? "md:ml-64" : ""
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserLayout;