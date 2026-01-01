import { FaUser, FaEnvelope, FaPhoneAlt, FaIdBadge, FaCheckCircle } from "react-icons/fa";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
      return <div className="text-center p-10 text-slate-500">Please login to view your profile.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in duration-300">
      
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        
        {/* Cover Header */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
        </div>

        <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-8 p-1 bg-white rounded-full shadow-md">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-400 uppercase border border-slate-200">
                    {user.name ? user.name.charAt(0) : <FaUser />}
                </div>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                            {user.role || "Citizen"}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                            <FaCheckCircle className="text-[10px]" /> Active
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <ProfileItem icon={<FaEnvelope />} label="Email Address" value={user.email} />
                <ProfileItem icon={<FaPhoneAlt />} label="Mobile Number" value={user.mobile} />
                <ProfileItem icon={<FaIdBadge />} label="User ID" value={user.id || "N/A"} />
                <ProfileItem icon={<FaUser />} label="Account Type" value={user.role || "General"} color="text-indigo-600" />
            </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="mt-6 flex items-start gap-4 p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-100 text-sm shadow-sm">
        <span className="text-xl mt-0.5">ℹ️</span>
        <p className="leading-relaxed">
          Your profile information is securely linked to the Gram Panchayat database. 
          If you notice any discrepancies in your details, please contact the Gram Sevak office directly for corrections.
        </p>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value, color = "text-slate-800" }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">{label}</p>
                <p className={`font-medium truncate max-w-[200px] ${color}`}>{value || "Not Provided"}</p>
            </div>
        </div>
    )
}

export default Profile;