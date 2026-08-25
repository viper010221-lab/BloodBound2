import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ServerStats } from '@/components/ServerStats';
import { ApplicationSection } from '@/components/Forms';
import { LiveChat } from '@/components/LiveChat';
import { Features } from '@/components/Features';
import { Rules } from '@/components/Rules';
import { FAQ } from '@/components/FAQ';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Shield, Crown } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Floating Ember Particles Canvas */}
      <ParticleBackground />

      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <ServerStats />
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <Features />
      </div>

      {/* Rules Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <Rules />
      </div>

      {/* Main Interactive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Applications (7 cols) */}
        <div className="lg:col-span-7">
          <ApplicationSection />
        </div>

        {/* Right Column: Live Chat & Staff (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Live Chat */}
          <div id="chat">
            <LiveChat />
          </div>

          {/* Staff Members Box */}
          <div id="staff" className="glass-card rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center space-x-2 border-b border-red-950 pb-4 mb-4">
              <Shield className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Staff Members</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-black/50 p-4 rounded-xl border border-red-900/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase">Server Owners</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="bg-red-950/80 text-red-300 border border-red-800/40 px-3 py-1 rounded-lg text-sm font-bold">l1xzzn</span>
                      <span className="bg-red-950/80 text-red-300 border border-red-800/40 px-3 py-1 rounded-lg text-sm font-bold">quoted_mc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <FAQ />
      </div>

      {/* Footer */}
      <footer className="border-t border-red-950/80 bg-black/90 py-8 text-center text-xs text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} BloodBound SMP. All rights reserved. Not affiliated with Mojang Studios.</p>
      </footer>
    </main>
  );
}
