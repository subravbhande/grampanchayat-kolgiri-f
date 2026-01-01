import { Link } from "react-router-dom";

function CommitteePage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HEADER (same style) */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold text-emerald-700">
            Gram Panchayat Portal
          </h1>
          <Link to="/" className="text-emerald-700">← Back to Home</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-emerald-700 mb-10">
          Gram Panchayat Committee
        </h1>

        <h2 className="text-2xl font-semibold mb-4">
          Current Committee Members
        </h2>

        <ul className="list-disc pl-6 mb-10 text-gray-700">
          <li>Sarpanch – Shri ABC XYZ</li>
          <li>Up-Sarpanch – Smt DEF XYZ</li>
          <li>Member – Shri PQR XYZ</li>
          <li>Member – Smt STU XYZ</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          Past Sarpanch
        </h2>

        <ul className="list-disc pl-6 text-gray-700">
          <li>2018–2023 – Shri AAA BBB</li>
          <li>2013–2018 – Shri CCC DDD</li>
          <li>2008–2013 – Shri EEE FFF</li>
        </ul>

      </div>

      {/* FOOTER */}
      <footer className="bg-emerald-800 text-white py-6 text-center">
        © 2025 Gram Panchayat Digital Portal
      </footer>

    </div>
  );
}

export default CommitteePage;
