"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Radio } from "lucide-react";

function useCountUp(target: number | undefined, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === undefined) return;
    let start: number | null = null;
    const from = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

export function ServerStats() {
  const [stats, setStats] = useState<{ memberCount?: number; onlineCount?: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/discord/stats");
        const data = await res.json();
        setStats(data);
      } catch {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, []);

  const memberDisplay = useCountUp(stats?.memberCount);
  const onlineDisplay = useCountUp(stats?.onlineCount);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
      {/* Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.04, translateY: -4 }}
        className="glass-card p-5 rounded-2xl flex items-center space-x-4"
        style={{ boxShadow: "0 0 0 1px rgba(220,38,38,0.2)" }}
      >
        <div className="bg-red-950/80 border border-red-800/50 p-3.5 rounded-xl relative">
          <Users className="w-6 h-6 text-red-500" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full" style={{ animation: "ripple-ring 1.5s ease-out infinite" }} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </div>
        <div className="text-left">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Discord Members</p>
          <p className="text-3xl font-black text-white tracking-tight mt-0.5" style={{ animation: "counter-glow 3s ease-in-out infinite" }}>
            {stats?.memberCount !== undefined ? memberDisplay.toLocaleString() : (
              <span className="text-gray-600 text-lg animate-pulse">Loading...</span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Online */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.04, translateY: -4 }}
        className="glass-card p-5 rounded-2xl flex items-center space-x-4"
        style={{ boxShadow: "0 0 0 1px rgba(16,185,129,0.2)" }}
      >
        <div className="bg-emerald-950/80 border border-emerald-800/50 p-3.5 rounded-xl relative">
          <Radio className="w-6 h-6 text-emerald-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ animation: "ripple-ring 1.2s ease-out infinite" }} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Online Now</p>
          </div>
          <p className="text-3xl font-black text-emerald-400 tracking-tight mt-0.5">
            {stats?.onlineCount !== undefined ? onlineDisplay.toLocaleString() : (
              <span className="text-gray-600 text-lg animate-pulse">Loading...</span>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
