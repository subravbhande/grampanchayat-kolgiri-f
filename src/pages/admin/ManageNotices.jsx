import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/notices")
      .then(res => setNotices(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    await api.delete(`/api/admin/notices/${id}`);
    setNotices(n => n.filter(x => x.id !== id));
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Manage Notices</h2>

      {loading && <p className="text-gray-500">Loading notices…</p>}

      {!loading && notices.length === 0 && (
        <p className="text-gray-500">No notices published.</p>
      )}

      <div className="space-y-4">
        {notices.map(n => (
          <div
            key={n.id}
            className="bg-white p-5 rounded-lg shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{n.title}</h3>
              <p className="text-gray-600 mt-1">{n.message}</p>
            </div>

            <button
              onClick={() => deleteNotice(n.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageNotices;
