import { useNavigate } from "react-router-dom";
import { FaEdit, FaHistory, FaMapMarkedAlt, FaBell, FaArrowRight } from "react-icons/fa"; 

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Namaste, {user?.name}! 🙏</h1>
            <p className="text-blue-100 max-w-xl text-lg">
              Welcome to the Smart Gram Panchayat Portal. Your one-stop destination for village services and grievance redressal.
            </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 px-1">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Raise New Issue"
            desc="Report water, road, or electricity problems."
            icon={<FaEdit />}
            color="text-blue-600 bg-blue-50"
            onClick={() => navigate("/user/raise-issue")}
          />

          <ActionCard
            title="My Complaints"
            desc="Track status of your reported issues."
            icon={<FaHistory />}
            color="text-purple-600 bg-purple-50"
            onClick={() => navigate("/user/my-issues")}
          />

          <ActionCard
            title="Nearby Services"
            desc="Locate hospitals, schools & banks."
            icon={<FaMapMarkedAlt />}
            color="text-amber-600 bg-amber-50"
            onClick={() => navigate("/user/gov-schemes")}
          />
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                About This Platform
            </h3>
            <p className="text-slate-600 leading-relaxed">
            This portal bridges the gap between citizens and the Gram Panchayat. 
            Eliminate long queues and physical visits by using our digital services for a transparent and efficient village administration.
            </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FaBell className="text-amber-500" /> Upcoming Updates
            </h3>
            <ul className="space-y-3">
                {[
                    "SMS Alerts for complaint status",
                    "Document upload for certificates",
                    "Multi-language support (Marathi)"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${color}`}>
          {icon}
        </div>
        <FaArrowRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
      </div>
      <h4 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

export default UserDashboard;