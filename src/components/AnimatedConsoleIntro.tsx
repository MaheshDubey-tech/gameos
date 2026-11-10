import React, { useState } from 'react';
import { Disc, Shield, Cpu, Sparkles, Gamepad, Radio } from 'lucide-react';
import { soundEngine } from './AudioEngine';

export const AnimatedConsoleIntro: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto py-10 px-4 flex flex-col items-center justify-center select-none"
    >
      {/* Background Ambient Depth Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-royal-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-royal-navy/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Auxiliary Console 1: Clay Handheld (Nintendo Switch hybrid) - Top Left */}
      <div 
        className="hidden lg:block absolute -top-4 left-4 animate-float-slow transition-transform duration-200 pointer-events-none z-10"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) rotate(-6deg)` }}
      >
        <div className="w-44 p-3 rounded-[24px] clay-card-light border-2 border-white/90 shadow-clay-hover">
          <div className="flex items-center justify-between pb-1.5 border-b border-royal-navy/10">
            <div className="w-2 h-2 rounded-full bg-royal-navy" />
            <span className="text-[9px] font-mono font-bold uppercase text-royal-slate">Switch Clay Rig</span>
            <div className="w-2 h-2 rounded-full bg-royal-goldDark" />
          </div>
          <div className="h-14 my-2 rounded-xl clay-inset-light p-2 flex flex-col justify-between">
            <div className="text-[8px] font-mono text-royal-slate uppercase font-bold">Live Signals</div>
            <div className="text-xs font-bold text-royal-navy">14.2k / sec</div>
            <div className="w-full bg-slate-300 h-1 rounded-full overflow-hidden">
              <div className="bg-royal-navy h-full w-3/4 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-center px-1">
            <div className="w-4 h-4 rounded-full bg-royal-navy text-white text-[8px] flex items-center justify-center font-bold">+</div>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-royal-gold" />
              <div className="w-2.5 h-2.5 rounded-full bg-royal-navy" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Auxiliary Console 2: Retro Clay Cartridge / Game Boy - Top Right */}
      <div 
        className="hidden lg:block absolute -top-2 right-4 animate-float-reverse transition-transform duration-200 pointer-events-none z-10"
        style={{ transform: `translate(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px) rotate(6deg)` }}
      >
        <div className="w-40 p-3.5 rounded-[26px] clay-card-light border-2 border-white/90 shadow-clay-hover">
          <div className="flex items-center gap-1.5 mb-2">
            <Radio className="w-3.5 h-3.5 text-royal-goldDark" />
            <span className="text-[9px] font-mono font-bold uppercase text-royal-navy">RACK Cartridge</span>
          </div>
          <div className="p-2.5 rounded-xl clay-inset-light text-center">
            <div className="text-[8px] font-mono text-royal-slate uppercase">Trust Matrix</div>
            <div className="text-sm font-black text-royal-navy font-heading">94.2%</div>
            <div className="text-[9px] font-bold text-emerald-700">Verified</div>
          </div>
        </div>
      </div>

      {/* Main Center Console Rig Stage */}
      <div 
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-transform duration-200"
        style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 0.15}deg) rotateX(${-mousePos.y * 0.15}deg)` }}
      >
        
        {/* Left: Sculpted Porcelain & Royal Navy Console Unit */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-56 sm:w-64 h-84 rounded-[38px] clay-card-light p-6 flex flex-col justify-between border-2 border-white shadow-clay-hover animate-float-slow">
            
            {/* Top Vent & Gold Power Accent */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-royal-gold shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-royal-navy/20" />
              </div>
              <button
                onClick={() => soundEngine.playClick(680)}
                className="w-7 h-7 rounded-full clay-inset-light flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                title="Tactile Power Pulse"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-royal-gold animate-pulse" />
              </button>
            </div>

            {/* Sculpted Center Console Disc Core */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 rounded-full clay-inset-light flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white to-[#E2E8F0] shadow-sm flex items-center justify-center border border-white">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-royal-gold/80 animate-spin-slow flex items-center justify-center">
                    <Disc className="w-8 h-8 text-royal-navy" />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-[10px] font-mono tracking-widest uppercase text-royal-slate font-bold">
                  GameOS Station Rig
                </span>
                <div className="text-xs font-bold text-royal-navy mt-0.5">NEXUS AI ARCHITECTURE</div>
              </div>
            </div>

            {/* Bottom Disc Inset Slot */}
            <div className="space-y-2">
              <div className="w-36 h-2.5 rounded-full clay-pill-inset mx-auto" />
              <div className="flex justify-between items-center text-[10px] text-royal-slate font-mono px-2">
                <span>RACK-v2.4</span>
                <span className="text-royal-goldDark font-bold">Online</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-royal-slate/80 mt-3 font-mono font-medium">Tactile Clay Console Unit</span>
        </div>

        {/* Right: Porcelain & Gold Clay Controller */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start relative">
          
          <div className="relative w-full max-w-md p-6 sm:p-7 rounded-[40px] clay-card-light border-2 border-white shadow-clay-hover animate-float-reverse">
            
            {/* Controller Top Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-royal-navy/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-royal-gold" />
                <span className="text-xs font-mono uppercase tracking-wider text-royal-navy font-bold">
                  Tactile Dual Controller
                </span>
              </div>
              <span className="text-[11px] font-mono text-royal-goldDark font-bold bg-royal-champagne px-3 py-1 rounded-full border border-royal-gold/30">
                Foresight Mode
              </span>
            </div>

            {/* Controller Face: D-Pad, Center Touchpad, Action Buttons */}
            <div className="grid grid-cols-3 gap-3 items-center my-5">
              
              {/* D-Pad (Left) */}
              <div className="flex justify-center">
                <div className="relative w-22 h-22 flex items-center justify-center">
                  <div className="absolute w-22 h-7 rounded-xl clay-inset-light" />
                  <div className="absolute w-7 h-22 rounded-xl clay-inset-light" />
                  <button 
                    onClick={() => soundEngine.playClick(440)}
                    className="w-6 h-6 rounded-md bg-royal-navy shadow-sm z-10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-royal-gold" />
                  </button>
                </div>
              </div>

              {/* Center Royal Touchpad */}
              <div className="p-3.5 rounded-2xl clay-inset-light text-center">
                <div className="w-10 h-1.5 rounded-full bg-royal-gold mx-auto mb-2" />
                <div className="text-[9px] font-mono text-royal-slate uppercase font-bold">Model</div>
                <div className="text-xs font-bold text-royal-navy leading-tight">10k Player Agents</div>
              </div>

              {/* Action Buttons (Right) */}
              <div className="flex justify-center">
                <div className="relative w-22 h-22 flex items-center justify-center">
                  <button 
                    onClick={() => soundEngine.playClick(580)}
                    className="absolute top-0 w-7 h-7 rounded-full clay-card-sm flex items-center justify-center text-[11px] font-bold text-royal-navy cursor-pointer active:scale-90 transition-transform"
                  >
                    ▲
                  </button>
                  <button 
                    onClick={() => soundEngine.playClick(660)}
                    className="absolute right-0 w-7 h-7 rounded-full clay-card-sm flex items-center justify-center text-[11px] font-bold text-royal-navy cursor-pointer active:scale-90 transition-transform"
                  >
                    ●
                  </button>
                  <button 
                    onClick={() => soundEngine.playClick(780)}
                    className="absolute bottom-0 w-7 h-7 rounded-full clay-card-sm flex items-center justify-center text-[11px] font-bold text-royal-goldDark cursor-pointer active:scale-90 transition-transform"
                  >
                    ✕
                  </button>
                  <button 
                    onClick={() => soundEngine.playClick(520)}
                    className="absolute left-0 w-7 h-7 rounded-full clay-card-sm flex items-center justify-center text-[11px] font-bold text-royal-navy cursor-pointer active:scale-90 transition-transform"
                  >
                    ■
                  </button>
                </div>
              </div>

            </div>

            {/* Dual Analog Sticks */}
            <div className="flex justify-center gap-10 pt-1">
              <div className="w-12 h-12 rounded-full clay-inset-light flex items-center justify-center p-1">
                <div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] shadow-clay-sm border border-white transition-transform duration-100"
                  style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
                />
              </div>
              <div className="w-12 h-12 rounded-full clay-inset-light flex items-center justify-center p-1">
                <div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] shadow-clay-sm border border-white transition-transform duration-100"
                  style={{ transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)` }}
                />
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-5 pt-3.5 border-t border-royal-navy/10 flex items-center justify-between text-[11px] text-royal-slate font-medium">
              <span>Dynamic Telemetry Ingestion</span>
              <span className="font-bold text-royal-navy">94% Community Trust</span>
            </div>

          </div>

          {/* Floating Accompanying Clay Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="clay-card-sm px-4 py-2 flex items-center gap-2 text-xs font-semibold text-royal-navy">
              <Shield className="w-4 h-4 text-royal-goldDark" />
              <span>Anti-Churn Pre-Validation</span>
            </div>
            <div className="clay-card-sm px-4 py-2 flex items-center gap-2 text-xs font-semibold text-royal-navy">
              <Cpu className="w-4 h-4 text-royal-navy" />
              <span>RACK Cognitive Engine</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
