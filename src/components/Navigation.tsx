'use client';

import Link from 'next/link';
import { playClickSound } from '@/lib/sound';

export function Navigation() {
  return (
    <nav className="border-b border-red-950/60 bg-black/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              onClick={playClickSound}
              className="text-2xl font-black text-red-600 tracking-tighter hover:opacity-90 transition-opacity"
            >
              BLOODBOUND <span className="text-white">SMP</span>
            </Link>
          </div>
          <div className="flex space-x-2 sm:space-x-6">
            <a 
              href="#apply" 
              onClick={playClickSound}
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5"
            >
              Apply
            </a>
            <a 
              href="#rules" 
              onClick={playClickSound}
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5"
            >
              Rules
            </a>
            <a 
              href="#chat" 
              onClick={playClickSound}
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5"
            >
              Live Chat
            </a>
            <a 
              href="#staff" 
              onClick={playClickSound}
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5"
            >
              Staff
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
