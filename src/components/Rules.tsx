'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Scroll, AlertTriangle, Users, MapPin, Swords } from 'lucide-react';
import { playTabSound } from '@/lib/sound';

const ruleCategories = [
  { id: 'all', label: 'All Rules' },
  { id: 'general', label: 'General & Fair Play' },
  { id: 'combat', label: 'Combat & PvP' },
  { id: 'items', label: 'Items & Storage' },
  { id: 'bases', label: 'Bases & World' },
];

const rules = [
  { id: 1, text: 'No Cheats or Hacks of any kind', category: 'general', severe: true },
  { id: 2, text: 'No F3+a entity chunk reloading abuse', category: 'general', severe: false },
  { id: 3, text: 'No Xray texture packs or mods', category: 'general', severe: true },
  { id: 4, text: 'No Alt Accounts permitted', category: 'general', severe: false },
  { id: 5, text: 'No Cracked Clients (Must use official Minecraft Java)', category: 'general', severe: false },
  { id: 6, text: 'No Killing Armourless / Naked Players', category: 'combat', severe: false },
  { id: 7, text: 'No Spawn Camping', category: 'combat', severe: false },
  { id: 8, text: 'No Stream Sniping', category: 'combat', severe: true },
  { id: 9, text: 'No Watching Other Members Videos From Current Season (Spoilers)', category: 'combat', severe: false },
  { id: 10, text: 'Signed Book And Quills Are Legally Binding Contracts in SMP', category: 'general', severe: false },
  { id: 11, text: 'No Enderchesting / Chesting Dragon Egg', category: 'items', severe: true },
  { id: 12, text: 'No Enderchesting / Chesting Any Rare Items', category: 'items', severe: false },
  { id: 13, text: 'No Enderchesting / Chesting Hearts', category: 'items', severe: true },
  { id: 14, text: 'Base Co-ords Must Be Listed In 〔💬〕base-locations', category: 'bases', severe: false },
  { id: 15, text: 'No Griefing Bases', category: 'bases', severe: true },
  { id: 16, text: 'No Griefing Builds or Farms', category: 'bases', severe: true },
  { id: 17, text: 'No Griefing Spawn Area', category: 'bases', severe: true },
  { id: 18, text: 'Maximum Team Size: 5 Players', category: 'general', severe: false },
  { id: 19, text: 'No Using The World Seed To Locate Structures/Ores', category: 'general', severe: true },
  { id: 20, text: 'No Restocking Items With A Limit In 〔🎒〕kit-rules', category: 'items', severe: false },
];

export function Rules() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredRules = rules.filter((rule) => {
    const matchesCategory = filter === 'all' || rule.category === filter;
    const matchesSearch = rule.text.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="rules" className="py-12 relative z-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
          <Scroll className="w-4 h-4" />
          <span>Server Code of Conduct</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
          BloodBound <span className="text-red-600">Rules</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
          Failure to follow these rules may result in warning points, item confiscation, or permanent bans.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search rules..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/60 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-black/60 p-1 rounded-xl border border-red-950/60 w-full md:w-auto">
            {ruleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playTabSound(); setFilter(cat.id); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === cat.id
                    ? 'bg-red-700 text-white shadow-md shadow-red-900/40'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rule List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredRules.map((rule) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-black/50 border border-red-950/60 hover:border-red-800/60 p-3.5 rounded-xl flex items-start space-x-3 transition-colors group"
            >
              <span className="bg-red-950/80 text-red-400 font-mono text-xs font-bold px-2 py-1 rounded border border-red-900/40 flex-shrink-0">
                #{rule.id}
              </span>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors leading-snug">
                  {rule.text}
                </p>
                {rule.severe && (
                  <span className="inline-flex items-center space-x-1 text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Strictly Enforced</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {filteredRules.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 text-sm">
              No rules matching "{search}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
