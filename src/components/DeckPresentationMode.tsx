import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, X, Maximize2, MonitorPlay, 
  Sparkles, CheckCircle2, Trophy, Users, ShieldAlert, DollarSign,
  TrendingUp, Compass, Award, ExternalLink
} from 'lucide-react';
import { soundEngine } from './AudioEngine';

interface Props {
  onClose: () => void;
  onLaunchWorkbench: () => void;
}

export const DeckPresentationMode: React.FC<Props> = ({ onClose, onLaunchWorkbench }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const totalSlides = 13;

  const nextSlide = () => {
    soundEngine.playClick(600);
    setCurrentSlide(prev => (prev < totalSlides ? prev + 1 : 1));
  };

  const prevSlide = () => {
    soundEngine.playClick(440);
    setCurrentSlide(prev => (prev > 1 ? prev - 1 : totalSlides));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#070B14]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
      {/* Top Deck Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <MonitorPlay className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Master Deck Presentation</span>
            <div className="text-sm font-bold text-white">GameOS Executive Specification</div>
          </div>
        </div>

        {/* Slide Counter & Close Button */}
        <div className="flex items-center gap-3">
          <div className="clay-pill-inset px-4 py-1.5 text-xs font-mono text-cyan-300 font-bold border border-cyan-500/30">
            Slide {currentSlide} of {totalSlides}
          </div>
          <button
            onClick={() => {
              soundEngine.playClick(300);
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#18233A] hover:bg-[#202E4C] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-all"
            title="Exit Presentation (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Viewer Canvas */}
      <div className="max-w-6xl w-full mx-auto my-auto py-6">
        <div className="clay-card p-6 sm:p-12 min-h-[500px] flex flex-col justify-between border border-cyan-400/30 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Slide 1: Cover */}
          {currentSlide === 1 && (
            <div className="my-auto text-center space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase border border-cyan-500/30">
                PROPRIETARY SPECIFICATION
              </span>
              <h1 className="text-5xl sm:text-7xl font-black text-white font-heading tracking-tight">
                GAME <span className="text-cyan-400">OS</span>
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-slate-200 tracking-wide max-w-2xl mx-auto uppercase">
                Full Stack AI Enabled PM Consultancy for Gaming
              </p>
              <div className="pt-8 border-t border-white/10 max-w-xl mx-auto">
                <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">Founding Team Members:</div>
                <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-cyan-300">
                  <span className="px-3 py-1 rounded-xl bg-[#0D1424] border border-white/5">Mahesh Dubey</span>
                  <span className="px-3 py-1 rounded-xl bg-[#0D1424] border border-white/5">Riya Sharma</span>
                  
                  <span className="px-3 py-1 rounded-xl bg-[#0D1424] border border-white/5">Mohammad Taha Kazi</span>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: The Full Picture & Crisis */}
          {currentSlide === 2 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-rose-400 font-bold uppercase">Slide 02 // The Problem Landscape</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">The Full Picture: The Crisis in AAA Gaming</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#140E1B] border border-rose-500/30">
                  <div className="text-xs text-slate-400 uppercase font-mono">Sony Concord</div>
                  <div className="text-2xl font-black text-rose-400 font-heading mt-1">$400M Loss</div>
                  <div className="text-xs text-rose-300 mt-1">-12% Stock Drop • Shutdown in 14 Days</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#140E1B] border border-rose-500/30">
                  <div className="text-xs text-slate-400 uppercase font-mono">WB Suicide Squad</div>
                  <div className="text-2xl font-black text-rose-400 font-heading mt-1">$200M Loss</div>
                  <div className="text-xs text-rose-300 mt-1">-18% Stock Drop • 92% Day-30 Churn</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#140E1B] border border-rose-500/30">
                  <div className="text-xs text-slate-400 uppercase font-mono">Ubisoft Skull & Bones</div>
                  <div className="text-2xl font-black text-rose-400 font-heading mt-1">$120M Loss</div>
                  <div className="text-xs text-rose-300 mt-1">-22% Stock Drop • Player Rejection</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/5 text-xs text-slate-300">
                <span className="font-bold text-white">The Failure Loop:</span> Spiraling $300M budgets + Speed over accuracy + Ignoring player psychology = Catastrophic community trust deficit.
              </div>
            </div>
          )}

          {/* Slide 3: Meteoric Rise to Smarter Future */}
          {currentSlide === 3 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Slide 03 // Solution Positioning</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">From Meteoric Rise to a Smarter Future</h2>
              <p className="text-sm text-slate-300">
                Embracer Group, Ubisoft, and major publishers overexpanded, leading to massive integration issues and disconnected player experiences. GameOS delivers <strong>Foresight-as-a-Service</strong> to turn chaos into player-centric growth.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-[#0D1526] border border-cyan-500/20">
                  <div className="text-2xl font-black text-cyan-400 font-heading">15–22%</div>
                  <div className="text-xs text-slate-300 mt-1">Revenue Uplift</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0D1526] border border-purple-500/20">
                  <div className="text-2xl font-black text-purple-400 font-heading">+30%</div>
                  <div className="text-xs text-slate-300 mt-1">Player Retention</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0D1526] border border-emerald-500/20">
                  <div className="text-2xl font-black text-emerald-400 font-heading">80% Faster</div>
                  <div className="text-xs text-slate-300 mt-1">Development Speed</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0D1526] border border-amber-500/20">
                  <div className="text-2xl font-black text-amber-400 font-heading">94% Accuracy</div>
                  <div className="text-xs text-slate-300 mt-1">Community Trust</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 4: RACK Workflow */}
          {currentSlide === 4 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase">Slide 04 // Core Proprietary Framework</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">RACK: From Chaos to Cash</h2>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#0C121F] border border-cyan-400/30">
                  <div className="text-xs font-bold text-cyan-400 font-mono">1. INPUT</div>
                  <div className="text-sm font-bold text-white mt-1">Signal Chaos</div>
                  <div className="text-[11px] text-slate-400 mt-1">Social chatter, gameplay logs, Discord feedback.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0C121F] border border-purple-400/30">
                  <div className="text-xs font-bold text-purple-400 font-mono">2. PROCESS</div>
                  <div className="text-sm font-bold text-white mt-1">AI Analysis</div>
                  <div className="text-[11px] text-slate-400 mt-1">Pattern recognition & behavioral modeling.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0C121F] border border-blue-400/30">
                  <div className="text-xs font-bold text-blue-400 font-mono">3. INSIGHT</div>
                  <div className="text-sm font-bold text-white mt-1">Strategic Clarity</div>
                  <div className="text-[11px] text-slate-400 mt-1">Prioritized tickets & player archetype specs.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0C121F] border border-emerald-400/30">
                  <div className="text-xs font-bold text-emerald-400 font-mono">4. EXECUTE</div>
                  <div className="text-sm font-bold text-white mt-1">Implement Right</div>
                  <div className="text-[11px] text-slate-400 mt-1">Validated roadmaps, avoiding wasted sprints.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0C121F] border border-amber-400/30">
                  <div className="text-xs font-bold text-amber-400 font-mono">5. RESULT</div>
                  <div className="text-sm font-bold text-white mt-1">Business Impact</div>
                  <div className="text-[11px] text-slate-400 mt-1">Sustainable revenue, retention & player trust.</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 5: Helldivers II Live Validation */}
          {currentSlide === 5 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Slide 05 // Case Study Validation</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Helldivers II: Real Impact Telemetry</h2>
              <blockquote className="p-4 rounded-2xl bg-[#140E24] border border-purple-400/40 text-sm text-slate-200 italic">
                "Players react to perceived violations of implicit promises, not just mechanics."
              </blockquote>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/10">
                  <span className="font-bold text-cyan-400">Revenue Impact:</span>
                  <p className="text-slate-300 mt-1">15–22% ARPPU increase via optional platinum fast-tracks on event rewards.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/10">
                  <span className="font-bold text-purple-400">Player Engagement:</span>
                  <p className="text-slate-300 mt-1">+30% DAU boost with dynamic Pelican event drops and 15-piece retention arc.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/10">
                  <span className="font-bold text-emerald-400">Dev Efficiency:</span>
                  <p className="text-slate-300 mt-1">80% cost reduction; event prototype built in 1 day vs 2–3 week cycles.</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6 & 7: Heather Chandler Consultation */}
          {currentSlide === 6 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Slide 06–07 // Industry Validation</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Expert Consultation: Heather Chandler</h2>
              <p className="text-xs text-cyan-300 font-mono">
                Principal Producer, Helldivers II (Arrowhead Game Studios) • Ex-Fortnite • Author of The Game Production Handbook
              </p>
              <div className="p-6 rounded-3xl bg-[#0A101C] border border-cyan-500/30 space-y-3">
                <p className="text-base sm:text-lg text-white font-medium italic">
                  "No, I've seen smaller-scale tools, but never one that <span className="text-cyan-400 font-bold underline">actually generates specific backlog items and ways to solve them</span>. That's really different."
                </p>
                <div className="text-xs text-slate-400">— Follow-up requested to explore live studio integration</div>
              </div>
            </div>
          )}

          {/* Slide 8: Market Opportunity */}
          {currentSlide === 8 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-blue-400 font-bold uppercase">Slide 08 // Market Sizing</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Market Opportunity: TAM • SAM • SOM</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#0D1526] border border-blue-500/30">
                  <div className="text-xs uppercase font-mono text-blue-400 font-bold">TAM</div>
                  <div className="text-3xl font-black text-white font-heading mt-1">$3 Billion</div>
                  <div className="text-xs text-slate-400 mt-1">25,000+ Studios Globally (₹25,000 Cr)</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#0D1526] border border-purple-500/30">
                  <div className="text-xs uppercase font-mono text-purple-400 font-bold">SAM</div>
                  <div className="text-3xl font-black text-purple-400 font-heading mt-1">$187 Million</div>
                  <div className="text-xs text-slate-400 mt-1">1,300–3,300 Outsource-Ready Studios (₹1,560 Cr)</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#0D1526] border border-emerald-500/30">
                  <div className="text-xs uppercase font-mono text-emerald-400 font-bold">SOM</div>
                  <div className="text-3xl font-black text-emerald-400 font-heading mt-1">$94 Million</div>
                  <div className="text-xs text-slate-400 mt-1">650+ Studios Realistic 50% Capture (₹780 Cr)</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 9: Partnership Models */}
          {currentSlide === 9 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase">Slide 09 // Commercial Tiers</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Partnership Models</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
                  <div className="text-xs font-mono text-slate-400">$ • 2–4 Weeks</div>
                  <div className="text-base font-bold text-white mt-1">Feature-Focused Simulation</div>
                  <p className="text-xs text-slate-400 mt-2">Surgical intervention to pre-validate single high-stakes content drops.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#140F24] border border-purple-400/40 shadow-clay-purple">
                  <div className="text-xs font-mono text-purple-300">$$ • 12–24 Weeks</div>
                  <div className="text-base font-bold text-white mt-1">Domain-Scoped Deep Dive</div>
                  <p className="text-xs text-slate-400 mt-2">Fix broken progression loops, monetization, or narrative-gameplay conflicts.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
                  <div className="text-xs font-mono text-slate-400">$$$ • 1 Year to ∞</div>
                  <div className="text-base font-bold text-white mt-1">Strategic Retainer</div>
                  <p className="text-xs text-slate-400 mt-2">Embedded continuous foresight division with 24/7 sentiment monitoring.</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 10: Our Unfair Advantage */}
          {currentSlide === 10 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Slide 10 // The Moat</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Unfair Advantage</h2>
              <div className="p-4 rounded-2xl bg-[#0C121F] border border-white/10 text-center text-sm font-bold text-cyan-300">
                Architects + Product + Market Fit = Founder-Product-Market Fit
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/5">
                  <div className="font-bold text-white mb-1">The Architects</div>
                  <p className="text-slate-400">Exceptional gamers with 10,000+ hours. Winners at IIT, IIM, BITS, IMT national hackathons.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/5">
                  <div className="font-bold text-white mb-1">The Product Moat</div>
                  <p className="text-slate-400">RACK Cognitive Simulation vs rudimentary dashboard analytics. Proprietary, defensible IP.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/5">
                  <div className="font-bold text-white mb-1">Market Timing</div>
                  <p className="text-slate-400">The 2024 AAA crisis creates urgent, undeniable demand for pre-validation tools.</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 11: 6-Month GTM Roadmap */}
          {currentSlide === 11 && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase">Slide 11 // Execution Plan</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Execution & Go-to-Market Roadmap</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#0C121F] border border-cyan-400/30">
                  <div className="font-mono text-cyan-400 font-bold">Month 1–2: Foundation</div>
                  <div className="text-sm font-bold text-white mt-1">MVP Finalization & Outreach</div>
                  <p className="text-slate-400 mt-2">Finalize core MVP stack; start high-intent outreach to ~20 live-service studios.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0C121F] border border-purple-400/30">
                  <div className="font-mono text-purple-400 font-bold">Month 3–4: Proof of Concept</div>
                  <div className="text-sm font-bold text-white mt-1">2 Paid Pilot Projects</div>
                  <p className="text-slate-400 mt-2">Telemetry ingestion pipeline; deliver KPI-prioritized roadmaps for pilots.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0C121F] border border-emerald-400/30">
                  <div className="font-mono text-emerald-400 font-bold">Month 5–6: Scale</div>
                  <div className="text-sm font-bold text-white mt-1">GTM Expansion & SaaS Shift</div>
                  <p className="text-slate-400 mt-2">Publish demo simulations; transition from service-only to modular SaaS.</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 12 & 13: Financial Growth Roadmap */}
          {(currentSlide === 12 || currentSlide === 13) && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Slide {currentSlide} // Unit Economics & Projections</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Financial Roadmap: Year 1 & Valuation</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-[#0D1815] border border-emerald-500/30">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">₹22 Cr</div>
                  <div className="text-xs font-bold text-white mt-1">Total Target ARR</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0D1815] border border-cyan-500/30">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-heading">₹20.73 Cr</div>
                  <div className="text-xs font-bold text-white mt-1">EBITDA (94.2%)</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0D1815] border border-purple-500/30">
                  <div className="text-2xl sm:text-3xl font-black text-purple-400 font-heading">₹2.2 Cr</div>
                  <div className="text-xs font-bold text-white mt-1">Per Employee Rev</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0D1815] border border-amber-500/30">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">₹10.5L</div>
                  <div className="text-xs font-bold text-white mt-1">Cost Per Client</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#142338] to-[#121B30] border border-cyan-400/30 text-center">
                <div className="text-xs uppercase font-mono text-cyan-300">Estimated Company Valuation</div>
                <div className="text-3xl font-black text-white font-heading mt-1">₹140–185 Cr ($17M–$22M)</div>
                <div className="text-[11px] text-slate-400 mt-1">Blended: 40% Revenue Multiple (3.5x) + 60% EBITDA Multiple (9x)</div>
              </div>
            </div>
          )}

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundEngine.playClick(500);
                    setCurrentSlide(i + 1);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === i + 1 ? 'w-8 bg-cyan-400 shadow-[0_0_8px_#00E5FF]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                onClose();
                onLaunchWorkbench();
              }}
              className="clay-btn clay-cyan-btn px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Test Prototype Workbench</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto pt-2">
        <button
          onClick={prevSlide}
          className="clay-btn bg-[#18233A] text-slate-200 hover:text-white px-5 py-2.5 text-xs font-bold border border-white/10 flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (←)</span>
        </button>

        <span className="text-xs text-slate-400 hidden sm:inline font-mono">
          Use Keyboard Arrow Keys [← / →] or Space to navigate
        </span>

        <button
          onClick={nextSlide}
          className="clay-btn clay-cyan-btn px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-clay-cyan"
        >
          <span>Next Slide (→)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

