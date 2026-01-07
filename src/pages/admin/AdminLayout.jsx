import { Outlet, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Hard protection
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden flex flex-col">
      <Header onMenuClick={toggleSidebar} />

      <div className="flex h-full pt-16">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
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

export default AdminLayout;
