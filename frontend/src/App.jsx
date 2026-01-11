import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import RightAnalyticsDiv from "./mymade_components/RightAnalyticsDiv";

/* ---------------- HOME ---------------- */
function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScrape = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/scrape", { url });
      navigate("/dashboard");
    } catch (error) {
      alert("Error scraping: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-mono text-white text-5xl lg:text-7xl font-bold">
                SEO Scraper
              </h1>

              <p className="font-mono text-[#a3a3a3] text-lg lg:text-xl mt-4">
                Scrape away APIs and make reports seamlessly!
              </p>
            </div>

            {/* INPUT + BUTTON ROW */}
            <div className="flex items-center gap-3 max-w-lg">
              <Input
                className="text-[#a3a3a3] flex-1"
                type="text"
                placeholder="Enter JSON URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button
                className="
                  bg-[#9bff00]
                  hover:bg-[#76c100]
                  text-[#2b3703]
                  px-5 py-2
                  h-10
                "
                onClick={handleScrape}
                disabled={loading}
              >
                {loading ? "Scraping..." : "Scrape"}
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full h-[420px] lg:h-[520px]">
            <RightAnalyticsDiv />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */
function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 lg:px-10 py-10">
      <h2 className="text-3xl font-bold mb-4">Product History</h2>
      <Link to="/" className="text-[#9bff00] underline">
        ← Back to Home
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products.map((p) => (
          <div key={p.id} className="bg-[#111] p-5 rounded-lg">
            <img src={p.image_url} width="100" alt={p.title} />
            <h3 className="mt-3 font-semibold">{p.title}</h3>
            <p className="text-[#9bff00]">${p.price}</p>

            <div className="h-2 bg-gray-700 mt-3 rounded">
              <div
                className="h-full bg-[#9bff00] rounded"
                style={{ width: `${(p.rating / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
