import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://data-drive-d7kc.onrender.com/auth/login",
        { email, password }
      );

      // ✅ Store JWT
      localStorage.setItem("token", res.data.access_token);

      // ✅ Redirect to main page
      navigate("/home");
    } catch (err) {
      console.log("Login Error:", err.response);

      if (err.response && err.response.data) {
        const errorData = err.response.data;

        // CASE 1: Validation Error
        if (Array.isArray(errorData.detail)) {
          setError(errorData.detail[0].msg);
        }
        // CASE 2: Logic Error
        else if (typeof errorData.detail === "string") {
          setError(errorData.detail);
        }
        // CASE 3: Fallback
        else {
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 antialiased relative overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.18),transparent,rgba(52,211,153,0.14),transparent)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* ================= LOGO / TITLE ================= */}
      <div className="absolute top-8 left-8 z-50">
        <a href="/" className="block transition-opacity hover:opacity-80">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)] ml-20">
              Data Drive
            </span>
          </h1>
        </a>
      </div>

      {/* ================= CENTERED CONTENT WRAPPER ================= */}
      <div className="flex h-full items-center justify-center p-4 z-10 relative">
        {/* CARD CONTAINER */}
        <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* ================= DOUBLE MOVING BORDER ANIMATION ================= */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full z-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="border-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* LINE 1 */}
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              fill="none"
              stroke="url(#border-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              rx="16"
              ry="16"
              strokeDasharray="400 1600"
              className="animate-dash"
            />

            {/* LINE 2 (Opposite) */}
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              fill="none"
              stroke="url(#border-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              rx="16"
              ry="16"
              strokeDasharray="400 1600"
              className="animate-dash"
              style={{ animationDelay: "-4s" }}
            />
          </svg>
          {/* ================================================================ */}

          {/* Subtle horizontal glow line at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent z-0"></div>

          <div className="text-center mb-8 relative z-10">
            <h2 className="text-xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-zinc-400 mt-2">
              Login to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email Input */}
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs uppercase tracking-wider">
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-8.5 h-4 w-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                <Input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-teal-400 focus-visible:border-teal-400 h-10 rounded-lg transition-all relative z-10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs uppercase tracking-wider">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-8 h-4 w-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-teal-400 focus-visible:border-teal-400 h-10 rounded-lg transition-all relative z-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-8 top-8.5 text-zinc-500 hover:text-white transition-colors z-20"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold border-none shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-200 relative z-10"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm text-zinc-500 relative z-10">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-teal-400 hover:text-teal-300 cursor-pointer font-medium hover:underline transition-colors"
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
