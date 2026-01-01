import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaEye, FaTimes, FaInbox } from "react-icons/fa";

function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [preview, setPreview] = useState(null);
  const [previewIssue, setPreviewIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/issues/my")
      .then(res => setIssues(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openPreview = (url, issue) => {
    setPreview(url);
    setPreviewIssue(issue);
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'RESOLVED': return 'bg-green-100 text-green-700 border-green-200';
          case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 border-blue-200';
          default: return 'bg-amber-100 text-amber-700 border-amber-200';
      }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">My Complaints History</h2>
        <p className="text-slate-500">Track the resolution status of your reported issues</p>
      </div>

      {loading && <p className="text-center text-slate-500">Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 text-3xl">
            <FaInbox />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No issues reported yet</h3>
          <p className="text-slate-500 text-sm mt-1">You haven't raised any complaints regarding village issues.</p>
        </div>
      )}

      <div className="space-y-4">
        {issues.map(issue => (
          <div
            key={issue.id}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(issue.status)}`}>
                        {issue.status.replace("_", " ")}
                    </span>
                    {/* --- FIX: Safely handle ID string conversion --- */}
                    <span className="text-xs text-slate-400">
                      #{String(issue.id).substring(0, 8)}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{issue.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{issue.description}</p>
                <p className="text-xs text-slate-400 font-medium">
                    Reported on: {new Date(issue.createdAt).toLocaleDateString("en-IN", { dateStyle: 'medium' })}
                </p>
            </div>

            <div className="flex items-center">
                {issue.imageUrl ? (
                    <button
                        onClick={() => openPreview(issue.imageUrl, issue)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-medium transition"
                    >
                        <FaEye /> View Photo
                    </button>
                ) : (
                    <span className="text-xs text-slate-300 italic">No image attached</span>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl p-2 max-w-2xl w-full relative animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute -top-12 right-0 text-white text-3xl hover:text-slate-300"><FaTimes /></button>
            <img src={preview} alt="Evidence" className="w-full h-auto rounded-xl max-h-[80vh] object-contain" />
            <div className="p-4">
                <p className="font-bold text-slate-800">{previewIssue?.title}</p>
                <p className="text-xs text-slate-500">{new Date(previewIssue?.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyIssues;