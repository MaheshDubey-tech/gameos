import React, { useState } from 'react';
import { Radio, Cpu, Compass, Wrench, TrendingUp, ArrowRight, Play, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { RACK_STEPS } from '../data/mockData';

export const RACKFrameworkInteractive: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentStepData = RACK_STEPS.find(s => s.num === activeStep) || RACK_STEPS[0];

  const runAllSteps = () => {
    setIsSimulating(true);
    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current > 5) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStep(current);
      }
    }, 900);
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="rack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Glow decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 hero-glow-cyan pointer-events-none -z-10 blur-3xl opacity-30" />
      <div className="absolute bottom-10 right-0 w-96 h-96 hero-glow-purple pointer-events-none -z-10 blur-3xl opacity-30" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Cpu className="w-4 h-4" />
          <span>Proprietary Methodology Moat</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          RACK: From Chaos to Cash
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          From reactive firefighting to predictive foresight. A complete cognitive pipeline turning multi-source player noise into high-margin gameplay decisions.
        </p>

        {/* Action button */}
        <div className="mt-6">
          <button
            onClick={runAllSteps}
            disabled={isSimulating}
            className="clay-btn clay-purple-btn px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Pipeline Flow...' : 'Auto-Run 5-Step Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Step Buttons (Clay Pills Bar) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {RACK_STEPS.map((step) => {
          const isActive = activeStep === step.num;
          return (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`p-4 rounded-3xl transition-all text-left flex flex-col justify-between cursor-pointer border ${
                isActive
                  ? 'clay-card border-cyan-400/50 shadow-clay-cyan scale-[1.03] bg-gradient-to-br from-[#1E2C48] to-[#121B30]'
                  : 'clay-card-flat border-white/5 hover:border-white/20 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                  style={{
                    backgroundColor: isActive ? step.color : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#05101A' : '#94A3B8'
                  }}
                >
                  0{step.num}
                </span>
                <div style={{ color: isActive ? step.color : '#64748B' }}>
                  {getStepIcon(step.icon)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">{step.sub}</div>
                <div className="text-sm font-bold text-white mt-0.5">{step.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="clay-card p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        {/* Accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500"
          style={{ backgroundColor: currentStepData.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Stage description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span 
                className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase"
                style={{ 
                  backgroundColor: `${currentStepData.color}20`,
                  color: currentStepData.color,
                  border: `1px solid ${currentStepData.color}40`
                }}
              >
                Phase 0{currentStepData.num} // {currentStepData.sub}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {currentStepData.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentStepData.num === 1 && "Ingests raw high-velocity signals from Discord discussion channels, Reddit threads, Steam community reviews, and real-time backend gameplay telemetry."}
              {currentStepData.num === 2 && "Transforms unstructured social noise into predictive behavioral models using fine-tuned gaming LLMs and cognitive archetype evaluation."}
              {currentStepData.num === 3 && "Eliminates design ambiguity with prioritized sprint tickets, precise churn probability matrices, and concrete player archetype impact forecasts."}
              {currentStepData.num === 4 && "Provides studio engineering & design teams with de-risked live-ops roadmaps, cutting ideation-to-validation cycles from 3 weeks down to 1 day."}
              {currentStepData.num === 5 && "Delivers concrete bottom-line growth: 15–22% revenue uplift, 30% retention boosts, and bulletproof player community trust."}
            </p>

            {/* Sub-item pills */}
            <div className="pt-2">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 font-semibold">Key Deliverables & Components:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStepData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0C121F] border border-white/5 text-xs font-medium text-slate-200">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: currentStepData.color }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Stage Visualizer */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-[32px] bg-[#0A0E18] border border-white/10 shadow-[inset_0_4px_16px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-slate-400">RACK Cognitive Pipeline State</span>
                <span className="text-xs font-bold font-mono" style={{ color: currentStepData.color }}>Step {currentStepData.num} / 5</span>
              </div>

              {/* Dynamic Visual Content according to step */}
              <div className="py-6 min-h-[220px] flex flex-col justify-center">
                {currentStepData.num === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Stream: Reddit, Discord, Steam API</span>
                      <span className="text-cyan-400">14,250 signals ingested</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#141C2E] border border-cyan-500/30 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">r/</div>
                      <div className="text-xs text-slate-200 truncate">"Pelican drops feel unfairly timed during bile titan swarms..."</div>
                      <span className="text-[10px] text-cyan-400 font-mono ml-auto">HOT</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#141C2E] border border-purple-500/30 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">DISC</div>
                      <div className="text-xs text-slate-200 truncate">"Platinum Warbond fast-track would be sick if pacing is fair"</div>
                      <span className="text-[10px] text-purple-400 font-mono ml-auto">FEED</span>
                    </div>
                  </div>
                )}

                {currentStepData.num === 2 && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-400 font-mono">Cognitive Archetype Clustering & Vectorization:</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Tactician Grinder Response Vector</span>
                        <span className="text-cyan-400 font-bold">92% Match</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-cyan-400 w-[92%]" />
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Co-op Socialite Session Retention</span>
                        <span className="text-purple-400 font-bold">88% Match</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-purple-400 w-[88%]" />
                      </div>
                    </div>
                  </div>
                )}

                {currentStepData.num === 3 && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-[#141F33] border border-blue-500/30">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">Backlog Spec #042: Pelican Extraction Surge Drop</span>
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">P0 CRITICAL</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">Pre-validated risk mitigation: Inverts late-game match abandonment by 34%.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#141F33] border border-blue-500/30">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">Backlog Spec #043: 15-Piece Warbond Progression Pacing</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">P1 HIGH</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">Monetization safety check: Prevents implicit contract backlash.</p>
                    </div>
                  </div>
                )}

                {currentStepData.num === 4 && (
                  <div className="text-center p-4">
                    <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                      <Wrench className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-bold text-white">Sprint Acceleration Activated</div>
                    <div className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                      Event prototype constructed in <span className="text-emerald-400 font-bold">1 day</span> vs traditional 2–3 week discovery sprint cycles (80% cost reduction).
                    </div>
                  </div>
                )}

                {currentStepData.num === 5 && (
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-[#1A261D] border border-emerald-500/30">
                      <div className="text-2xl font-black text-emerald-400 font-heading">+22%</div>
                      <div className="text-[11px] text-slate-300 font-semibold">ARPPU Uplift</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1A261D] border border-emerald-500/30">
                      <div className="text-2xl font-black text-cyan-400 font-heading">+30%</div>
                      <div className="text-[11px] text-slate-300 font-semibold">DAU Engagement</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1A261D] border border-emerald-500/30">
                      <div className="text-2xl font-black text-purple-400 font-heading">80%</div>
                      <div className="text-[11px] text-slate-300 font-semibold">Sprint Waste Cut</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1A261D] border border-emerald-500/30">
                      <div className="text-2xl font-black text-amber-400 font-heading">94%</div>
                      <div className="text-[11px] text-slate-300 font-semibold">Community Trust</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Bar inside card */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  ← Previous Phase
                </button>
                <button
                  onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                  disabled={activeStep === 5}
                  className="clay-btn bg-[#18233A] text-slate-200 hover:text-white px-4 py-1.5 text-xs font-bold border border-white/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-30"
                >
                  <span>Next Phase</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Adaptive Layer Banner (From Page 4) */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#11192B] via-[#16213B] to-[#11192B] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                ∞
              </div>
              <div>
                <div className="text-sm font-bold text-white">RACK Framework (Adaptive Layer)</div>
                <div className="text-xs text-slate-400">Recursive Learning: Iterates with fresh telemetry to continuously improve simulation accuracy.</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <span>Community Intel</span>
              <span>→</span>
              <span>Response Modeling</span>
              <span>→</span>
              <span>Strategic Validation</span>
              <span>→</span>
              <span className="text-emerald-400 font-bold">Better Outcomes</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

