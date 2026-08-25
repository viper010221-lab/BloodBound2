'use client';

import { useEffect, useState } from 'react';
import { Users, Radio } from 'lucide-react';

export function ServerStats() {
  const [stats, setStats] = useState<{ memberCount?: number, onlineCount?: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/discord/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
      {/* Total Members */}
      <div className="glass-card p-5 rounded-2xl flex items-center space-x-4 transition-all duration-300 hover:scale-[1.02]">
        <div className="bg-red-950/80 border border-red-800/50 p-3.5 rounded-xl">
          <Users className="w-6 h-6 text-red-500" />
        </div>
        <div className="text-left">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Discord Members</p>
          <p className="text-3xl font-black text-white tracking-tight mt-0.5">
            {stats?.memberCount !== undefined ? stats.memberCount.toLocaleString() : 'Loading...'}
          </p>
        </div>
      </div>
      
      {/* Online Now */}
      <div className="glass-card p-5 rounded-2xl flex items-center space-x-4 transition-all duration-300 hover:scale-[1.02]">
        <div className="bg-emerald-950/80 border border-emerald-800/50 p-3.5 rounded-xl relative">
          <Radio className="w-6 h-6 text-emerald-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Online Members</p>
          </div>
          <p className="text-3xl font-black text-white tracking-tight mt-0.5">
            {stats?.onlineCount !== undefined ? stats.onlineCount.toLocaleString() : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
}
