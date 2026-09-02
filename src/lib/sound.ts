// Web Audio API Synthesizer — BloodBound SFX v2
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx?.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function note(ctx: AudioContext, type: OscillatorType, freq: number, startAt: number, dur: number, gain: number) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startAt);
  g.gain.setValueAtTime(gain, startAt);
  g.gain.exponentialRampToValueAtTime(0.001, startAt + dur);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(startAt); osc.stop(startAt + dur);
}

export function playClickSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.07);
    g.gain.setValueAtTime(0.18, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(g); g.connect(ctx.destination); osc.start(now); osc.stop(now + 0.07);
  } catch {}
}

export function playHoverSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    note(ctx, "sine", 800, ctx.currentTime, 0.04, 0.05);
  } catch {}
}

export function playSuccessSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(ctx, "sine", f, now + i * 0.07, 0.25, 0.18));
  } catch {}
}

export function playErrorSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now); osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
    g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(g); g.connect(ctx.destination); osc.start(now); osc.stop(now + 0.3);
  } catch {}
}

export function playTabSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    const now = ctx.currentTime;
    note(ctx, "sine", 440, now, 0.05, 0.1);
    note(ctx, "sine", 880, now + 0.05, 0.05, 0.07);
  } catch {}
}

export function playScrollSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.22);
    g.gain.setValueAtTime(0.12, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(g); g.connect(ctx.destination); osc.start(now); osc.stop(now + 0.22);
  } catch {}
}

export function playLightningSound() {
  try {
    const ctx = getAudioContext(); if (!ctx) return;
    const now = ctx.currentTime;
    const bufSize = ctx.sampleRate * 0.3;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource(); source.buffer = buf;
    const g = ctx.createGain(); const filter = ctx.createBiquadFilter();
    filter.type = "bandpass"; filter.frequency.value = 1200; filter.Q.value = 0.5;
    g.gain.setValueAtTime(0.35, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    source.connect(filter); filter.connect(g); g.connect(ctx.destination);
    source.start(now); source.stop(now + 0.3);
    note(ctx, "sine", 60, now, 0.4, 0.3);
  } catch {}
}

let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
export function startHeartbeat() {
  if (typeof window === "undefined" || heartbeatInterval) return;
  const thump = () => {
    try {
      const ctx = getAudioContext(); if (!ctx) return;
      const now = ctx.currentTime;
      note(ctx, "sine", 55, now, 0.12, 0.18);
      note(ctx, "sine", 45, now + 0.1, 0.1, 0.12);
    } catch {}
  };
  thump();
  heartbeatInterval = setInterval(thump, 1400);
}
export function stopHeartbeat() {
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
}
