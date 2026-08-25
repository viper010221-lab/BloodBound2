"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swords, ShieldAlert, Compass, Users } from "lucide-react";
import { playHoverSound } from "@/lib/sound";

const features = [
  { icon: Swords, title: "BloodLust PvP", description: "High stakes PvP mechanics designed for intense SMP rivalries and faction battles.", color: "red" },
  { icon: Compass, title: "Custom World", description: "Explore breathtaking custom terrain, biomes, and structures across the map.", color: "orange" },
  { icon: ShieldAlert, title: "Anti-Cheat", description: "Fair play guaranteed with enterprise-grade anti-cheat & active staff moderation.", color: "red" },
  { icon: Users, title: "Apply-Only", description: "A hand-selected tight-knit community of dedicated survival players & creators.", color: "orange" },
];

function FeatureCard({ item, index }: { item: typeof features[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 16;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => { setHovered(true); playHoverSound(); }}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.04 : 1,
        boxShadow: hovered
          ? "0 20px 60px rgba(220,38,38,0.35), 0 0 0 1px rgba(220,38,38,0.5)"
          : "0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(220,38,38,0.18)",
        opacity: 1,
        y: 0,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay: index * 0.12 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="glass-card p-6 rounded-2xl cursor-default"
    >
      {/* Icon */}
      <motion.div
        animate={{ boxShadow: hovered ? "0 0 30px rgba(220,38,38,0.6)" : "0 0 0px rgba(220,38,38,0)" }}
        className="bg-red-950/80 border border-red-800/40 p-4 rounded-xl w-fit mb-4 transition-colors group-hover:bg-red-600"
        style={{ transform: "translateZ(20px)" }}
      >
        <Icon className={`w-7 h-7 ${hovered ? "text-white" : "text-red-400"} transition-colors`} />
      </motion.div>
      <div style={{ transform: "translateZ(10px)" }}>
        <h3 className="text-xl font-black text-white mb-2 tracking-wide">{item.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
      </div>
      {/* Bottom glow line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"
      />
    </motion.div>
  );
}

export function Features() {
  return (
    <section className="py-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-2">What Makes Us Different</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
          Why Play On <span className="text-red-600 text-glow-red">BloodBound?</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2">What sets our SMP apart from traditional survival servers</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {features.map((item, index) => (
          <FeatureCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
