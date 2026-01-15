import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Spotlight } from "../ui/spotlight"; // ✅ Imported Spotlight

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

      // ✅ Redirect to main page (API ingest page)
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. MAIN CONTAINER
    <div className="min-h-screen w-full flex md:items-center md:justify-center bg-[#020b10] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* 2. SPOTLIGHTS (The "Lamp" Effect from Top Center) */}
      <Spotlight
        className="-top-40 left-0 md:left-1/2 md:-translate-x-1/2 md:-top-20"
        fill="white"
      />
      <Spotlight
        className="-top-80 left-0 md:left-1/2 md:-translate-x-1/2 md:-top-40 opacity-50"
        fill="#e0f2fe"
      />

      {/* 3. LOGO */}
      <div className="absolute top-8 left-8 flex items-center gap-2 z-50">
        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
          <div className="w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></div>
        </div>
        <span className="font-semibold text-sm tracking-wide text-gray-200"></span>
      </div>

      {/* 4. CONTENT WRAPPER */}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center pt-20 md:pt-0">
        {/* HERO TEXT */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
            {/* Empty top line for spacing */}
          </h1>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              Data Drive
            </span>
          </h1>
        </div>

        {/* LOGIN CARD */}
        <div className="w-full max-w-md bg-[#0d1117]/60 backdrop-blur-md border border-[#30363d] rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative">
          {/* Subtle horizontal glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400 mt-2">
              Login to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs uppercase tracking-wider">
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <Input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-[#161b22]/50 border-[#30363d] text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-teal-400 focus-visible:border-teal-400 h-10 rounded-lg transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs uppercase tracking-wider">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 bg-[#161b22]/50 border-[#30363d] text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-teal-400 focus-visible:border-teal-400 h-10 rounded-lg transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
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
              className="w-full h-11 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold border-none shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-200"
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

            <div className="text-center text-sm text-gray-500">
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

      <div className="absolute bottom-6 text-xs text-gray-600">
        ©2025 Data Drive Ltd. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
