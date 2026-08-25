'use client';

import { motion } from 'framer-motion';
import { Swords, ShieldAlert, Compass, Users } from 'lucide-react';
import { playClickSound } from '@/lib/sound';

const features = [
  {
    icon: Swords,
    title: 'BloodLust PvP',
    description: 'High stakes PvP mechanics designed for intense SMP rivalries and faction battles.',
  },
  {
    icon: Compass,
    title: 'Custom World Generation',
    description: 'Explore breathtaking custom terrain, biomes, and structures across the map.',
  },
  {
    icon: ShieldAlert,
    title: 'Strict Anti-Cheat',
    description: 'Fair play guaranteed with enterprise-grade anti-cheat & active staff moderation.',
  },
  {
    icon: Users,
    title: 'Apply-Only Community',
    description: 'A hand-selected tight-knit community of dedicated survival players & creators.',
  },
];

export function Features() {
  return (
    <section className="py-12 relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
          Why Play On <span className="text-red-600">BloodBound?</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2">What sets our SMP apart from traditional survival servers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03, translateY: -4 }}
              onHoverStart={playClickSound}
              className="glass-card p-6 rounded-2xl border border-red-950/60 hover:border-red-600/50 transition-all duration-300 group cursor-default"
            >
              <div className="bg-red-950/80 border border-red-800/40 p-4 rounded-xl w-fit mb-4 group-hover:bg-red-600 group-hover:border-red-500 transition-colors">
                <Icon className="w-6 h-6 text-red-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
