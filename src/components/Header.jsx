import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";

function Header({ onMenuClick }) {
  const user =
    JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "Visitor" };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30 shadow-sm">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
        >
          <FaBars className="text-xl" />
        </button>

        <span className="font-bold text-lg text-slate-800 tracking-tight hidden sm:block">
          Gram Panchayat Kolgiri
        </span>
      </div>

      {/* Right: Clickable User Area */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 focus:outline-none"
        >
          {/* Name + Role */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-tight">
              {user.name}
            </p>
            <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
              {user.role}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md">
            {user.name !== "Guest"
              ? user.name.charAt(0).toUpperCase()
              : <FaUser />}
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/user/profile");
              }}
              className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-slate-50 text-slate-700"
            >
              <FaUser />
              View Profile
            </button>

            <button
              onClick={logout}
              className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-red-50 text-red-600"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
