import { useState } from "react";
import { FaSearch, FaLandmark, FaHospital, FaSchool, FaUniversity, FaBuilding } from "react-icons/fa";

function GovServices() {
  const [query, setQuery] = useState("");
  const village = "near me"; // Keeps search local to user

  const services = [
    { name: "Gram Panchayat", search: "Gram Panchayat Office", icon: <FaLandmark />, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { name: "Health Center", search: "Primary Health Center", icon: <FaHospital />, color: "text-red-600 bg-red-50 border-red-100" },
    { name: "Police Station", search: "Police Station", icon: <FaBuilding />, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { name: "Schools", search: "Government School", icon: <FaSchool />, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { name: "Banks/ATM", search: "Bank ATM", icon: <FaUniversity />, color: "text-purple-600 bg-purple-50 border-purple-100" }
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 py-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Local Services Finder</h2>
        <p className="text-slate-500 mt-2 text-lg">Locate essential services around your village instantly</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-16 shadow-lg rounded-full group focus-within:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input 
            type="text" 
            placeholder="Search for anything (e.g., 'Aadhaar Center')..." 
            className="w-full pl-12 pr-36 py-4 rounded-full border border-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700 placeholder-slate-400 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <a 
            href={`http://googleusercontent.com/maps.google.com/search?q=${query}+${village}`} 
            target="_blank" 
            rel="noreferrer"
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
            Search
        </a>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((s, index) => (
          <a
            key={index}
            href={`http://googleusercontent.com/maps.google.com/search?q=${s.search}+${village}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 border ${s.color}`}>
              {s.icon}
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-blue-600 text-sm text-center transition-colors">{s.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default GovServices;