'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { playTabSound } from '@/lib/sound';

const faqs = [
  {
    q: 'How long does an application take to get reviewed?',
    a: 'Applications are usually reviewed within 12 to 24 hours by our management team on Discord.',
  },
  {
    q: 'What version of Minecraft is BloodBound running on?',
    a: 'BloodBound SMP runs on the latest stable Java edition version of Minecraft.',
  },
  {
    q: 'Can I apply for Content Creator if I just started?',
    a: 'Yes! As long as you have good channel quality, enthusiasm, and a working microphone, we welcome new creators.',
  },
  {
    q: 'Are client mods like LabyMod or Sodium allowed?',
    a: 'Performance optimization mods (Sodium, Iris, Optifine) and mini-maps (without player radar) are fully allowed.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    playTabSound();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 relative z-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-wider">Frequently Asked Questions</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="glass-card rounded-xl border border-red-950/60 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-white text-base hover:text-red-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-red-500 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-gray-400 text-sm border-t border-white/5 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
