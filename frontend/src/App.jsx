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
      <div className="grid grid-cols-2 ">
        <div className=" m-l-10 h-50% w-50% bg-slate-200 p-40 rounded-md">
          <h1>SEO Scraper (React Version)</h1>
          <Input
            type="text"
            placeholder="Enter JSON URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button onClick={handleScrape} disabled={loading}>
            {loading ? "Scraping..." : "Scrape Now"}
          </Button>
          <br />
          <br />
          <Link to="/dashboard">View History</Link>
        </div>
        {/* <div className="bg-red-500 border rounded-md ">gf</div> */}
        <div className="group relative  overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-black">
          {/* background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* animated wave */}
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-[200%] h-[65%] transition-transform duration-1000 ease-out group-hover:translate-x-[-10%]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            <path
              fill="url(#waveGradient)"
              fillOpacity="0.9"
              d="M0,160L40,165C80,170,160,180,240,170C320,160,400,130,480,120C560,110,640,120,720,135C800,150,880,170,960,165C1040,160,1120,130,1200,115C1280,100,1360,95,1400,95L1440,96L1440,320L1400,320L1360,320L1280,320L1200,320L1120,320L1040,320L960,320L880,320L800,320L720,320L640,320L560,320L480,320L400,320L320,320L240,320L160,320L80,320L0,320Z"
            />
          </svg>

          {/* glow highlight */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute -inset-24 bg-cyan-400/25 blur-3xl" />
          </div>

          {/* foreground signal bars */}
          <div className="relative z-10 flex h-full items-end justify-center gap-2 px-6 pb-6">
            {[45, 75, 60, 90, 70, 85, 65].map((h, i) => (
              <span
                key={i}
                className="
          block w-2.5 rounded-full
          bg-gradient-to-t from-cyan-400 to-emerald-300
          origin-bottom
          scale-y-50
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
