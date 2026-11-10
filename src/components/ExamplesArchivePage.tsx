import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Award, Zap, TrendingUp, 
  DollarSign, Globe, Target, Calculator, CheckCircle2, 
  FileText, Rocket, Sparkles, AlertTriangle, ArrowRight, Layers
} from 'lucide-react';
import { 
  CRISIS_FAILURES_2024, RACK_STEPS, PARTNERSHIP_TIERS, 
  TEAM_MEMBERS, GAME_PRESETS 
} from '../data/mockData';
import { soundEngine } from './AudioEngine';

interface Props {
  onBackToMainExecution: () => void;
  onBackToIntro: () => void;
}

export const ExamplesArchivePage: React.FC<Props> = ({
  onBackToMainExecution,
  onBackToIntro
}) => {
  const [activeTab, setActiveTab] = useState<'HELLDIVERS' | 'FAILURES' | 'RACK_PIPELINE' | 'MARKET_FINANCIALS'>('HELLDIVERS');
  const [pelicanEventTriggered, setPelicanEventTriggered] = useState(false);

  // ROI Calculator
  const [studioCount, setStudioCount] = useState<number>(4);
  const [budgetPerTitle, setBudgetPerTitle] = useState<number>(1.2); // Cr INR

  const estimatedSavedWaste = Math.round(studioCount * budgetPerTitle * 0.4 * 10) / 10;
  const projectedRevenueGain = Math.round(studioCount * budgetPerTitle * 0.22 * 10) / 10;

  const triggerPelicanEvent = () => {
    soundEngine.playSuccess();
    setPelicanEventTriggered(true);
    setTimeout(() => setPelicanEventTriggered(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0F1D38] pb-24 selection:bg-[#C5A880] selection:text-[#0F1D38]">
      
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#EEF2F6]/95 backdrop-blur-md border-b border-[#D6E0EC] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMainExecution}
              className="clay-btn clay-btn-white px-3.5 py-1.5 text-xs font-bold text-royal-navy flex items-center gap-1.5 cursor-pointer border border-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio Console (Live Engine)</span>
            </button>

            <div className="h-4 w-px bg-slate-300" />

            <span className="text-xs font-mono font-bold text-royal-goldDark bg-royal-champagne px-3 py-1 rounded-full border border-royal-gold/30">
              Reference & Historical Cases Archive
            </span>
          </div>

          <button
            onClick={onBackToIntro}
            className="text-xs font-bold text-royal-slate hover:text-royal-navy cursor-pointer"
          >
            Go to Intro Landing Page
          </button>

        </div>
      </header>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="clay-card-light p-2 flex flex-wrap gap-2 border border-white/80 mb-8">
          <button
            onClick={() => { soundEngine.playClick(480); setActiveTab('HELLDIVERS'); }}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'HELLDIVERS' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-royal-goldLight" />
            <span>1. Helldivers II Validation</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveTab('FAILURES'); }}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'FAILURES' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-royal-goldLight" />
            <span>2. 2024 Failures Post-Mortems</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveTab('RACK_PIPELINE'); }}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'RACK_PIPELINE' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Layers className="w-4 h-4 text-royal-goldLight" />
            <span>3. RACK 5-Step Methodology</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveTab('MARKET_FINANCIALS'); }}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'MARKET_FINANCIALS' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-royal-goldLight" />
            <span>4. Market TAM & Financials</span>
          </button>
        </div>

        {/* 3. CASE STUDY 1: HELLDIVERS II LIVE VALIDATION */}
        {activeTab === 'HELLDIVERS' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header Quote */}
            <div className="clay-card-light p-8 sm:p-10 border border-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl clay-card-sm flex items-center justify-center mx-auto border-2 border-white text-2xl font-black text-royal-navy font-heading">
                    HC
                  </div>
                  <div className="mt-2 text-xs font-bold text-royal-navy">Heather Chandler</div>
                  <div className="text-[10px] text-royal-slate font-mono">Principal Producer, Helldivers II</div>
                </div>

                <div className="space-y-3 text-center md:text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-champagne text-royal-goldDark text-xs font-mono font-bold uppercase border border-royal-gold/20">
                    <Award className="w-3.5 h-3.5" />
                    <span>Industry Expert Consultation</span>
                  </span>
                  <blockquote className="text-base sm:text-lg font-bold text-royal-navy leading-relaxed italic">
                    "No, I've seen smaller-scale tools, but never one that <span className="text-royal-goldDark underline decoration-royal-goldLight">actually generates specific backlog items and ways to solve them</span>. That's really different."
                  </blockquote>
                  <div className="text-xs text-royal-slate font-mono">
                    Arrowhead Game Studios • Ex-Fortnite Producer • Author of The Game Production Handbook
                  </div>
                </div>
              </div>

              {/* 3 Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#DCE4ED]">
                <div className="clay-card-sm p-5 border-t-4 border-t-royal-navy">
                  <div className="text-xs font-mono text-royal-slate uppercase font-bold">Revenue Impact</div>
                  <div className="text-2xl font-black text-royal-navy font-heading mt-1">15–22% ARPPU</div>
                  <p className="text-xs text-royal-slate mt-2 leading-relaxed">
                    Projected ARPPU increase via optional platinum fast-tracks on event rewards without alienating non-paying players.
                  </p>
                </div>

                <div className="clay-card-sm p-5 border-t-4 border-t-royal-goldDark">
                  <div className="text-xs font-mono text-royal-slate uppercase font-bold">Player Engagement</div>
                  <div className="text-2xl font-black text-royal-goldDark font-heading mt-1">+30% DAU Boost</div>
                  <p className="text-xs text-royal-slate mt-2 leading-relaxed">
                    Extended session length via dynamic Pelican extraction drops and 15-piece milestone retention pacing.
                  </p>
                </div>

                <div className="clay-card-sm p-5 border-t-4 border-t-emerald-600">
                  <div className="text-xs font-mono text-royal-slate uppercase font-bold">Dev Efficiency</div>
                  <div className="text-2xl font-black text-emerald-700 font-heading mt-1">80% Cost Reduction</div>
                  <p className="text-xs text-royal-slate mt-2 leading-relaxed">
                    Ideation-to-validation event constructed in 1 single day vs traditional 2–3 week discovery sprint cycles.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Pelican Drop Event Simulator */}
            <div className="clay-card-light p-8 border border-white">
              <h3 className="text-lg font-bold text-royal-navy font-heading mb-2">
                Interactive Pelican Extraction Event Drop Simulator
              </h3>
              <p className="text-xs text-royal-slate mb-6">
                Simulate how injecting dynamic extraction beacon reinforcements converts late-game match fatigue into high squad adrenaline.
              </p>

              <div className="clay-inset-light p-6 rounded-2xl text-center mb-6">
                <div className="flex justify-between items-center text-xs font-mono text-royal-slate pb-3 mb-4 border-b border-slate-300">
                  <span>PLANET: MALEVELON CREEK</span>
                  <span className="text-emerald-700 font-bold">EXTRACTION ZONE: ACTIVE</span>
                </div>

                <div className="py-6">
                  {pelicanEventTriggered ? (
                    <div className="space-y-2 animate-bounce">
                      <Rocket className="w-12 h-12 text-royal-navy mx-auto" />
                      <div className="text-base font-black text-royal-navy font-heading">
                        PELICAN-1 TOUCHDOWN CONFIRMED
                      </div>
                      <div className="text-xs font-bold text-emerald-700 font-mono">
                        Telemetry: 0% match abandonment recorded • Squad Retention: +34%
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Zap className="w-10 h-10 text-royal-goldDark mx-auto" />
                      <div className="text-sm font-bold text-royal-navy">
                        Standard Extraction: 3:00 Remaining
                      </div>
                      <div className="text-xs text-royal-slate">
                        Risk: High churn potential under Bile Titan swarm without dynamic event drop.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={triggerPelicanEvent}
                  disabled={pelicanEventTriggered}
                  className="clay-btn clay-btn-navy px-8 py-3 text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  <Rocket className="w-4 h-4 mr-2 inline" />
                  <span>{pelicanEventTriggered ? 'Drop in Progress...' : 'Trigger Pelican Event Surge Drop'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 4. CASE STUDY 2: 2024 AAA INDUSTRY FAILURES */}
        {activeTab === 'FAILURES' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-rose-600 font-bold uppercase tracking-wider">
                Industry Post-Mortem Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-royal-navy mt-1 mb-2 font-heading">
                The 2024 AAA Crisis: Why $300M+ Budgets Collapsed
              </h2>
              <p className="text-xs sm:text-sm text-royal-slate max-w-3xl leading-relaxed mb-6">
                In 2024, the gaming industry suffered an average 24.9% public stock valuation decline. The old paradigm of "build faster" ignored player mental models and led to massive write-downs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CRISIS_FAILURES_2024.map((fail, i) => (
                  <div key={i} className="clay-card-sm p-6 border-t-4 border-t-rose-500 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-royal-slate">{fail.studio}</div>
                      <h3 className="text-lg font-bold text-royal-navy mt-0.5">{fail.name}</h3>
                      <div className="text-2xl font-black text-rose-600 font-heading my-2">
                        {fail.financialLoss}
                      </div>
                      <div className="text-xs font-bold text-rose-800 bg-rose-50 p-2 rounded-lg mb-3">
                        {fail.stockImpact} • {fail.retention}
                      </div>
                      <p className="text-xs text-royal-slate leading-relaxed border-t border-slate-200 pt-2">
                        <span className="font-bold text-royal-navy">Root Cause:</span> {fail.cause}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* The 4 Failure Loop Steps */}
              <div className="mt-8 pt-6 border-t border-[#DCE4ED]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-royal-navy font-bold mb-4">
                  The Four Stages of the AAA Failure Loop:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="clay-card-sm p-4">
                    <span className="font-bold text-rose-700">1. Spiraling Budgets:</span>
                    <p className="text-royal-slate mt-1">$200M–$300M budgets up 3x with zero pre-validation.</p>
                  </div>
                  <div className="clay-card-sm p-4">
                    <span className="font-bold text-rose-700">2. Player Rejection:</span>
                    <p className="text-royal-slate mt-1">92% quit before Day 30 due to mechanical friction.</p>
                  </div>
                  <div className="clay-card-sm p-4">
                    <span className="font-bold text-rose-700">3. Community Backlash:</span>
                    <p className="text-royal-slate mt-1">Review-bombing and online uproar on Reddit and Steam.</p>
                  </div>
                  <div className="clay-card-sm p-4">
                    <span className="font-bold text-rose-700">4. Trust Deficit Spiral:</span>
                    <p className="text-royal-slate mt-1">Emergency server shutdowns and studio write-downs.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 5. METHODOLOGY: RACK 5-PHASE PIPELINE */}
        {activeTab === 'RACK_PIPELINE' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-royal-goldDark font-bold uppercase tracking-wider">
                Proprietary Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-royal-navy mt-1 mb-2 font-heading">
                RACK: From Chaos to Cash
              </h2>
              <p className="text-xs sm:text-sm text-royal-slate max-w-3xl leading-relaxed mb-6">
                From reactive firefighting to predictive foresight. A complete cognitive pipeline turning multi-source player noise into high-margin gameplay decisions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {RACK_STEPS.map((step) => (
                  <div key={step.num} className="clay-card-sm p-5 flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-full clay-inset-light flex items-center justify-center text-xs font-bold font-mono text-royal-navy mb-3">
                        0{step.num}
                      </div>
                      <div className="text-xs font-mono text-royal-goldDark font-bold uppercase">{step.sub}</div>
                      <h3 className="text-base font-bold text-royal-navy mt-0.5 mb-3">{step.title}</h3>
                      <ul className="space-y-1.5 text-xs text-royal-slate">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-royal-goldDark font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 6. MARKET SIZING & COMMERCIAL FINANCIALS */}
        {activeTab === 'MARKET_FINANCIALS' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* TAM SAM SOM */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-royal-goldDark font-bold uppercase tracking-wider">
                Addressable Market Economics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-royal-navy mt-1 mb-6 font-heading">
                TAM • SAM • SOM Market Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="clay-card-sm p-6 border-t-4 border-t-royal-navy">
                  <div className="text-xs font-mono uppercase text-royal-slate font-bold">TAM • Global</div>
                  <div className="text-3xl font-black text-royal-navy font-heading mt-1">$3 Billion</div>
                  <div className="text-xs text-royal-goldDark font-bold">₹25,000 Cr / year</div>
                  <p className="text-xs text-royal-slate mt-3 leading-relaxed">
                    25,000+ studios globally requiring external PM strategy, simulation, and live-service retention engineering.
                  </p>
                </div>

                <div className="clay-card-sm p-6 border-t-4 border-t-royal-goldDark">
                  <div className="text-xs font-mono uppercase text-royal-slate font-bold">SAM • Serviceable</div>
                  <div className="text-3xl font-black text-royal-goldDark font-heading mt-1">$187 Million</div>
                  <div className="text-xs text-royal-navy font-bold">₹1,560 Cr / year</div>
                  <p className="text-xs text-royal-slate mt-3 leading-relaxed">
                    1,300–3,300 studios with budget, English fluency, and outsourcing readiness.
                  </p>
                </div>

                <div className="clay-card-sm p-6 border-t-4 border-t-emerald-600">
                  <div className="text-xs font-mono uppercase text-royal-slate font-bold">SOM • Obtainable</div>
                  <div className="text-3xl font-black text-emerald-700 font-heading mt-1">$94 Million</div>
                  <div className="text-xs text-emerald-800 font-bold">₹780 Cr / year</div>
                  <p className="text-xs text-royal-slate mt-3 leading-relaxed">
                    650+ studios realistically captured through lean operations and proven traction.
                  </p>
                </div>
              </div>

              {/* Studio ROI Calculator */}
              <div className="clay-inset-light p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-royal-goldDark" />
                  <h3 className="text-sm font-bold text-royal-navy font-heading">
                    Interactive Studio ROI & Waste Simulator
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-royal-navy mb-1">
                        <span>Active Live-Service Titles:</span>
                        <span>{studioCount} Titles</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={studioCount}
                        onChange={(e) => setStudioCount(Number(e.target.value))}
                        className="w-full accent-royal-navy cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-royal-navy mb-1">
                        <span>Average Spend per Title:</span>
                        <span>₹{budgetPerTitle} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.1"
                        value={budgetPerTitle}
                        onChange={(e) => setBudgetPerTitle(Number(e.target.value))}
                        className="w-full accent-royal-navy cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="clay-card-sm p-4">
                      <div className="text-xs font-mono text-royal-slate font-bold">Sprint Waste Saved</div>
                      <div className="text-2xl font-black text-royal-navy font-heading mt-1">₹{estimatedSavedWaste} Cr</div>
                    </div>
                    <div className="clay-card-sm p-4">
                      <div className="text-xs font-mono text-royal-slate font-bold">Revenue Uplift</div>
                      <div className="text-2xl font-black text-emerald-700 font-heading mt-1">+₹{projectedRevenueGain} Cr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Tiers */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-royal-goldDark font-bold uppercase tracking-wider">
                Partnership Tiers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-royal-navy mt-1 mb-6 font-heading">
                Studio Commercial Retainer Models
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PARTNERSHIP_TIERS.map((tier) => (
                  <div key={tier.id} className="clay-card-sm p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono font-bold text-royal-goldDark">{tier.subtitle}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-royal-champagne text-royal-navy">
                          {tier.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-royal-navy mb-1">{tier.title}</h3>
                      <div className="text-xs font-mono text-royal-slate mb-4">Timeline: {tier.timeline}</div>
                      <p className="text-xs text-royal-slate clay-inset-light p-3 rounded-xl mb-4 leading-relaxed">
                        {tier.bestFor}
                      </p>
                      <div className="space-y-1.5 text-xs text-royal-slate">
                        <div className="font-bold text-royal-navy">Key Deliverables:</div>
                        {tier.deliverables.map((d, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 pt-3 border-t border-slate-200 text-[11px] font-mono text-royal-navy font-bold">
                      {tier.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Roadmap Year 1 & Founders */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
                Unit Economics & Year 1 ARR
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-royal-navy mt-1 mb-6 font-heading">
                Financial Architecture: ₹22 Cr Target
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                <div className="clay-card-sm p-4">
                  <div className="text-2xl sm:text-3xl font-black text-royal-navy font-heading">₹22 Cr</div>
                  <div className="text-xs font-bold text-royal-slate mt-0.5">Total Revenue Target</div>
                </div>
                <div className="clay-card-sm p-4">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-heading">₹20.73 Cr</div>
                  <div className="text-xs font-bold text-royal-slate mt-0.5">EBITDA (94.2% Margin)</div>
                </div>
                <div className="clay-card-sm p-4">
                  <div className="text-2xl sm:text-3xl font-black text-royal-goldDark font-heading">₹2.2 Cr</div>
                  <div className="text-xs font-bold text-royal-slate mt-0.5">Per Employee Rev</div>
                </div>
                <div className="clay-card-sm p-4">
                  <div className="text-2xl sm:text-3xl font-black text-royal-navy font-heading">₹140–185 Cr</div>
                  <div className="text-xs font-bold text-royal-slate mt-0.5">Valuation Framework</div>
                </div>
              </div>

              {/* Founding Team Credits */}
              <div className="pt-6 border-t border-[#DCE4ED]">
                <div className="text-xs font-mono uppercase tracking-widest text-royal-navy font-bold mb-4">
                  The Founding Architects (IIT, IIM, BITS & IMT Winners)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {TEAM_MEMBERS.map((m, i) => (
                    <div key={i} className="clay-card-sm p-3.5 text-center">
                      <div className="text-sm font-bold text-royal-navy">{m.name}</div>
                      <div className="text-xs text-royal-goldDark font-medium mt-0.5">{m.role}</div>
                      <div className="text-[10px] text-royal-slate mt-1 font-mono">{m.org}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

