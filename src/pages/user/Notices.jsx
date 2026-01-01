import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaBullhorn, FaCalendarAlt } from "react-icons/fa";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/notices")
      .then(res => setNotices(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Public Notices</h2>
        <p className="text-slate-500">Official announcements from the Gram Panchayat</p>
      </div>

      {loading && <p className="text-center text-slate-500">Loading notices...</p>}

      {!loading && notices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
            <FaBullhorn className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No active notices at the moment.</p>
        </div>
      )}

      <div className="space-y-4">
        {notices.map((n) => (
          <div 
            key={n.id} 
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{n.title}</h3>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">{n.message}</p>
                </div>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider shrink-0">
                    New
                </span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-xs text-slate-400 font-medium">
              <FaCalendarAlt className="mr-2" />
              {new Date(n.createdAt).toLocaleDateString("en-IN", { 
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notices;