import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    if (password.length < 6) {
        setMsg({ type: "error", text: "Password must be at least 6 characters long." });
        setLoading(false);
        return;
    }

    try {
      await updatePassword(auth.currentUser, password);
      setMsg({ type: "success", text: "Password updated successfully!" });
      setPassword("");
    } catch (error) {
      console.error(error);
      setMsg({ type: "error", text: "Please re-login to update your password securely." });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-100">
                <FaLock />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Change Password</h2>
            <p className="text-slate-500 text-sm mt-1">Ensure your account stays secure</p>
        </div>

        {msg && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 border ${
              msg.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            <span className="mt-0.5 text-lg">
                {msg.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            </span>
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleChange} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;