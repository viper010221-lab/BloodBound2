'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Video, CheckCircle2, AlertCircle, Send, Loader2, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTabSound, playSuccessSound, playClickSound } from '@/lib/sound';

export function ApplicationSection() {
  const [activeTab, setActiveTab] = useState<'member' | 'creator'>('member');

  const switchTab = (tab: 'member' | 'creator') => {
    playTabSound();
    setActiveTab(tab);
  };

  return (
    <div id="apply" className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Tab Header */}
      <div className="flex space-x-2 bg-black/60 p-1.5 rounded-xl border border-red-950 mb-8 relative">
        <button
          onClick={() => switchTab('member')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center space-x-2 relative z-10 ${
            activeTab === 'member'
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Member Application</span>
          {activeTab === 'member' && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-red-700 rounded-lg shadow-lg shadow-red-900/40 -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <button
          onClick={() => switchTab('creator')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center space-x-2 relative z-10 ${
            activeTab === 'creator'
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Content Creator Application</span>
          {activeTab === 'creator' && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-red-700 rounded-lg shadow-lg shadow-red-900/40 -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Animated Tab Content Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'member' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === 'member' ? 20 : -20 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {activeTab === 'member' ? <MemberApplyForm /> : <CreatorApplyForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AnimatedInput({ registerName, register, placeholder, type = 'text' }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const regProps = register(registerName, { required: true });

  const handleInput = (e: any) => {
    regProps.onChange(e);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 200);
  };

  return (
    <div className="relative">
      <motion.div
        animate={{ 
          scale: isTyping ? 1.008 : 1,
          borderColor: isFocused ? 'rgba(220, 38, 38, 0.9)' : 'rgba(31, 41, 55, 1)',
          boxShadow: isFocused 
            ? isTyping 
              ? '0 0 20px rgba(220, 38, 38, 0.6)' 
              : '0 0 12px rgba(220, 38, 38, 0.3)' 
            : 'none'
        }}
        transition={{ duration: 0.15 }}
        className="rounded-xl border bg-black/60 overflow-hidden relative"
      >
        <input 
          {...regProps}
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            regProps.onBlur(e);
            setIsFocused(false);
          }}
          onChange={handleInput}
          className="w-full bg-transparent px-4 py-3 text-white focus:outline-none text-sm placeholder-gray-600"
        />

        {/* Sparkle effect indicator while typing */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <Sparkles className="w-4 h-4 text-red-500 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function AnimatedTextarea({ registerName, register, placeholder, rows = 3 }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const regProps = register(registerName, { required: true });

  const handleInput = (e: any) => {
    regProps.onChange(e);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 200);
  };

  return (
    <div className="relative">
      <motion.div
        animate={{ 
          scale: isTyping ? 1.005 : 1,
          borderColor: isFocused ? 'rgba(220, 38, 38, 0.9)' : 'rgba(31, 41, 55, 1)',
          boxShadow: isFocused 
            ? isTyping 
              ? '0 0 20px rgba(220, 38, 38, 0.6)' 
              : '0 0 12px rgba(220, 38, 38, 0.3)' 
            : 'none'
        }}
        transition={{ duration: 0.15 }}
        className="rounded-xl border bg-black/60 overflow-hidden relative"
      >
        <textarea 
          {...regProps}
          rows={rows}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            regProps.onBlur(e);
            setIsFocused(false);
          }}
          onChange={handleInput}
          className="w-full bg-transparent px-4 py-3 text-white focus:outline-none text-sm placeholder-gray-600 resize-none"
        />

        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-3 top-3 pointer-events-none"
            >
              <Sparkles className="w-4 h-4 text-red-500 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function CustomCheckbox({ registerName, register, label }: { registerName: string; register: any; label: string }) {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    playClickSound();
    setChecked(!checked);
  };

  return (
    <motion.label 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
        checked 
          ? 'bg-red-950/40 border-red-600/80 shadow-md shadow-red-950/50' 
          : 'bg-black/40 border-gray-800 hover:border-gray-700'
      }`}
    >
      <input 
        type="checkbox" 
        {...register(registerName, { required: true })} 
        checked={checked}
        onChange={toggle}
        className="sr-only"
      />
      
      <motion.div 
        animate={{ scale: checked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.2 }}
        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
          checked ? 'bg-red-600 border-red-500' : 'bg-gray-900 border-gray-700'
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <span className={`text-xs font-medium transition-colors ${checked ? 'text-white font-semibold' : 'text-gray-300'}`}>
        {label}
      </span>
    </motion.label>
  );
}

function MemberApplyForm() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (data: any) => {
    playClickSound();
    setStatus('submitting');
    try {
      const res = await fetch('/api/apply/member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        playSuccessSound();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-4"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          Your application has been sent directly to our staff team. Please stay tuned in our Discord server for updates!
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playTabSound(); setStatus('idle'); }}
          className="mt-4 bg-gray-900 hover:bg-gray-800 text-gray-200 text-sm font-bold py-2.5 px-6 rounded-xl transition-colors border border-gray-700"
        >
          Submit Another Application
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">1. Minecraft Name</label>
        <AnimatedInput 
          registerName="minecraftName" 
          register={register} 
          placeholder="e.g. Steve_MC" 
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">2. Discord Username</label>
        <AnimatedInput 
          registerName="discordUser" 
          register={register} 
          placeholder="e.g. discordname#0000" 
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">3. Why join Bloodbound?</label>
        <AnimatedTextarea 
          registerName="whyJoin" 
          register={register} 
          placeholder="Tell us a little bit about yourself and why you'd like to play here..." 
        />
      </div>

      <div className="space-y-2.5 pt-2">
        <CustomCheckbox 
          registerName="is13Plus" 
          register={register} 
          label="4. I confirm that I am 13 years of age or older" 
        />

        <CustomCheckbox 
          registerName="acceptedRules" 
          register={register} 
          label="5. I have read and agree to all server rules" 
        />
      </div>

      <motion.button 
        type="submit" 
        disabled={status === 'submitting'} 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-red-600/40 flex items-center justify-center space-x-2 disabled:opacity-50 mt-6 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Application</span>
          </>
        )}
      </motion.button>

      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-900/50"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to send application. Please ensure all fields are filled out correctly.</span>
        </motion.div>
      )}
    </form>
  );
}

function CreatorApplyForm() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (data: any) => {
    playClickSound();
    setStatus('submitting');
    try {
      const res = await fetch('/api/apply/creator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        playSuccessSound();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-4"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-white">Creator Application Submitted!</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          We received your creator application! Our team will review your channel and contact you on Discord.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playTabSound(); setStatus('idle'); }}
          className="mt-4 bg-gray-900 hover:bg-gray-800 text-gray-200 text-sm font-bold py-2.5 px-6 rounded-xl transition-colors border border-gray-700"
        >
          Submit Another Application
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">1. Content Type</label>
        <select 
          {...register('platform', { required: true })} 
          className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
        >
          <option value="TikTok">TikTok</option>
          <option value="YouTube Longform">YouTube Longform</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">2. How many followers do you have?</label>
        <AnimatedInput 
          registerName="followers" 
          register={register} 
          type="number"
          placeholder="e.g. 500" 
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">3. Channel Name / Link</label>
        <AnimatedInput 
          registerName="channelName" 
          register={register} 
          placeholder="e.g. @BloodBoundClips or youtube.com/@channel" 
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">4. Discord Username</label>
        <AnimatedInput 
          registerName="discordUser" 
          register={register} 
          placeholder="e.g. discordname#0000" 
        />
      </div>

      <div className="pt-2">
        <CustomCheckbox 
          registerName="hasMic" 
          register={register} 
          label="5. Do you have a working microphone?" 
        />
      </div>

      <motion.button 
        type="submit" 
        disabled={status === 'submitting'} 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-red-600/40 flex items-center justify-center space-x-2 disabled:opacity-50 mt-6 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Application</span>
          </>
        )}
      </motion.button>

      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-900/50"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to send application. Please ensure all fields are filled out correctly.</span>
        </motion.div>
      )}
    </form>
  );
}
