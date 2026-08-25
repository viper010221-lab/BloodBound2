"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Scroll, AlertTriangle } from "lucide-react";
import { playTabSound } from "@/lib/sound";

const ruleCategories = [
  { id: "all", label: "All Rules" },
  { id: "general", label: "General & Fair Play" },
  { id: "combat", label: "Combat & PvP" },
  { id: "items", label: "Items & Storage" },
  { id: "bases", label: "Bases & World" },
];

const rules = [
  { id: 1, text: "No Cheats or Hacks of any kind", category: "general", severe: true },
  { id: 2, text: "No F3+a entity chunk reloading abuse", category: "general", severe: false },
  { id: 3, text: "No Xray texture packs or mods", category: "general", severe: true },
  { id: 4, text: "No Alt Accounts permitted", category: "general", severe: false },
  { id: 5, text: "No Cracked Clients (Must use official Minecraft Java)", category: "general", severe: false },
  { id: 6, text: "No Killing Armourless / Naked Players", category: "combat", severe: false },
  { id: 7, text: "No Spawn Camping", category: "combat", severe: false },
  { id: 8, text: "No Stream Sniping", category: "combat", severe: true },
  { id: 9, text: "No Watching Other Members Videos From Current Season (Spoilers)", category: "combat", severe: false },
  { id: 10, text: "Signed Book And Quills Are Legally Binding Contracts in SMP", category: "general", severe: false },
  { id: 11, text: "No Enderchesting / Chesting Dragon Egg", category: "items", severe: true },
  { id: 12, text: "No Enderchesting / Chesting Any Rare Items", category: "items", severe: false },
  { id: 13, text: "No Enderchesting / Chesting Hearts", category: "items", severe: true },
  { id: 14, text: "Base Co-ords Must Be Listed In base-locations", category: "bases", severe: false },
  { id: 15, text: "No Griefing Bases", category: "bases", severe: true },
  { id: 16, text: "No Griefing Builds or Farms", category: "bases", severe: true },
  { id: 17, text: "No Griefing Spawn Area", category: "bases", severe: true },
  { id: 18, text: "Maximum Team Size: 5 Players", category: "general", severe: false },
  { id: 19, text: "No Using The World Seed To Locate Structures/Ores", category: "general", severe: true },
  { id: 20, text: "No Restocking Items With A Limit In kit-rules", category: "items", severe: false },
];

export function Rules() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredRules = rules.filter((rule) => {
    const matchesCategory = filter === "all" || rule.category === filter;
    const matchesSearch = rule.text.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="rules" className="py-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center space-x-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
          <Scroll className="w-4 h-4" />
          <span>Server Code of Conduct</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
          BloodBound <span className="text-red-600 text-glow-red">Rules</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
          Failure to follow these rules may result in warning points, item confiscation, or permanent bans.
        </p>
      </motion.div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search rules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/70 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-600"
            />
          </div>

          {/* Category tabs with sliding pill */}
          <div className="flex flex-wrap gap-1.5 bg-black/70 p-1.5 rounded-xl border border-red-950/60 w-full md:w-auto relative">
            {ruleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playTabSound(); setFilter(cat.id); }}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-black transition-colors z-10 ${
                  filter === cat.id ? "text-white" : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {filter === cat.id && (
                  <motion.div
                    layoutId="rule-tab-pill"
                    className="absolute inset-0 bg-red-700 rounded-lg shadow-lg shadow-red-900/50"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rules grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1"
          >
            {filteredRules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="bg-black/60 border border-red-950/50 hover:border-red-700/60 p-3.5 rounded-xl flex items-start space-x-3 transition-colors group cursor-default"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
              >
                <span className="bg-red-950/90 text-red-400 font-mono text-xs font-black px-2 py-1 rounded border border-red-900/50 flex-shrink-0 group-hover:bg-red-900/80 transition-colors">
                  #{rule.id}
                </span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-300 group-hover:text-white transition-colors leading-snug">
                    {rule.text}
                  </p>
                  {rule.severe && (
                    <span className="inline-flex items-center space-x-1 text-[10px] text-red-500 font-black uppercase tracking-wider mt-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Strictly Enforced</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
            {filteredRules.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-600 text-sm">
                No rules matching &quot;{search}&quot;.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
