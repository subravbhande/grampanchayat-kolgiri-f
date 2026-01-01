import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [previewIssue, setPreviewIssue] = useState(null);

  useEffect(() => {
    api.get("/api/admin/issues")
      .then(res => setIssues(res.data))
      .catch(() => alert("Failed to load issues"))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/admin/issues/${id}/status`, { status });
      setIssues(prev =>
        prev.map(i => (i.id === id ? { ...i, status } : i))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const openPreview = (url, issue) => {
    setPreview(url);
    setPreviewIssue(issue);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Manage Issues</h2>

      {loading && <p className="text-gray-500">Loading issues…</p>}

      {!loading && issues.length === 0 && (
        <p className="text-gray-500">No issues found.</p>
      )}

      <div className="space-y-5">
        {issues.map(issue => (
          <div
            key={issue.id}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex justify-between gap-6">
              {/* LEFT CONTENT */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{issue.title}</h3>

                <p className="text-gray-600 mt-1">
                  {issue.description}
                </p>

                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span>📂 {issue.category}</span>
                  <span>
                    🕒 {new Date(issue.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex flex-col items-end gap-3">
                <select
                  value={issue.status}
                  onChange={e =>
                    updateStatus(issue.id, e.target.value)
                  }
                  className="
                    border rounded-md px-3 py-1 text-sm
                    focus:ring-2 focus:ring-blue-500
                  "
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>

                {issue.imageUrl && (
                  <button
                    onClick={() =>
                      openPreview(issue.imageUrl, issue)
                    }
                    className="
                      text-blue-600 hover:text-blue-800
                      text-xl
                    "
                    title="View Image"
                  >
                    👁️
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {preview && previewIssue && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={preview}
              alt="Issue"
              className="max-h-[70vh] rounded"
            />

            <p className="text-xs text-gray-500 mt-2">
              🕒{" "}
              {new Date(
                previewIssue.createdAt
              ).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageIssues;
