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
        <div className="bg-red-500 border rounded-md ">gf</div>
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
