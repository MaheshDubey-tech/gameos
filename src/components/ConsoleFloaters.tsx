import React from 'react';
import { Gamepad, Sparkles, Trophy, Cpu, Zap } from 'lucide-react';

export const ConsoleFloaters: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-5">
      {/* Floating Retro Handheld (Switch/Game Boy inspired clay badge) - Top Left */}
      <div className="absolute top-24 -left-12 lg:left-8 animate-float-slow opacity-70 hover:opacity-100 transition-opacity pointer-events-auto">
        <div className="w-44 p-3.5 rounded-[28px] bg-gradient-to-br from-[#1E2942] to-[#121A2C] border border-cyan-400/30 shadow-[10px_15px_30px_rgba(0,0,0,0.6),inset_2px_2px_4px_rgba(255,255,255,0.2)] backdrop-blur-md transform -rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-300 font-bold">PORTABLE PM RIG</span>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          </div>
          <div className="h-16 my-2 rounded-xl bg-[#090D15] p-2 border border-white/5 flex flex-col justify-between">
            <div className="text-[9px] font-mono text-slate-400">TELEMETRY INGESTION</div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-3/4 animate-pulse" />
            </div>
            <div className="text-[10px] font-bold text-cyan-300">14.2k Signals / sec</div>
          </div>
          <div className="flex justify-between items-center px-1">
            <div className="w-6 h-6 rounded-full bg-[#18233A] border border-white/20 flex items-center justify-center text-[10px] text-slate-300">
              +
            </div>
            <div className="flex gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
              <div className="w-3.5 h-3.5 rounded-full bg-purple-400 shadow-[0_0_6px_#8B5CF6]" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Next-Gen Disc Media - Top Right */}
      <div className="absolute top-36 -right-10 lg:right-10 animate-float-reverse opacity-70 hover:opacity-100 transition-opacity pointer-events-auto">
        <div className="w-40 p-4 rounded-[30px] bg-gradient-to-br from-[#201A38] to-[#141026] border border-purple-400/30 shadow-[10px_15px_30px_rgba(0,0,0,0.6),inset_2px_2px_4px_rgba(255,255,255,0.2)] backdrop-blur-md transform rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-mono font-bold text-purple-300">RACK ENGINE</span>
          </div>
          <div className="text-xs font-bold text-white leading-tight">
            Cognitive Archetype Sim
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
            <span>Accuracy</span>
            <span className="font-bold text-emerald-400">94.0%</span>
          </div>
          <div className="mt-1 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full w-[94%]" />
          </div>
        </div>
      </div>

      {/* Floating Clay Trophy / Milestone Badge - Middle Left */}
      <div className="hidden xl:block absolute top-[680px] left-6 animate-float-reverse opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
        <div className="p-3.5 rounded-[24px] bg-[#162138] border border-white/10 shadow-[8px_12px_24px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.15)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">National Finalists</div>
            <div className="text-[10px] text-slate-400">IIT, IIM, BITS & IMT Winners</div>
          </div>
        </div>
      </div>

      {/* Floating Live Telemetry Node - Middle Right */}
      <div className="hidden xl:block absolute top-[720px] right-8 animate-float-slow opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
        <div className="p-3.5 rounded-[24px] bg-[#162138] border border-white/10 shadow-[8px_12px_24px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.15)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Arrowhead Case Study</div>
            <div className="text-[10px] text-emerald-400 font-semibold">15-22% ARPPU Uplift</div>
          </div>
        </div>
      </div>
    </div>
  );
};

