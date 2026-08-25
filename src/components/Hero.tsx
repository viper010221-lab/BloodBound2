'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Shield, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessSound } from '@/lib/sound';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const serverIp = process.env.NEXT_PUBLIC_SERVER_IP || 'play.bloodboundsmp.com';

  const copyToClipboard = () => {
    playSuccessSound();
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#dc2626', '#991b1b', '#ffffff']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden z-10">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center space-x-2 bg-red-950/70 border border-red-800/50 px-4 py-1.5 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse shadow-lg shadow-red-950/50"
      >
        <Flame className="w-4 h-4 text-red-500" />
        <span>Season 1 Applications Now Open</span>
      </motion.div>

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase mb-4 drop-shadow-2xl"
      >
        BLOOD<span className="text-red-600 text-glow-red">BOUND</span> <span className="text-gray-300">SMP</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
      >
        Step into the ultimate Minecraft survival experience. Fight, build, conquer, and leave your mark in an exclusive community of players.
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
      >
        <motion.a 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={playClickSound}
          href="#apply" 
          className="w-full sm:w-auto bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-black py-4 px-9 rounded-xl text-lg shadow-xl hover:shadow-red-600/40 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Apply For Server</span>
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={playClickSound}
          href={process.env.NEXT_PUBLIC_DISCORD_INVITE} 
          target="_blank" 
          rel="noreferrer" 
          className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4 px-9 rounded-xl text-lg shadow-xl hover:shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Shield className="w-5 h-5" />
          <span>Join Discord</span>
        </motion.a>
      </motion.div>

      {/* Copy IP Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="inline-flex items-center space-x-3 bg-black/90 border border-red-900/60 p-2 pl-5 rounded-2xl shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-red-500 font-bold">IP:</span>
          <span className="text-gray-200 font-mono font-semibold">{serverIp}</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-red-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 hover:scale-105 active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'COPIED!' : 'COPY IP'}</span>
        </button>
      </motion.div>
    </section>
  );
}
