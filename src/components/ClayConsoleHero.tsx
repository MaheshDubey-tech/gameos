import React, { useState } from 'react';
import { Gamepad2, Play, Sparkles, ShieldCheck, Zap, Disc3, Radio, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onLaunchPrototype: () => void;
}

export const ClayConsoleHero: React.FC<Props> = ({ onLaunchPrototype }) => {
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [consoleMode, setConsoleMode] = useState<'FORESIGHT' | 'SIMULATION' | 'DEFENSE'>('FORESIGHT');
  const [analogTilt, setAnalogTilt] = useState({ x: 0, y: 0 });
  const [hapticFeedback, setHapticFeedback] = useState(false);
  const [consoleLedColor, setConsoleLedColor] = useState('#00E5FF');

  const triggerButton = (btn: string, ledColor: string, modeName?: 'FORESIGHT' | 'SIMULATION' | 'DEFENSE') => {
    setActiveBtn(btn);
    setConsoleLedColor(ledColor);
    setHapticFeedback(true);
    if (modeName) setConsoleMode(modeName);

    // Audio click effect using Web Audio API synthesized click
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(btn === 'X' ? 440 : btn === 'Y' ? 580 : btn === 'A' ? 660 : 880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio fallback
    }

    if (btn === 'A' || btn === 'LAUNCH') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00E5FF', '#8B5CF6', '#10B981']
      });
    }

    setTimeout(() => {
      setActiveBtn(null);
      setHapticFeedback(false);
    }, 300);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setAnalogTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setAnalogTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient clay lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] hero-glow-cyan pointer-events-none -z-10 blur-3xl opacity-50" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] hero-glow-purple pointer-events-none -z-10 blur-3xl opacity-40" />

      {/* Hero Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 clay-pill-inset border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg animate-pulse-glow">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Foresight-as-a-Service for AAA & Live-Service Gaming</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-purple-300">RACK Engine v2.4</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Prevent Game Failure. <br />
          <span className="bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
            Build What Players Love.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The full-stack AI-enabled product management consultancy for game studios. Turn multi-source community chaos into validated roadmaps before spending millions on doomed features.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => {
              triggerButton('LAUNCH', '#00E5FF');
              onLaunchPrototype();
            }}
            className="clay-btn clay-cyan-btn px-8 py-4 text-base font-bold shadow-clay-cyan flex items-center gap-3 cursor-pointer group"
          >
            <Gamepad2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Launch Interactive RACK Prototype</span>
            <span className="bg-cyan-950/40 text-cyan-100 text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">Live</span>
          </button>

          <a
            href="#case-study"
            className="clay-btn bg-[#18233A] text-slate-200 hover:text-white px-7 py-4 text-base font-semibold border border-white/10 hover:border-cyan-500/50"
          >
            <ShieldCheck className="w-5 h-5 text-purple-400 mr-2 inline" />
            Helldivers II Case Study
          </a>
        </div>

        {/* Quick Metrics Clay Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-4xl mx-auto">
          <div className="clay-card p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading">+15–22%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Revenue Uplift</div>
          </div>
          <div className="clay-card p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-heading">+30%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Player Retention</div>
          </div>
          <div className="clay-card p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">80% Faster</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Development Speed</div>
          </div>
          <div className="clay-card p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">94% Accuracy</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Community Trust</div>
          </div>
        </div>
      </div>

      {/* Interactive 3D Clay Console & Gamepad Visualizer */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="mt-8 relative max-w-5xl mx-auto p-4 sm:p-8 rounded-[40px] bg-gradient-to-b from-[#141C2E]/90 to-[#0C121F]/95 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between pb-6 border-b border-white/10 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#00E5FF] animate-pulse" />
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">GameOS Telemetry Terminal</span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Hardware Rig: NEXUS-OS v4.2</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">Online</span>
              </div>
            </div>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex items-center gap-2 bg-[#090D16] p-1.5 rounded-full border border-white/10">
            <button
              onClick={() => triggerButton('FORESIGHT_TAB', '#00E5FF', 'FORESIGHT')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                consoleMode === 'FORESIGHT'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Foresight Matrix
            </button>
            <button
              onClick={() => triggerButton('SIM_TAB', '#8B5CF6', 'SIMULATION')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                consoleMode === 'SIMULATION'
                  ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cognitive Sim
            </button>
            <button
              onClick={() => triggerButton('DEFENSE_TAB', '#10B981', 'DEFENSE')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                consoleMode === 'DEFENSE'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Anti-Churn Shield
            </button>
          </div>
        </div>

        {/* Clay Console & Gamepad Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* LEFT: Clay Console Tower Unit */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group w-52 sm:w-60 h-80 sm:h-96 rounded-[36px] bg-gradient-to-b from-[#1E2942] via-[#161F33] to-[#0E1524] p-5 shadow-[15px_20px_40px_rgba(0,0,0,0.7),inset_3px_3px_6px_rgba(255,255,255,0.2),inset_-4px_-4px_10px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]">
              
              {/* Top Curved Fin / Glowing Accent Strip */}
              <div className="flex items-center justify-between">
                <div 
                  className="h-2 rounded-full w-24 transition-colors duration-300"
                  style={{ 
                    backgroundColor: consoleLedColor,
                    boxShadow: `0 0 16px ${consoleLedColor}`
                  }}
                />
                <button
                  onClick={() => triggerButton('POWER', '#F43F5E')}
                  className="w-7 h-7 rounded-full bg-[#101726] border border-white/20 flex items-center justify-center text-xs text-rose-400 hover:text-rose-300 shadow-inner cursor-pointer"
                  title="Tactile Power Switch"
                >
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Console Center Ventilation & Slot */}
              <div className="space-y-4 my-auto">
                <div className="flex justify-center">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#121A2C] to-[#090D16] border border-white/10 flex items-center justify-center shadow-inner">
                    <Disc3 
                      className="w-16 h-16 text-cyan-400/80 animate-spin-slow"
                      style={{ filter: `drop-shadow(0 0 8px ${consoleLedColor})` }}
                    />
                    <div className="absolute w-6 h-6 rounded-full bg-[#1E2942] border border-cyan-400/50 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                  </div>
                </div>

                {/* Tactile Disc Drive Eject Slot */}
                <div className="mx-auto w-36 h-2.5 rounded-full bg-[#080B12] shadow-inner border border-white/5" />
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">GameOS Core Engine</span>
                </div>
              </div>

              {/* Console Base / Ports */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-4 h-2 rounded bg-black/80 border border-white/10" />
                  <div className="w-4 h-2 rounded bg-cyan-500/80 shadow-[0_0_6px_#00E5FF]" />
                </div>
                <div className="text-[10px] font-mono text-cyan-300/80 font-bold">120 FPS • 4K PM</div>
              </div>
            </div>
            <span className="text-xs text-slate-400 mt-3 font-mono">Next-Gen GameOS Station</span>
          </div>

          {/* RIGHT: Interactive Clay DualSense Gamepad */}
          <div className="lg:col-span-8">
            <div className="relative p-6 sm:p-8 rounded-[44px] bg-gradient-to-br from-[#1A2338] via-[#141C2E] to-[#0D1322] shadow-[18px_25px_50px_rgba(0,0,0,0.7),inset_4px_4px_8px_rgba(255,255,255,0.18),inset_-6px_-6px_14px_rgba(0,0,0,0.6)] border border-white/15">
              
              {/* Gamepad Top Bumpers / Status Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Interactive Gamepad</span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">(Click buttons or drag sticks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Status:</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                    {hapticFeedback ? 'Haptic Ping' : 'Synced'}
                  </span>
                </div>
              </div>

              {/* Controller Center Touchpad HUD */}
              <div className="my-6 p-4 rounded-3xl bg-[#090D17] border border-cyan-500/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Active Model</span>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{consoleMode === 'FORESIGHT' ? 'RACK Foresight' : consoleMode === 'SIMULATION' ? '10k Player Sim' : 'Anti-Churn Shield'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Predicted Trust</span>
                    <div className="text-sm font-bold text-emerald-400">94.2% (High Confidence)</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Simulated Studios</span>
                    <div className="text-sm font-bold text-purple-400">Helldivers II, Concord, +18</div>
                  </div>
                </div>
              </div>

              {/* Gamepad Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                
                {/* D-PAD (Left) */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-mono text-slate-400 mb-2 font-semibold">DIRECTIONAL PAD</span>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* D-Pad background cross */}
                    <div className="absolute w-28 h-9 rounded-xl bg-[#0F1626] shadow-inner border border-white/10" />
                    <div className="absolute w-9 h-28 rounded-xl bg-[#0F1626] shadow-inner border border-white/10" />

                    {/* D-Pad Buttons */}
                    <button
                      onClick={() => triggerButton('DPAD_UP', '#00E5FF')}
                      className={`absolute top-0 w-8 h-8 rounded-lg bg-gradient-to-b from-[#24314E] to-[#151D2E] text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold shadow-[2px_3px_8px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer ${
                        activeBtn === 'DPAD_UP' ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => triggerButton('DPAD_DOWN', '#00E5FF')}
                      className={`absolute bottom-0 w-8 h-8 rounded-lg bg-gradient-to-b from-[#24314E] to-[#151D2E] text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold shadow-[2px_3px_8px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer ${
                        activeBtn === 'DPAD_DOWN' ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => triggerButton('DPAD_LEFT', '#00E5FF')}
                      className={`absolute left-0 w-8 h-8 rounded-lg bg-gradient-to-b from-[#24314E] to-[#151D2E] text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold shadow-[2px_3px_8px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer ${
                        activeBtn === 'DPAD_LEFT' ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => triggerButton('DPAD_RIGHT', '#00E5FF')}
                      className={`absolute right-0 w-8 h-8 rounded-lg bg-gradient-to-b from-[#24314E] to-[#151D2E] text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold shadow-[2px_3px_8px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer ${
                        activeBtn === 'DPAD_RIGHT' ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      ▶
                    </button>
                    <div className="w-5 h-5 rounded-full bg-[#121A2C] z-10 border border-white/5" />
                  </div>
                </div>

                {/* DUAL ANALOG STICKS (Center) */}
                <div className="flex justify-center items-center gap-4">
                  {/* Left Stick */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 h-16 rounded-full bg-[#0A0E18] p-1.5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] border border-white/10 flex items-center justify-center"
                    >
                      <div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D3A58] to-[#151D2E] shadow-[3px_5px_12px_rgba(0,0,0,0.6),inset_2px_2px_4px_rgba(255,255,255,0.25)] border border-white/10 flex items-center justify-center transition-transform duration-75"
                        style={{
                          transform: `translate(${analogTilt.x * 0.4}px, ${analogTilt.y * 0.4}px)`
                        }}
                      >
                        <div className="w-6 h-6 rounded-full border border-cyan-400/40 bg-[#1E2942]/60" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 font-semibold">L-STICK (TILT)</span>
                  </div>

                  {/* Right Stick */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 h-16 rounded-full bg-[#0A0E18] p-1.5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] border border-white/10 flex items-center justify-center"
                    >
                      <div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D3A58] to-[#151D2E] shadow-[3px_5px_12px_rgba(0,0,0,0.6),inset_2px_2px_4px_rgba(255,255,255,0.25)] border border-white/10 flex items-center justify-center transition-transform duration-75"
                        style={{
                          transform: `translate(${-analogTilt.x * 0.4}px, ${-analogTilt.y * 0.4}px)`
                        }}
                      >
                        <div className="w-6 h-6 rounded-full border border-purple-400/40 bg-[#1E2942]/60" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 font-semibold">R-STICK (AIM)</span>
                  </div>
                </div>

                {/* ACTION BUTTONS (Right - △, ○, ✕, □ / Y, B, A, X) */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-mono text-slate-400 mb-2 font-semibold">TACTILE ACTION BUTTONS</span>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Y Button (North - Yellow/Amber) */}
                    <button
                      onClick={() => triggerButton('Y', '#F59E0B', 'FORESIGHT')}
                      className={`absolute top-0 w-9 h-9 rounded-full bg-gradient-to-b from-[#2E3C5D] to-[#18233A] text-amber-400 hover:text-amber-300 font-extrabold text-sm flex items-center justify-center shadow-[3px_5px_12px_rgba(0,0,0,0.5),inset_2px_2px_3px_rgba(255,255,255,0.3)] active:scale-90 transition-all cursor-pointer ${
                        activeBtn === 'Y' ? 'ring-2 ring-amber-400 scale-90' : ''
                      }`}
                      title="Y / Triangle: Foresight Overview"
                    >
                      ▲
                    </button>

                    {/* B Button (East - Red/Rose) */}
                    <button
                      onClick={() => triggerButton('B', '#F43F5E')}
                      className={`absolute right-0 w-9 h-9 rounded-full bg-gradient-to-b from-[#2E3C5D] to-[#18233A] text-rose-400 hover:text-rose-300 font-extrabold text-sm flex items-center justify-center shadow-[3px_5px_12px_rgba(0,0,0,0.5),inset_2px_2px_3px_rgba(255,255,255,0.3)] active:scale-90 transition-all cursor-pointer ${
                        activeBtn === 'B' ? 'ring-2 ring-rose-400 scale-90' : ''
                      }`}
                      title="B / Circle: Crisis Alert"
                    >
                      ●
                    </button>

                    {/* A Button (South - Emerald/Cyan) */}
                    <button
                      onClick={() => triggerButton('A', '#10B981', 'DEFENSE')}
                      className={`absolute bottom-0 w-9 h-9 rounded-full bg-gradient-to-b from-[#2E3C5D] to-[#18233A] text-emerald-400 hover:text-emerald-300 font-extrabold text-sm flex items-center justify-center shadow-[3px_5px_12px_rgba(0,0,0,0.5),inset_2px_2px_3px_rgba(255,255,255,0.3)] active:scale-90 transition-all cursor-pointer ${
                        activeBtn === 'A' ? 'ring-2 ring-emerald-400 scale-90' : ''
                      }`}
                      title="A / Cross: Confirm / Pre-Validate"
                    >
                      ✕
                    </button>

                    {/* X Button (West - Purple/Blue) */}
                    <button
                      onClick={() => triggerButton('X', '#8B5CF6', 'SIMULATION')}
                      className={`absolute left-0 w-9 h-9 rounded-full bg-gradient-to-b from-[#2E3C5D] to-[#18233A] text-purple-400 hover:text-purple-300 font-extrabold text-sm flex items-center justify-center shadow-[3px_5px_12px_rgba(0,0,0,0.5),inset_2px_2px_3px_rgba(255,255,255,0.3)] active:scale-90 transition-all cursor-pointer ${
                        activeBtn === 'X' ? 'ring-2 ring-purple-400 scale-90' : ''
                      }`}
                      title="X / Square: Simulate Archetypes"
                    >
                      ■
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Interactive Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Click gamepad buttons to simulate live studio telemetry queries.</span>
                </div>
                <button
                  onClick={onLaunchPrototype}
                  className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                >
                  <span>Open Full Screen Simulation Workbench</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

