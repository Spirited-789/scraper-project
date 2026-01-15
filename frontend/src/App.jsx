import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import RightAnalyticsDiv from "./mymade_components/RightAnalyticsDiv";
import PageSkeleton from "./mymade_components/PageSkeleton";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HeroSection from "./components/hero-section";

/* ================= HOME (PROTECTED) ================= */
function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔐 Protect route
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleIngest = async () => {
    if (!url) {
      alert("Please enter an API URL");
      return;
    }

    setPageLoading(true);
    setLoading(true);

    try {
      await axios.post(
        "https://data-drive-d7kc.onrender.com/ingest",
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.open(
        "https://scraper-project-data07drive.streamlit.app/",
        "_blank"
      );
    } catch (error) {
      alert(
        error?.response?.data?.detail || "Backend error while ingesting data"
      );
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 px-6 lg:px-10 py-8 overflow-hidden">
      {/* ===== BACKGROUND (MATCHING LOGIN THEME) ===== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Rotating Glow */}
        <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.18),transparent,rgba(52,211,153,0.14),transparent)] blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        {/* TOP BAR */}
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            className="
              bg-gradient-to-r from-cyan-400 to-emerald-400
                  hover:from-cyan-300 hover:to-emerald-300
                  text-black
                  px-5 py-2
                  h-10
                  shadow-[0_0_32px_rgba(34,211,238,0.35)]
            "
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-mono text-white text-5xl lg:text-7xl font-bold">
                Data Drive
              </h1>

              <p className="font-mono text-zinc-400 text-lg lg:text-xl mt-4">
                Paste an API → Ingest → Explore Interactive Analytics
              </p>
            </div>

            <div className="flex items-center gap-3 max-w-lg">
              <Input
                className="text-zinc-300 flex-1 bg-black/40 border-zinc-700"
                type="text"
                placeholder="Paste API URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button
                className="
                  bg-gradient-to-r from-cyan-400 to-emerald-400
                  hover:from-cyan-300 hover:to-emerald-300
                  text-black
                  px-5 py-2
                  h-10
                  shadow-[0_0_32px_rgba(34,211,238,0.35)]
                "
                onClick={handleIngest}
                disabled={loading}
              >
                {loading ? "Ingesting..." : "Go!"}
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

/* ================= APP ROUTER ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
