import { useState } from "react";
import api from "../../services/api";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

function RaiseIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Added for UI
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const submitIssue = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "data",
      new Blob(
        [JSON.stringify({ title, description, category })],
        { type: "application/json" }
      )
    );
    if (image) formData.append("image", image);

    try {
      await api.post("/api/issues", formData);
      setMsg({ type: 'success', text: "Issue submitted successfully! We will review it shortly." });
      setTitle("");
      setDescription("");
      setCategory("");
      removeImage();
    } catch (error) {
      setMsg({ type: 'error', text: "Failed to submit issue. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Raise a Complaint</h2>
        <p className="text-slate-500 mt-2">Found an issue in the village? Let us know.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        
        {msg && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={submitIssue} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Street Light not working"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-slate-50 focus:bg-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="ROAD">Road & Infrastructure</option>
                <option value="WATER">Water Supply</option>
                <option value="ELECTRICITY">Electricity</option>
                <option value="SANITATION">Sanitation / Garbage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">Photo Evidence</label>
               {!imagePreview ? (
                 <label className="flex flex-col items-center justify-center w-full h-[50px] border-2 border-slate-300 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <FaCloudUploadAlt /> <span>Upload Image</span>
                    </div>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                 </label>
               ) : (
                 <div className="relative h-[50px] w-full border border-slate-200 rounded-xl overflow-hidden flex items-center bg-slate-50 px-3">
                    <img src={imagePreview} alt="Preview" className="h-8 w-8 object-cover rounded mr-3" />
                    <span className="text-xs text-slate-500 truncate flex-1">{image.name}</span>
                    <button type="button" onClick={removeImage} className="text-red-500 hover:text-red-700"><FaTimes /></button>
                 </div>
               )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Detailed Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the issue in detail. Please mention the specific location/landmark."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 flex justify-center"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RaiseIssue;