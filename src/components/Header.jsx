import { FaBars, FaCity, FaUser } from "react-icons/fa";

function Header({ onMenuClick }) {
  // Safely parse user data
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "Visitor" };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30 shadow-sm">
      
      {/* Left Side: Menu & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          <FaBars className="text-xl" />
        </button>
        
        <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-200">
               <FaCity />
            </div> */}
            <span className="font-bold text-lg text-slate-800 tracking-tight hidden sm:block">
              Gram Panchayat Kolgiri
            </span>
        </div>
      </div>

      {/* Right Side: User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-tight">{user.name}</p>
            <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
              {user.role}
            </span>
        </div>
        
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md">
             {user.name !== "Guest" ? user.name.charAt(0).toUpperCase() : <FaUser />}
        </div>
      </div>
    </header>
  );
}

export default Header;