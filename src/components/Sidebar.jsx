import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, FaEdit, FaHistory, FaBullhorn, 
  FaMapMarkedAlt, FaUser, FaKey, FaSignOutAlt, FaTasks 
} from "react-icons/fa";

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user?.role === "ADMIN";

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-slate-200 z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-4 flex flex-col justify-between">
          <nav className="space-y-1">
            {!isAdmin ? (
              <>
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase mb-2">
                  User Menu
                </div>

                <NavLink to="/user" end className={navClass}>
                  <FaTachometerAlt /> Dashboard
                </NavLink>
                <NavLink to="/user/raise-issue" className={navClass}>
                  <FaEdit /> Raise Issue
                </NavLink>
                <NavLink to="/user/my-issues" className={navClass}>
                  <FaHistory /> Issue History
                </NavLink>
                <NavLink to="/user/notices" className={navClass}>
                  <FaBullhorn /> Notices
                </NavLink>
                <NavLink to="/user/gov-schemes" className={navClass}>
                  <FaMapMarkedAlt /> Nearby Services
                </NavLink>

                <div className="my-4 border-t" />

                <NavLink to="/user/profile" className={navClass}>
                  <FaUser /> My Profile
                </NavLink>
                <NavLink to="/user/change-password" className={navClass}>
                  <FaKey /> Change Password
                </NavLink>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase mb-2">
                  Admin Control
                </div>

                <NavLink to="/admin" end className={navClass}>
                  <FaTachometerAlt /> Dashboard
                </NavLink>
                <NavLink to="/admin/issues" className={navClass}>
                  <FaTasks /> Manage Issues
                </NavLink>
                <NavLink to="/admin/notices" className={navClass}>
                  <FaBullhorn /> Manage Notices
                </NavLink>
                <NavLink to="/admin/notices/new" className={navClass}>
                  <FaEdit /> Publish Notice
                </NavLink>
              </>
            )}
          </nav>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
