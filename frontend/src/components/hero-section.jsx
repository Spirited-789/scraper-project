import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import cardImg from "./img/card.png";
import darkCardImg from "./img/dark-card.png";

const menuItems = [
  { name: "", href: "#" },
  { name: "", href: "#" },
  { name: "", href: "#" },
  { name: "", href: "#" },
];

export default function HeroSection() {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="dark bg-zinc-950 text-zinc-100 min-h-screen">
      {/* ================= HEADER ================= */}
      <header className="relative z-50">
        <nav
          data-state={menuState ? "active" : undefined}
          className="fixed w-full border-b border-dashed border-zinc-800 bg-transparent"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2">
                <Logo />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                className="lg:hidden p-1 text-zinc-400 hover:text-white"
              >
                {menuState ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {/* DESKTOP Menu */}
              <ul className="hidden lg:flex gap-8 text-sm text-zinc-400">
                {menuItems.map((item, idx) => (
                  <li key={idx} className="hover:text-white transition-colors">
                    <a href={item.href}>{item.name}</a>
                  </li>
                ))}
              </ul>

              {/* DESKTOP Buttons */}
              <div className="hidden lg:flex gap-3">
                <Button asChild variant="outline" size="sm">
                  <a href="/signup">Signup</a>
                </Button>
                <Button asChild size="sm">
                  <a href="/login">Login</a>
                </Button>
              </div>
            </div>
          </div>

          {/* ================= MOBILE MENU (Fixed) ================= */}
          {menuState && (
            // FIX 2: Changed from w-full (full screen) to w-48 aligned to right
            <div className="lg:hidden absolute top-full right-4 w-48 bg-zinc-950 border border-zinc-800 p-4 shadow-2xl rounded-lg animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col gap-2 mr-5">
                {/* Mobile Auth Buttons - Compact & Right Aligned */}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-shadow-smooth"
                >
                  <a href="/signup">Signup</a>
                </Button>
                <Button asChild size="sm" className="w-full">
                  <a href="/login">Login</a>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <main>
        <section className="relative overflow-hidden bg-zinc-950 pt-24">
          {/* ====== ANALYTICS ROTATING BACKGROUND ====== */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* rotating glow */}
            <div
              className="
                absolute left-1/2 top-1/2
                h-[1200px] w-[1200px]
                -translate-x-1/2 -translate-y-1/2
                animate-spin-slow
                rounded-full
                bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.18),transparent,rgba(52,211,153,0.14),transparent)]
                blur-3xl
              "
            />
            {/* analytics grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          {/* ====== CONTENT ====== */}
          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 lg:pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl text-white">
                API Processing reimagined.
              </h1>
              <p className="mx-auto my-8 max-w-xl text-lg text-zinc-400">
                Data Drive is a modern platform to ingest, analyze, and process
                API data at scale.
              </p>
            </div>
          </div>

          {/* ====== HERO CARD ====== */}
          <div className="relative z-10 mx-auto max-w-7xl pb-20">
            <div className="perspective-distant pl-4 pr-4 lg:pl-44 lg:pr-0">
              <div
                className="
                  relative lg:h-176 rotate-x-20 skew-x-0 lg:skew-x-12 
                  pt-6 lg:pl-6
                  mask-b-from-55% mask-b-to-100% lg:mask-r-from-75%
                "
              >
                {/* light */}
                <img
                  src={cardImg}
                  alt="Hero"
                  className="rounded-xl border border-zinc-800 shadow-xl dark:hidden w-full h-auto"
                />

                {/* dark */}
                <img
                  src={darkCardImg}
                  alt="Hero dark"
                  className="hidden rounded-xl border border-zinc-800 shadow-xl dark:block w-full h-auto"
                />

                {/* subtle data glow */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 blur-xl" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
