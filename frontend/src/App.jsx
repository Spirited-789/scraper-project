import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import RightAnalyticsDiv from "./mymade_components/RightAnalyticsDiv";
import PageSkeleton from "./mymade_components/PageSkeleton";

/* ================= HOME ================= */
function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const handleIngest = async () => {
    if (!url) {
      alert("Please enter an API URL");
      return;
    }

    setPageLoading(true);
    setLoading(true);

    try {
      // 🔹 ONLY backend ingestion here
      await axios.post("https://data-drive-d7kc.onrender.com/ingest", { url });

      // 🔹 Success feedback
      alert("Data ingested successfully");

      // 🔹 Open Streamlit dashboard (local for now)
      window.open("http://localhost:8501", "_blank");
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.detail || "Backend error while ingesting data"
      );
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  // 🔹 FULL PAGE SKELETON
  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
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

            {/* INPUT + BUTTON */}
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

          {/* RIGHT (visual only) */}
          <div className="w-full h-[420px] lg:h-[520px]">
            <RightAnalyticsDiv />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
