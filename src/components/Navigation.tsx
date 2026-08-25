"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { playScrollSound } from "@/lib/sound";

const navItems = [
  { label: "Apply", id: "apply" },
  { label: "Rules", id: "rules" },
  { label: "Live Chat", id: "chat" },
  { label: "Staff", id: "staff" },
];

function smoothScrollTo(id: string) {
  playScrollSound();
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // find active section
      const offsets = navItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0].top < 300) setActiveSection(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(4,4,4,0.96)" : "rgba(4,4,4,0.75)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(220,38,38,0.35)" : "1px solid rgba(220,38,38,0.12)",
        boxShadow: scrolled ? "0 4px 30px rgba(220,38,38,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter hover:opacity-90 transition-opacity"
            style={{ textShadow: "0 0 20px rgba(220,38,38,0.5)" }}
          >
            <span className="text-red-600">BLOOD</span>
            <span className="text-white">BOUND</span>
            <span className="text-gray-500 text-lg ml-1">SMP</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-red-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-red-950/60 border border-red-800/50 rounded-lg"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Animated red underline shimmer when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.8), transparent)" }}
        />
      )}
    </nav>
  );
}
