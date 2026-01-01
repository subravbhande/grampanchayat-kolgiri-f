import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCity } from "react-icons/fa";

function Register({ closeModal, switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (form.mobile.length !== 10) { setError("Mobile number must be exactly 10 digits."); setLoading(false); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); setLoading(false); return; }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const token = await userCred.user.getIdToken();
      await axios.post("http://localhost:8080/api/users/register", { name: form.name, mobile: form.mobile, email: form.email }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Account created successfully!");
      setTimeout(() => { switchToLogin(); }, 1500); // Switch to Login after success
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("Email already registered.");
      else if (err.code === "auth/weak-password") setError("Password too weak.");
      else setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-h-[85vh] overflow-y-auto no-scrollbar">
       <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg shadow-blue-200"><FaCity /></div>
            <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
            <p className="text-slate-500 text-sm">Join the digital gram panchayat today</p>
       </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input-field" required />
        <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} maxLength={10} className="input-field" required />
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="input-field" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="input-field" required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="input-field" required />

        <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 mt-2">
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-slate-600">
        Already have an account? <span onClick={switchToLogin} className="text-blue-600 font-semibold cursor-pointer hover:underline">Login</span>
      </p>
      
      <style>{`
        .input-field { width: 100%; padding: 12px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); background-color: #fff; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default Register;