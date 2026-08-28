"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Video, ShieldCheck, CheckCircle2, AlertCircle, Send, Loader2, Check, Sparkles, Shield, Clock, HelpCircle, MessageSquareWarning, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { playTabSound, playSuccessSound, playClickSound } from "@/lib/sound";

export function ApplicationSection() {
  const [activeTab, setActiveTab] = useState<"member" | "creator" | "staff">("member");

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#staff-apply") {
        setActiveTab("staff");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const switchTab = (tab: "member" | "creator" | "staff") => {
    playTabSound();
    setActiveTab(tab);
  };

  return (
    <div id="apply" className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Top Banner for Staff Application Announcement */}
      <div className="mb-6 p-3.5 bg-gradient-to-r from-red-950/80 via-red-900/40 to-black/80 border border-red-700/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3 text-left">
          <div className="p-2 bg-red-600/20 border border-red-500/40 rounded-lg text-red-400">
            <Flame className="w-5 h-5 animate-pulse text-red-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-400">Recruitment Notice</span>
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">NOW OPEN</span>
            </div>
            <p className="text-sm font-bold text-gray-200">Staff Applications are officially open for Season 1!</p>
          </div>
        </div>
        <button
          onClick={() => switchTab("staff")}
          className="whitespace-nowrap px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-lg transition-all shadow-md hover:shadow-red-600/40 flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Apply For Staff</span>
        </button>
      </div>

      {/* Tab Header */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-black/60 p-1.5 rounded-xl border border-red-950 mb-8 relative">
        <button
          onClick={() => switchTab("member")}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 relative z-10 ${
            activeTab === "member" ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Member</span>
          {activeTab === "member" && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-red-700 rounded-lg shadow-lg shadow-red-900/40 -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <button
          onClick={() => switchTab("creator")}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 relative z-10 ${
            activeTab === "creator" ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Creator</span>
          {activeTab === "creator" && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-red-700 rounded-lg shadow-lg shadow-red-900/40 -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <button
          onClick={() => switchTab("staff")}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 relative z-10 ${
            activeTab === "staff" ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Staff</span>
          <span className="hidden sm:inline-block bg-red-950 border border-red-500/60 text-red-300 text-[10px] font-black px-1.5 py-0.2 rounded-full">OPEN</span>
          {activeTab === "staff" && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 rounded-lg shadow-lg shadow-red-900/40 -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Animated Tab Content Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "member" ? -20 : activeTab === "staff" ? 20 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === "member" ? 20 : activeTab === "staff" ? -20 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {activeTab === "member" && <MemberApplyForm />}
          {activeTab === "creator" && <CreatorApplyForm />}
          {activeTab === "staff" && <StaffApplyForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AnimatedInput({ registerName, register, placeholder, type = "text" }: any) {
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
          borderColor: isFocused ? "rgba(220, 38, 38, 0.9)" : "rgba(31, 41, 55, 1)",
          boxShadow: isFocused
            ? isTyping
              ? "0 0 20px rgba(220, 38, 38, 0.6)"
              : "0 0 12px rgba(220, 38, 38, 0.3)"
            : "none",
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
          borderColor: isFocused ? "rgba(220, 38, 38, 0.9)" : "rgba(31, 41, 55, 1)",
          boxShadow: isFocused
            ? isTyping
              ? "0 0 20px rgba(220, 38, 38, 0.6)"
              : "0 0 12px rgba(220, 38, 38, 0.3)"
            : "none",
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
          ? "bg-red-950/40 border-red-600/80 shadow-md shadow-red-950/50"
          : "bg-black/40 border-gray-800 hover:border-gray-700"
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
          checked ? "bg-red-600 border-red-500" : "bg-gray-900 border-gray-700"
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

      <span className={`text-xs font-medium transition-colors ${checked ? "text-white font-semibold" : "text-gray-300"}`}>
        {label}
      </span>
    </motion.label>
  );
}

function MemberApplyForm() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (data: any) => {
    playClickSound();
    setStatus("submitting");
    try {
      const res = await fetch("/api/apply/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        playSuccessSound();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          Your application has been sent directly to our staff team. Please stay tuned in our Discord server for updates!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playTabSound(); setStatus("idle"); }}
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
        <AnimatedInput registerName="minecraftName" register={register} placeholder="e.g. Steve_MC" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">2. Discord Username</label>
        <AnimatedInput registerName="discordUser" register={register} placeholder="e.g. discordname" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">3. Why join Bloodbound?</label>
        <AnimatedTextarea registerName="whyJoin" register={register} placeholder="Tell us a little bit about yourself and why you'd like to play here..." />
      </div>

      <div className="space-y-2.5 pt-2">
        <CustomCheckbox registerName="is13Plus" register={register} label="4. I confirm that I am 13 years of age or older" />
        <CustomCheckbox registerName="acceptedRules" register={register} label="5. I have read and agree to all server rules" />
      </div>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-red-600/40 flex items-center justify-center space-x-2 disabled:opacity-50 mt-6 cursor-pointer"
      >
        {status === "submitting" ? (
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

      {status === "error" && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-900/50">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to send application. Please ensure all fields are filled out correctly.</span>
        </motion.div>
      )}
    </form>
  );
}

function CreatorApplyForm() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (data: any) => {
    playClickSound();
    setStatus("submitting");
    try {
      const res = await fetch("/api/apply/creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        playSuccessSound();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-white">Creator Application Submitted!</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          We received your creator application! Our team will review your channel and contact you on Discord.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playTabSound(); setStatus("idle"); }}
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
          {...register("platform", { required: true })}
          className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
        >
          <option value="TikTok">TikTok</option>
          <option value="YouTube Longform">YouTube Longform</option>
          <option value="YouTube Shorts">YouTube Shorts</option>
          <option value="Twitch Streamer">Twitch Streamer</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">2. How many followers/subscribers do you have?</label>
        <AnimatedInput registerName="followers" register={register} type="text" placeholder="e.g. 1,200 followers" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">3. Channel Name / Link</label>
        <AnimatedInput registerName="channelName" register={register} placeholder="e.g. @BloodBoundClips or youtube.com/@channel" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">4. Discord Username</label>
        <AnimatedInput registerName="discordUser" register={register} placeholder="e.g. discordname" />
      </div>

      <div className="pt-2">
        <CustomCheckbox registerName="hasMic" register={register} label="5. Do you have a working microphone?" />
      </div>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-red-600/40 flex items-center justify-center space-x-2 disabled:opacity-50 mt-6 cursor-pointer"
      >
        {status === "submitting" ? (
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

      {status === "error" && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-900/50">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to send application. Please ensure all fields are filled out correctly.</span>
        </motion.div>
      )}
    </form>
  );
}

function StaffApplyForm() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (data: any) => {
    playClickSound();
    setStatus("submitting");
    try {
      const res = await fetch("/api/apply/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        playSuccessSound();
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ["#e11d48", "#dc2626", "#ffffff", "#fbbf24"] });
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-rose-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-white">Staff Application Submitted!</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          Thank you for applying to join the BloodBound SMP Staff Team. The management will review your answers carefully and reach out on Discord.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playTabSound(); setStatus("idle"); }}
          className="mt-4 bg-gray-900 hover:bg-gray-800 text-gray-200 text-sm font-bold py-2.5 px-6 rounded-xl transition-colors border border-gray-700"
        >
          Submit Another Application
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header Info */}
      <div className="p-4 bg-rose-950/30 border border-rose-900/40 rounded-xl space-y-1">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          <span>Staff Application Requirements</span>
        </div>
        <p className="text-xs text-gray-400">
          Staff members are responsible for maintaining a healthy community, enforcing rules fairly, and actively moderating Discord & player interactions.
        </p>
      </div>

      {/* Field 1: In-game name, Discord Username, Age, Timezone/Region */}
      <div className="space-y-3 p-4 bg-black/40 border border-gray-800/80 rounded-xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center space-x-1.5">
          <span>Field 1: Basic Information</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">In-Game Name (IGN)</label>
            <AnimatedInput registerName="ign" register={register} placeholder="e.g. Steve_MC" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Discord Username</label>
            <AnimatedInput registerName="discordUser" register={register} placeholder="e.g. discordname" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Age</label>
            <AnimatedInput registerName="age" register={register} type="number" placeholder="e.g. 17" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Timezone / Region</label>
            <AnimatedInput registerName="timezone" register={register} placeholder="e.g. EST / GMT+2 / Europe" />
          </div>
        </div>
      </div>

      {/* Field 2: Aware of Discord-only moderation? Weekly active hours */}
      <div className="space-y-3 p-4 bg-black/40 border border-gray-800/80 rounded-xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Field 2: Moderation & Availability</span>
        </h4>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Weekly Active Hours</label>
          <AnimatedInput registerName="weeklyHours" register={register} placeholder="e.g. 15-25 hours per week" />
        </div>
        <div className="pt-1">
          <CustomCheckbox
            registerName="discordOnlyAware"
            register={register}
            label="I am fully aware & understand that moderation is Discord-only"
          />
        </div>
      </div>

      {/* Field 3: Familiar with common tools/commands? Why Bloodbound staff? */}
      <div className="space-y-3 p-4 bg-black/40 border border-gray-800/80 rounded-xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center space-x-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Field 3: Experience & Motivation</span>
        </h4>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Familiar with common moderation tools/commands?</label>
          <AnimatedInput registerName="toolsKnowledge" register={register} placeholder="e.g. Timeout, kick, ban commands, Dyno, AutoMod, audit logs..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Why do you want to be Bloodbound staff?</label>
          <AnimatedTextarea registerName="whyStaff" register={register} rows={3} placeholder="Explain what motivates you to join our staff team and what you bring..." />
        </div>
      </div>

      {/* Field 4: Scenario: Two players insulting each other in global chat (exact steps) */}
      <div className="space-y-3 p-4 bg-black/40 border border-red-950/60 rounded-xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
          <MessageSquareWarning className="w-3.5 h-3.5" />
          <span>Field 4: Scenario — Chat Conflict</span>
        </h4>
        <label className="block text-xs font-semibold text-gray-300">
          Scenario: Two players are insulting each other in global chat. What exact steps do you take?
        </label>
        <AnimatedTextarea registerName="scenarioChat" register={register} rows={3} placeholder="Detail your step-by-step procedure (e.g., verbal warning, mute/timeout duration, escalating to higher staff)..." />
      </div>

      {/* Field 5: Scenario: Close friend breaks a major server rule (how do you handle) */}
      <div className="space-y-3 p-4 bg-black/40 border border-red-950/60 rounded-xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Field 5: Scenario — Rule Violation Handling</span>
        </h4>
        <label className="block text-xs font-semibold text-gray-300">
          Scenario: A close friend breaks a major server rule. How do you handle the situation?
        </label>
        <AnimatedTextarea registerName="scenarioFriend" register={register} rows={3} placeholder="Describe how you handle rule enforcement without bias or favoritism..." />
      </div>

      {/* Send Button */}
      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full bg-gradient-to-r from-red-700 via-rose-600 to-red-700 hover:from-red-600 hover:to-rose-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-rose-600/40 flex items-center justify-center space-x-2 disabled:opacity-50 mt-6 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Staff Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Staff Application</span>
          </>
        )}
      </motion.button>

      {status === "error" && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-900/50">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to send application. Please ensure all fields are filled out correctly.</span>
        </motion.div>
      )}
    </form>
  );
}
