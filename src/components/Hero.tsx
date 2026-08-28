"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Shield, Flame, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound, startHeartbeat } from "@/lib/sound";

const FULL_TEXT = "Step into the ultimate Minecraft survival experience. Fight, build, conquer, and leave your mark in an exclusive community.";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const serverIp = process.env.NEXT_PUBLIC_SERVER_IP || "play.bloodboundsmp.com";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(FULL_TEXT.slice(0, i));
      i++;
      if (i > FULL_TEXT.length) clearInterval(timer);
    }, 22);
    return () => clearInterval(timer);
  }, []);

  // Heartbeat ambient
  useEffect(() => {
    const t = setTimeout(() => startHeartbeat(), 1500);
    return () => clearTimeout(t);
  }, []);

  const copyToClipboard = () => {
    playSuccessSound();
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.8 }, colors: ["#dc2626","#991b1b","#ffffff","#ef4444"] });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden z-10">
      {/* Massive red halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(185,28,28,0.18) 0%, rgba(220,38,38,0.06) 40%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)" }} />

      {/* Badge with heartbeat */}
      <motion.a
        href="#apply"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-950/90 via-rose-950/80 to-red-950/90 border border-rose-600/60 px-5 py-2 rounded-full text-rose-300 text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-950/60 heartbeat cursor-pointer hover:border-rose-400 transition-colors"
      >
        <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
        <span>Staff & Season 1 Applications Open</span>
        <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
      </motion.a>

      {/* Glitch Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-4"
      >
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white tracking-tight uppercase drop-shadow-2xl leading-none">
          <span className="inline-block">BLOOD</span>
          <span className="glitch-text text-red-600 text-glow-red-xl inline-block" data-text="BOUND">BOUND</span>
          <br />
          <span className="text-gray-400 text-5xl sm:text-6xl md:text-7xl tracking-widest">SMP</span>
        </h1>
      </motion.div>

      {/* Typewriter subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-14 flex items-center justify-center mb-10"
      >
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          {displayText}
          <span className="animate-pulse text-red-500">|</span>
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
      >
        <motion.a
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={playClickSound}
          href="#apply"
          className="relative w-full sm:w-auto overflow-hidden text-white font-black py-4 px-10 rounded-xl text-lg shadow-2xl shadow-red-900/50 flex items-center justify-center space-x-2 group cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #7f1d1d, #dc2626, #ef4444, #dc2626, #7f1d1d)",
            backgroundSize: "300% 100%",
            animation: "shimmer-sweep 2.5s linear infinite",
          }}
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Apply For Server</span>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={playClickSound}
          href={process.env.NEXT_PUBLIC_DISCORD_INVITE}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4 px-10 rounded-xl text-lg shadow-2xl hover:shadow-indigo-700/40 transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Shield className="w-5 h-5" />
          <span>Join Discord</span>
        </motion.a>
      </motion.div>

      {/* Copy IP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="inline-flex items-center space-x-3 bg-black/95 border border-red-900/60 p-2 pl-5 rounded-2xl shadow-2xl backdrop-blur-md neon-border-pulse"
      >
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-red-500 font-black">IP:</span>
          <span className="text-gray-100 font-mono font-bold tracking-wider">{serverIp}</span>
        </div>
        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="bg-red-950/90 hover:bg-red-800 border border-red-700/60 text-red-200 hover:text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "COPIED!" : "COPY IP"}</span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-14 flex flex-col items-center space-y-2"
      >
        <span className="text-gray-600 text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-red-900/60 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-red-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
