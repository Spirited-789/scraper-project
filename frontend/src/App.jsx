import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css"; // You can keep default styles or add your own
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

// --- PAGE 1: HOME (Input Form) ---
function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScrape = async () => {
    setLoading(true);
    try {
      // We send a JSON POST request to your Python backend
      const res = await axios.post("http://localhost:8000/scrape", { url });

      // If successful, navigate to the dashboard
      // You can decide logic here: if res.data.count > 1 go to history, else go to report
      navigate("/dashboard");
    } catch (error) {
      alert("Error scraping: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-screen h-screen bg-black flex items-center justify-center">
      <div className="grid grid-cols-2 mx-auto pr-10">
        <div className=" h-50% w-50% bg-black pl-0 p-40 rounded-md">
          <h1 className="font-mono ... text-white text-7xl font-bold size-xl p-10 gap-1 ">
            SEO Scraper
          </h1>
          <span className="font-mono ... pl-10 text-[#a3a3a3]  text-xl">
            Scrape away APIs and make reports seamlessly!
          </span>
          <Input
            className="text-[#a3a3a3]"
            type="text"
            placeholder="Enter JSON URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            className="bg-[#9bff00] hover:bg-[#76c100] hover:cursor-pointer text-[#2b3703]"
            onClick={handleScrape}
            disabled={loading}
          >
            {loading ? "Scraping..." : "Scrape Now"}
          </Button>
          <br />
          <br />
          <Link to="/dashboard">View History</Link>
        </div>
        {/* <div className="bg-red-500 border rounded-md ">gf</div> */}
        <div className="rounded-md  group relative h-full w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-black">
          {/* subtle analytics grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* FULL HEIGHT WAVE */}
          <svg
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-[180%] transition-transform duration-1000 ease-out group-hover:translate-x-[-8%]"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            <path
              d="M0,300 C120,220 240,380 360,300 C480,220 600,380 720,300 C840,220 960,380 1080,300 C1200,220 1320,380 1440,300 L1440,600 L0,600 Z"
              fill="url(#waveGrad)"
              opacity="0.9"
            />
          </svg>

          {/* soft glow */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute -inset-32 bg-cyan-400/30 blur-3xl" />
          </div>

          {/* overlay signal bars (mid-height, not bottom) */}
          <div className="relative z-10 flex h-full items-center justify-center gap-3 px-6">
            {[55, 80, 65, 95, 75, 88].map((h, i) => (
              <span
                key={i}
                className="
          block w-2.5 rounded-full
          bg-gradient-to-t from-cyan-400 to-emerald-300
          origin-bottom
          scale-y-60
          transition-transform duration-700 ease-out
          group-hover:scale-y-100
        "
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PAGE 2: DASHBOARD (Report + History combined) ---
function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from Python when page loads
    axios
      .get("http://localhost:8000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Product History</h2>
      <Link to="/">← Back to Home</Link>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image_url} width="100" alt={p.title} />
            <h3>{p.title}</h3>
            <p className="price">${p.price}</p>
            {/* The rating math happens here in JS now! */}
            <div className="rating-bar">
              <div
                style={{
                  width: `${(p.rating / 5) * 100}%`,
                  background: "gold",
                  height: "10px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
