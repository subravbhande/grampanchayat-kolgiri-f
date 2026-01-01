import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function PublishNotice() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitNotice = async (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert("Title and message are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/admin/notices", {
        title,
        message,
      });

      alert("Notice published successfully");
      navigate("/admin/notices");
    } catch (err) {
      console.error(err);
      alert("Failed to publish notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Publish Notice</h2>

      <form
        onSubmit={submitNotice}
        className="max-w-xl bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notice message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            bg-blue-600 text-white px-5 py-2 rounded
            hover:bg-blue-700 transition
            disabled:opacity-50
          "
        >
          {loading ? "Publishing..." : "Publish Notice"}
        </button>
      </form>
    </>
  );
}

export default PublishNotice;
