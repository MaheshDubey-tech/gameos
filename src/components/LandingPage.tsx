import React from 'react';
import { 
  Gamepad2, ArrowRight, ShieldCheck, Sparkles, TrendingUp, 
  Layers, Cpu, Award, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { AnimatedConsoleIntro } from './AnimatedConsoleIntro';

interface Props {
  onEnterPlatform: () => void;
}

export const LandingPage: React.FC<Props> = ({ onEnterPlatform }) => {
  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0F1D38] overflow-x-hidden selection:bg-[#C5A880] selection:text-[#0F1D38]">
      
      {/* 1. ELEGANT ROYAL NAV BAR */}
      <header className="sticky top-0 z-50 bg-[#EEF2F6]/90 backdrop-blur-md border-b border-[#D6E0EC] px-6 lg:px-12 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo with Soft Clay Stamp */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[16px] clay-card-sm flex items-center justify-center border border-white">
              <Gamepad2 className="w-5 h-5 text-royal-navy" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-royal-navy font-heading">
                GAME<span className="text-royal-goldDark">OS</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-royal-slate font-bold block -mt-1">
                PM Foresight for Gaming
              </span>
            </div>
          </div>

          {/* Simple Intro Nav Links & CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-xs font-bold text-royal-slate font-mono uppercase tracking-wider">
              <span>Anticipate</span>
              <span>•</span>
              <span>Simulate</span>
              <span>•</span>
              <span>Execute</span>
            </div>

            <button
              onClick={onEnterPlatform}
              className="clay-btn clay-btn-navy px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-clay-btn-navy"
            >
              <span>Enter GameOS Platform</span>
              <ArrowRight className="w-3.5 h-3.5 text-royal-goldLight" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO INTRO SECTION */}
      <section className="pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        
        {/* Top Soft Royal Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-pill-inset text-royal-navy text-xs font-mono font-bold tracking-wider uppercase mb-6 border border-white">
          <span className="w-2 h-2 rounded-full bg-royal-goldDark animate-pulse" />
          <span>Full Stack AI-Enabled PM Foresight for Game Studios</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-royal-navy tracking-tight leading-[1.08] max-w-4xl mx-auto font-heading mb-6">
          Prevent Game Failure. <br />
          <span className="text-royal-goldDark underline decoration-royal-goldLight/60 decoration-wavy">
            Build What Players Love.
          </span>
        </h1>

        {/* Hero Subtitle (Clean & Reduced) */}
        <p className="text-base sm:text-lg text-royal-slate max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
          Transform unstructured community chatter into pre-validated live-service roadmaps before committing multi-million engineering sprints.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onEnterPlatform}
            className="clay-btn clay-btn-navy px-8 py-4 text-sm font-bold flex items-center gap-3 cursor-pointer shadow-clay-btn-navy group"
          >
            <Layers className="w-4 h-4 text-royal-goldLight transition-transform group-hover:scale-110" />
            <span>Launch GameOS Workspace</span>
            <ArrowRight className="w-4 h-4 text-royal-goldLight" />
          </button>

          <button
            onClick={onEnterPlatform}
            className="clay-btn clay-btn-white px-7 py-4 text-sm font-bold text-royal-navy border border-white cursor-pointer"
          >
            <span>Explore RACK Engine & Case Studies</span>
          </button>
        </div>

        {/* 3. ANIMATED 3D CLAY CONSOLE SHOWCASE */}
        <AnimatedConsoleIntro />

      </section>

      {/* 4. STRUCTURAL SECTION: THE 3 PILLARS OF FORESIGHT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-royal-goldDark font-bold">
            Methodology Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-royal-navy mt-1 font-heading">
            The Three Pillars of Gaming Foresight
          </h2>
          <p className="text-sm text-royal-slate mt-2">
            Eliminating guesswork in AAA game direction through structured cognitive modeling.
          </p>
        </div>

        {/* 3 Structural Clay Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="clay-card-light p-8 flex flex-col justify-between border border-white/80">
            <div>
              <div className="w-12 h-12 rounded-[18px] clay-inset-light flex items-center justify-center mb-6">
                <span className="text-base font-black font-mono text-royal-navy">01</span>
              </div>
              <h3 className="text-xl font-bold text-royal-navy mb-2 font-heading">
                Signal Ingestion
              </h3>
              <p className="text-xs sm:text-sm text-royal-slate leading-relaxed">
                Captures high-velocity chatter across Discord, Reddit, Steam reviews, and raw gameplay telemetry to isolate implicit gameplay expectations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DCE4ED] text-[11px] font-mono text-royal-goldDark font-bold">
              ✓ 14,000+ Multi-Source Signals
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="clay-card-light p-8 flex flex-col justify-between border border-white/80">
            <div>
              <div className="w-12 h-12 rounded-[18px] clay-inset-light flex items-center justify-center mb-6">
                <span className="text-base font-black font-mono text-royal-goldDark">02</span>
              </div>
              <h3 className="text-xl font-bold text-royal-navy mb-2 font-heading">
                Cognitive Simulation
              </h3>
              <p className="text-xs sm:text-sm text-royal-slate leading-relaxed">
                Deploys 10,000 virtual gamer agents across distinct player archetypes to simulate response curves, churn risk, and monetization sentiment.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DCE4ED] text-[11px] font-mono text-royal-navy font-bold">
              ✓ 94% Behavioral Accuracy
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="clay-card-light p-8 flex flex-col justify-between border border-white/80">
            <div>
              <div className="w-12 h-12 rounded-[18px] clay-inset-light flex items-center justify-center mb-6">
                <span className="text-base font-black font-mono text-royal-navy">03</span>
              </div>
              <h3 className="text-xl font-bold text-royal-navy mb-2 font-heading">
                De-risked Execution
              </h3>
              <p className="text-xs sm:text-sm text-royal-slate leading-relaxed">
                Converts validated simulation insights directly into ready-to-commit Jira/Linear PM tickets, accelerating feature validation cycles by 80%.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DCE4ED] text-[11px] font-mono text-royal-goldDark font-bold">
              ✓ 1 Day vs 3 Week Discovery
            </div>
          </div>

        </div>
      </section>

      {/* 5. INDUSTRY VALIDATION BRIEF (Crisp & High Impact) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="clay-card-light p-8 sm:p-10 border border-white relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Endorsement Avatar */}
            <div className="flex-shrink-0 text-center">
              <div className="w-20 h-20 rounded-[24px] clay-card-sm flex items-center justify-center mx-auto border-2 border-white shadow-sm">
                <span className="text-2xl font-black font-heading text-royal-navy">HC</span>
              </div>
              <div className="mt-2 text-xs font-bold text-royal-navy">Heather Chandler</div>
              <div className="text-[10px] text-royal-slate font-mono">Principal Producer, Helldivers II</div>
            </div>

            {/* Quote Body */}
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-champagne text-royal-goldDark text-[11px] font-mono font-bold uppercase border border-royal-gold/20">
                <Award className="w-3.5 h-3.5" />
                <span>Industry Case Validation</span>
              </div>
              <blockquote className="text-base sm:text-lg font-bold text-royal-navy leading-relaxed italic">
                "No, I've seen smaller-scale tools, but never one that <span className="text-royal-goldDark underline decoration-royal-goldLight">actually generates specific backlog items and ways to solve them</span>. That's really different."
              </blockquote>
              <div className="text-xs text-royal-slate font-mono">
                Arrowhead Game Studios • Ex-Fortnite Producer • Author of The Game Production Handbook
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar in Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#DCE4ED] text-center">
            <div>
              <div className="text-2xl font-black text-royal-navy font-heading">+15–22%</div>
              <div className="text-[11px] font-mono text-royal-slate mt-0.5">ARPPU Uplift</div>
            </div>
            <div>
              <div className="text-2xl font-black text-royal-goldDark font-heading">+30%</div>
              <div className="text-[11px] font-mono text-royal-slate mt-0.5">DAU Retention</div>
            </div>
            <div>
              <div className="text-2xl font-black text-royal-navy font-heading">80%</div>
              <div className="text-[11px] font-mono text-royal-slate mt-0.5">Dev Waste Cut</div>
            </div>
            <div>
              <div className="text-2xl font-black text-royal-goldDark font-heading">₹22 Cr</div>
              <div className="text-[11px] font-mono text-royal-slate mt-0.5">Year 1 Target</div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ENTER THE RUNNING PLATFORM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="clay-card-light p-10 sm:p-12 border border-white">
          <span className="text-xs font-mono uppercase tracking-widest text-royal-goldDark font-bold">
            Interactive Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-royal-navy mt-1 mb-4 font-heading">
            Enter the GameOS Operating System
          </h2>
          <p className="text-sm text-royal-slate max-w-lg mx-auto mb-8">
            Access the live simulation workbench, the 2024 crisis post-mortems, the full RACK pipeline, and unit financial projections.
          </p>

          <button
            onClick={onEnterPlatform}
            className="clay-btn clay-btn-navy px-10 py-4 text-base font-bold flex items-center gap-3 mx-auto cursor-pointer shadow-clay-btn-navy"
          >
            <span>Open GameOS Platform</span>
            <ChevronRight className="w-5 h-5 text-royal-goldLight" />
          </button>
        </div>
      </section>

      {/* 7. ELEGANT FOOTER */}
      <footer className="border-t border-[#D6E0EC] py-10 px-6 max-w-6xl mx-auto text-xs text-royal-slate flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-royal-navy">GameOS Technologies</span> • PM Foresight Platform
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px]">
          <span>Mahesh Dubey</span>
          <span>•</span>
          <span>Riya Sharma</span>
          <span>•</span>
          <span>Mohammad Taha Kazi</span>
        </div>
      </footer>

    </div>
  );
};

