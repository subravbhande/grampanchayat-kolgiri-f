import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaIdBadge,
  FaCheckCircle
} from "react-icons/fa";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="text-center p-10 text-slate-500">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">

        {/* Header with Avatar */}
        <div className="relative h-44 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-end px-6 sm:px-8">
          
          {/* Avatar inside header */}
          <div className="absolute -bottom-14 left-1/2 sm:left-8 transform -translate-x-1/2 sm:translate-x-0">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center ring-4 ring-white shadow-lg">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-blue-700 uppercase">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : <FaUser />}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 pb-8 pt-20">

          {/* Name & Status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                {user.name || "User"}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                  {user.role || "Citizen"}
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                  <FaCheckCircle className="text-[11px]" />
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem
              icon={<FaEnvelope />}
              label="Email Address"
              value={user.email}
            />
            <ProfileItem
              icon={<FaPhoneAlt />}
              label="Mobile Number"
              value={user.mobile}
            />
            <ProfileItem
              icon={<FaIdBadge />}
              label="User ID"
              value={user.id || "N/A"}
            />
            <ProfileItem
              icon={<FaUser />}
              label="Account Type"
              value={user.role || "Citizen"}
              color="text-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 flex items-start gap-4 p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-100 text-sm shadow-sm">
        <span className="text-xl mt-0.5">ℹ️</span>
        <p>
          Your profile information is securely linked to the Gram Panchayat system.
          If any detail is incorrect, please contact the Gram Sevak office.
        </p>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value, color = "text-slate-800" }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition">
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
          {label}
        </p>
        <p className={`font-medium truncate max-w-[220px] ${color}`}>
          {value || "Not Provided"}
        </p>
      </div>
    </div>
  );
}

export default Profile;
