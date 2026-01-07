import { useState, useEffect } from "react";
// Ensure FaCity is imported to fix the ReferenceError
import { 
  FaMapMarkerAlt, FaArrowRight, FaBullhorn, FaClipboardList, 
  FaLandmark, FaBell, FaQuoteRight, FaPhoneAlt, FaCity, FaUsers, 
  FaHistory, FaHandHoldingHeart, FaHome, FaBookOpen, FaRulerCombined,
  FaFacebook, FaTwitter, FaInstagram, FaYoutube
} from "react-icons/fa";
import mandir from "./Assest/bhairavnath-mandir-kolgiri-sanamadi-sangli.avif";
import hall from "./Assest/grampanchyat hall.jpg";
import water from "./Assest/water tank.jpg";
import road from "./Assest/main road.webp";
import school from "./Assest/zpschool.jpg";
import logo from "./Assest/gp logo.png";
import sarpanch from "./Assest/sarpanch.jpg";
import main_page from "./Assest/main page.avif"
import Login from "./pages/Login";
import Register from "./pages/Register";
//import logo from "./Assest/gp logo.jpg";
function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable background scroll when popup is open
  useEffect(() => {
    if (showLogin || showRegister) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [showLogin, showRegister]);

  // Image Data
  const villageWorks = [
    { title: "Z.P. School Kolgiri", img: school },
    { title: "Water Supply Tank", img: water },
    { title: "Gram Panchayat Hall", img: hall },
    { title: "Main Village Road", img: road },
  ];

  return (
    <>
      {/* ================= MAIN CONTENT ================= */}
      <div className={`font-sans text-slate-800 transition duration-300 ${showLogin || showRegister ? "blur-sm pointer-events-none select-none fixed w-full h-screen overflow-hidden" : ""}`}>
        
        {/* HEADER */}
        <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            
            {/* LOGO & NAME SECTION */}
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* Logo added here */}
              <img 
                src={logo}
                alt="Kolgiri Logo" 
                className="w-12 h-12 object-contain drop-shadow-md bg-white rounded-full p-1"
              />
              <div>
                <h1 className={`text-xl font-bold leading-none ${scrolled ? "text-slate-800" : "text-white"}`}>Kolgiri</h1>
                <p className={`text-[10px] font-bold tracking-widest uppercase ${scrolled ? "text-blue-600" : "text-blue-200"}`}>Gram Panchayat</p>
              </div>
            </div>

            <nav className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? "text-slate-600" : "text-white/90"}`}>
              <a href="#services" className="hover:text-blue-500 transition">Services</a>
              <a href="#about" className="hover:text-blue-500 transition">About</a>
              <a href="#gallery" className="hover:text-blue-500 transition">Works</a>
              <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
            </nav>
            <div className="flex gap-4">
              <button onClick={() => setShowLogin(true)} className={`px-6 py-2 rounded-full font-semibold transition ${scrolled ? "border-2 border-blue-600 text-blue-700 hover:bg-blue-50" : "bg-white/10 backdrop-blur text-white hover:bg-white/20"}`}>Login</button>
              <button onClick={() => setShowRegister(true)} className="hidden sm:block px-6 py-2 rounded-full font-semibold bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-blue-900/30 transition transform hover:-translate-y-0.5">Register</button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={main_page} alt="Kolgiri" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-blue-900/40 to-slate-900"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl px-6 mt-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span> Welcome to Kolgiri
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">Empowering Citizens <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">Digitally.</span></h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">The official digital portal for Gram Panchayat Kolgiri, Jat Tehsil.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowLogin(true)} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3">Raise a Complaint <FaArrowRight /></button>
              <button onClick={() => setShowLogin(true)} className="px-8 py-4 bg-white text-slate-800 text-lg font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3"><FaBell className="text-amber-500" /> View Notices</button>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="bg-blue-50 py-3 overflow-hidden border-b border-blue-100">
          <div className="flex w-max animate-marquee">
            {[1,2,3,4].map(i => (
              <span key={i} className="mx-8 text-sm font-medium text-blue-800 flex items-center gap-2"><FaBullhorn className="text-blue-600"/> Special Gram Sabha scheduled at Kolgiri Panchayat Hall.<span className="w-1.5 h-1.5 bg-blue-400 rounded-full ml-8"></span> water from tommrow morning 10 AM</span>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Citizen Services</h2><p className="text-slate-500"> Access essential village services online. Submit requests, track progress, and stay informed without visiting the office.</p></div>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard icon={<FaBullhorn />} title="Raise Complaints" desc="Report issues like water leakage, bad roads." color="bg-red-50 text-red-600" />
              <ServiceCard icon={<FaClipboardList />} title="Track Status" desc="Check real-time status of complaints." color="bg-blue-50 text-blue-600" />
              <ServiceCard icon={<FaLandmark />} title="Gov Schemes" desc="Apply for government welfare schemes." color="bg-amber-50 text-amber-600" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">Village Overview</div>
                <h2 className="text-4xl font-bold text-slate-800 mb-4">About Kolgiri</h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-lg">
  <strong>KOLGIRI</strong> is a rural village located in Jat Taluka of <strong>Sangli district</strong>, Maharashtra.
</p>
<p className="text-slate-600 leading-relaxed text-lg">
  Agriculture and dairy are the main sources of livelihood. Marathi is the primary language, and the village maintains a close knit community rooted in tradition, festivals, and cooperative living.
</p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <StatCard icon={<FaUsers />} title="Population" value="2,022" sub="Male: 1,066 | Female: 956" color="blue" />
                  <StatCard icon={<FaHome />} title="Households" value="374" sub="Total Families" color="amber" />
                  <StatCard icon={<FaBookOpen />} title="Literacy" value="1,128" sub="Educated Citizens" color="green" />
                  <StatCard icon={<FaRulerCombined />} title="Area" value="1,679" sub="Hectares" color="purple" />
                </div>
                <p className="text-xs text-slate-400 mt-6 italic">* Data based on Census 2011.</p>
            </div>
            <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img src={mandir} alt="Kolgiri" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pincode</p><p className="text-3xl font-bold text-blue-700">416404</p>
                </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-10"><h2 className="text-3xl font-bold text-slate-800">Village Development</h2><div className="h-1 w-20 bg-blue-500 rounded mt-3"></div></div>
          <div className="w-full flex">
              <div className="flex animate-scroll hover:pause gap-6">
                {[...villageWorks, ...villageWorks].map((work, index) => (
                    <div key={index} className="min-w-[320px] h-[240px] rounded-2xl overflow-hidden relative shadow-lg group">
                      <img src={work.img} alt={work.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6"><h4 className="text-white font-bold text-lg">{work.title}</h4></div>
                    </div>
                ))}
              </div>
          </div>
        </section>

        {/* SARPANCH MESSAGE */}
        <section className="py-24 bg-blue-900 relative isolate overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <div className="inline-block p-3 rounded-full bg-blue-800 text-blue-300 mb-6"><FaQuoteRight className="text-2xl" /></div>
                <h2 className="text-4xl font-bold text-white mb-6">From the Desk of Sarpanch</h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-8">
                  "Our vision is to make Kolgiri a model village in Sangli district. 
                  With this digital portal, we ensure transparency and better service delivery for every household."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-blue-400 p-1">
                      <img src={sarpanch} className="w-full h-full rounded-full object-cover" alt="Sarpanch"/>
                  </div>
                  <div>
                      <h4 className="text-white font-bold text-xl">Shri. M. S. Helvi</h4>
                      <p className="text-blue-400 text-sm font-medium uppercase tracking-wider">Sarpanch, Kolgiri</p>
                  </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10">
                  <FaCity className="text-3xl text-blue-300 mb-2" />
                  <h4 className="text-white font-bold text-2xl">Sangli</h4>
                  <p className="text-blue-200 text-sm">District</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10">
                  <FaLandmark className="text-3xl text-blue-300 mb-2" />
                  <h4 className="text-white font-bold text-2xl">Jat</h4>
                  <p className="text-blue-200 text-sm">Tehsil</p>
                </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16"><h2 className="text-3xl font-bold text-slate-800">Contact Administration</h2></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { role: "Sarpanch", name: "Shri M. S. Helvi", phone: "+91 94229XXXXX", img: sarpanch },
                { role: "Gram Sevak", name: "Shri. D. M. Sale", phone: "+91 82759XXXXX", img: sarpanch },
                { role: "SDO Jath", name: "Shri Ajay Nashte", phone: "02344-246134", img: sarpanch },
              ].map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition text-center group">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 border-2 border-blue-500 mb-4 group-hover:scale-105 transition-transform">
                    <img src={p.img} alt={p.role} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">{p.role}</h4>
                  <p className="text-slate-500 font-medium text-sm mb-3">{p.name}</p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold"><FaPhoneAlt className="text-xs" /> {p.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-6 text-white">
                    {/* Footer Logo */}
                    <img src={logo} alt="Kolgiri Logo" className="w-8 h-8 object-contain bg-white rounded-full p-1" />
                    <span className="font-bold text-xl">Kolgiri GP</span>
                </div>
                <div className="space-y-2 text-sm"><p><FaMapMarkerAlt className="inline mr-2 text-blue-500" /> Gram Panchayat Kolgiri, Jat, Sangli - 416404</p><p><FaPhoneAlt className="inline mr-2 text-blue-500" /> +91 98765 XXXXX</p></div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Connect With Us</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white"><FaFacebook /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center text-white"><FaTwitter /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center text-white"><FaInstagram /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-white"><FaYoutube /></a>
                </div>
              </div>
              <div><h4 className="text-white font-bold mb-6">Quick Links</h4><ul className="space-y-3 text-sm"><li><a href="#about" className="hover:text-blue-400">About Kolgiri</a></li><li><a href="#services" className="hover:text-blue-400">Services</a></li><li><a href="#contact" className="hover:text-blue-400">Contact</a></li></ul></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">© 2025 Gram Panchayat Kolgiri. Designed and developed by <b>Subrav Bhande</b></div>
        </footer>

      </div> {/* END OF BLURRED CONTENT */}

      {/* ================= MODALS ================= */}
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => { setShowLogin(false); setShowRegister(false); }}></div>
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
             <button onClick={() => { setShowLogin(false); setShowRegister(false); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-20 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center">✕</button>
             
             {/* Pass switch functions here */}
             {showLogin && (
                <Login 
                  closeModal={() => setShowLogin(false)} 
                  switchToRegister={() => { setShowLogin(false); setShowRegister(true); }} 
                />
             )}
             {showRegister && (
                <Register 
                  closeModal={() => setShowRegister(false)} 
                  switchToLogin={() => { setShowRegister(false); setShowLogin(true); }} 
                />
             )}
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </>
  );
}

// Helper Components
function ServiceCard({ icon, title, desc, color }) {
  return (
    <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6 ${color}`}>
{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function StatCard({ icon, title, value, sub, color }) {
  const colors = { blue: "bg-blue-100 text-blue-600", amber: "bg-amber-100 text-amber-600", green: "bg-green-100 text-green-600", purple: "bg-purple-100 text-purple-600" };
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[color]}`}>{icon}</div><span className="text-sm text-slate-500 font-bold uppercase">{title}</span></div>
        <p className="text-2xl font-bold text-slate-800">{value}</p><p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
}

export default LandingPage;
