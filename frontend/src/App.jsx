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
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
    <div className="min-h-screen bg-black px-6 lg:px-10 py-8">
      {/* TOP BAR */}
      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          className="border-[#9bff00] text-[#9bff00] hover:bg-[#9bff00] hover:text-black"
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

            <p className="font-mono text-[#a3a3a3] text-lg lg:text-xl mt-4">
              Paste an API → Ingest → Explore Interactive Analytics
            </p>
          </div>

          <div className="flex items-center gap-3 max-w-lg">
            <Input
              className="text-[#a3a3a3] flex-1"
              type="text"
              placeholder="Paste API URL..."
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
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
