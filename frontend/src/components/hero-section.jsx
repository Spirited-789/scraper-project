import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import cardImg from "./img/card.png";
import darkCardImg from "./img/dark-card.png";

const menuItems = [
  { name: "Features", href: "#" },
  { name: "Solution", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export default function HeroSection() {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="dark bg-zinc-950 text-zinc-100">
      {/* ================= HEADER ================= */}
      <header>
        <nav
          data-state={menuState ? "active" : undefined}
          className="fixed z-30 w-full border-b border-dashed border-zinc-800 bg-zinc-950/80 backdrop-blur md:relative"
        >
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center justify-between py-4">
              <a href="/" className="flex items-center gap-2">
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                className="lg:hidden"
              >
                {menuState ? <X /> : <Menu />}
              </button>

              <ul className="hidden lg:flex gap-8 text-sm text-zinc-400">
                {menuItems.map((item) => (
                  <li key={item.name} className="hover:text-white">
                    <a href={item.href}>{item.name}</a>
                  </li>
                ))}
              </ul>

              {/* ✅ FIXED: Buttons now link to /signup and /login */}
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
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <main>
        <section className="relative overflow-hidden bg-zinc-950">
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
          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 lg:pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
                API Processing reimagined.
              </h1>
              <p className="mx-auto my-8 max-w-xl text-lg text-zinc-400">
                Data Drive is a modern platform to ingest, analyze, and process
                API data at scale.
              </p>
            </div>
          </div>

          {/* ====== HERO CARD ====== */}
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="perspective-distant pl-8 lg:pl-44">
              <div
                className="
                  relative lg:h-176 rotate-x-20 skew-x-12 pl-6 pt-6
                  mask-b-from-55% mask-b-to-100% mask-r-from-75%
                "
              >
                {/* light */}
                <img
                  src={cardImg}
                  alt="Hero"
                  className="rounded-xl border border-zinc-800 shadow-xl dark:hidden"
                />

                {/* dark */}
                <img
                  src={darkCardImg}
                  alt="Hero dark"
                  className="hidden rounded-xl border border-zinc-800 shadow-xl dark:block"
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
