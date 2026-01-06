import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { FaCity } from "react-icons/fa";

function Login({ closeModal, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Firebase login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Get ID token
      const token = await userCred.user.getIdToken();
      localStorage.setItem("token", token);

      // 3. Fetch user details from backend
      const res = await api.get("/api/users/me");

      localStorage.setItem("user", JSON.stringify(res.data));

      // 4. Redirect based on role
      navigate(res.data.role === "ADMIN" ? "/admin" : "/user");
      window.location.reload();

    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
          <FaCity />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
        <p className="text-slate-500 text-sm">
          Login to your Gram Panchayat account
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-sm text-center mt-8 text-slate-600">
        Don’t have an account?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-600 font-semibold cursor-pointer hover:underline"
        >
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
