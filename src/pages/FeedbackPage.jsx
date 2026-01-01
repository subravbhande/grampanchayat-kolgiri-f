function FeedbackPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-emerald-700 mb-8">
          Feedback & Suggestions
        </h1>

        <form
          action="mailto:grampanchayat@email.com"
          method="post"
          encType="text/plain"
          className="bg-white p-8 rounded-xl shadow space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            rows="5"
            placeholder="Your feedback or suggestion"
            className="w-full border px-4 py-2 rounded"
          ></textarea>

          <button className="bg-emerald-600 text-white px-6 py-2 rounded">
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackPage;
