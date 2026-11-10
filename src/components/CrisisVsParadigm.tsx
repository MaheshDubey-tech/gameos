import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, CheckCircle2, Flame, DollarSign, Users, Skull, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { CRISIS_FAILURES_2024 } from '../data/mockData';

export const CrisisVsParadigm: React.FC = () => {
  const [activeParadigm, setActiveParadigm] = useState<'CRISIS' | 'NEW_PARADIGM'>('CRISIS');

  return (
    <section id="crisis" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
          <AlertTriangle className="w-4 h-4" />
          <span>The 2024–2025 Industry Reckoning</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          From Wrong Paradigms to a Better Future
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          A single workflow showing why $300M+ AAA budgets collapse — and how GameOS builds sustainable player-centric hits.
        </p>

        {/* Tactile Paradigm Switcher */}
        <div className="mt-8 inline-flex p-1.5 rounded-full clay-container-inset border border-white/10">
          <button
            onClick={() => setActiveParadigm('CRISIS')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeParadigm === 'CRISIS'
                ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-clay-rose'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>The AAA Crisis (Old Paradigm)</span>
          </button>
          <button
            onClick={() => setActiveParadigm('NEW_PARADIGM')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeParadigm === 'NEW_PARADIGM'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-clay-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>The GameOS Paradigm (Build RIGHT)</span>
          </button>
        </div>
      </div>

      {activeParadigm === 'CRISIS' ? (
        /* The Crisis Breakdown */
        <div className="space-y-8 animate-fadeIn">
          {/* Top Crisis Metrics Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clay-card p-6 border-l-4 border-l-rose-500">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Industry Valuation</span>
                <TrendingDown className="w-5 h-5 text-rose-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-heading mt-2">-24.9%</div>
              <div className="text-sm text-slate-300 mt-1">Average public gaming stock decline in 2024</div>
            </div>

            <div className="clay-card p-6 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Player Retention Collapse</span>
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Day 1</span>
                  <span className="text-amber-400">45%</span>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Day 7</span>
                  <span className="text-rose-400">18%</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Day 30</span>
                  <span className="text-rose-500">8% (92% Churn)</span>
                </div>
              </div>
            </div>

            <div className="clay-card p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Trend-Chasing Waste</span>
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-heading mt-2">$600M+</div>
              <div className="text-sm text-slate-300 mt-1">Vicious cycle of escalating budgets & zero trust</div>
            </div>
          </div>

          {/* Major Failures 2024 Cards */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Skull className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white font-heading">Major 2024 Live-Service Casualties</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CRISIS_FAILURES_2024.map((fail, i) => (
                <div 
                  key={i} 
                  className="clay-card p-6 relative overflow-hidden group hover:border-rose-500/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-extrabold text-white">{fail.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{fail.studio}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {fail.stockImpact}
                    </span>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-[#0B0F19] border border-white/5">
                    <div className="text-2xl font-black text-rose-400 font-heading">{fail.financialLoss}</div>
                    <div className="text-xs text-rose-200/80 mt-0.5">{fail.retention}</div>
                  </div>

                  <p className="mt-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    <span className="font-semibold text-slate-200">Root Cause:</span> {fail.cause}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The Failure Loop Mechanism */}
          <div className="clay-card p-6 sm:p-8 bg-gradient-to-br from-[#1C1528] to-[#120F1D] border-rose-500/30">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400" />
              <span>The AAA Failure Loop: Why $300M+ Budgets Evaporate</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#0D0B14] border border-rose-500/20">
                <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs mb-2">1</div>
                <div className="text-sm font-bold text-white">Spiraling Costs</div>
                <div className="text-xs text-slate-400 mt-1">$200–$300M AAA budgets (up 3x from 5 years ago)</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D0B14] border border-rose-500/20">
                <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs mb-2">2</div>
                <div className="text-sm font-bold text-white">Player Rejection</div>
                <div className="text-xs text-slate-400 mt-1">92% quit before Day 30; gameplay fails player mental models</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D0B14] border border-rose-500/20">
                <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs mb-2">3</div>
                <div className="text-sm font-bold text-white">Community Backlash</div>
                <div className="text-xs text-slate-400 mt-1">Review-bombing & brand dilution on Steam, Reddit, X</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D0B14] border border-rose-500/20">
                <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs mb-2">4</div>
                <div className="text-sm font-bold text-white">Trust Deficit Spiral</div>
                <div className="text-xs text-slate-400 mt-1">Studio emergency shutdowns and massive write-downs</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* The GameOS Paradigm Breakdown */
        <div className="space-y-8 animate-fadeIn">
          {/* Paradigm Contrast Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old Way */}
            <div className="clay-card p-6 bg-gradient-to-b from-[#1E1A26] to-[#12111A] border-rose-500/20">
              <div className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold mb-1">Old Paradigm</div>
              <h3 className="text-2xl font-bold text-white mb-4">"How do we build faster?"</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5 text-rose-300">
                  <span className="w-5 h-5 rounded-full bg-rose-950 flex items-center justify-center text-xs text-rose-400">✕</span>
                  Speed over accuracy: rushing doomed features
                </li>
                <li className="flex items-center gap-2.5 text-rose-300">
                  <span className="w-5 h-5 rounded-full bg-rose-950 flex items-center justify-center text-xs text-rose-400">✕</span>
                  Ignores player psychology and implicit promises
                </li>
                <li className="flex items-center gap-2.5 text-rose-300">
                  <span className="w-5 h-5 rounded-full bg-rose-950 flex items-center justify-center text-xs text-rose-400">✕</span>
                  Expensive multi-million rework post-launch
                </li>
                <li className="flex items-center gap-2.5 text-rose-300">
                  <span className="w-5 h-5 rounded-full bg-rose-950 flex items-center justify-center text-xs text-rose-400">✕</span>
                  Perpetuates the studio crunch & failure loop
                </li>
              </ul>
            </div>

            {/* New GameOS Way */}
            <div className="clay-card p-6 bg-gradient-to-b from-[#142A38] to-[#0E1E2C] border-cyan-400/30 shadow-clay-cyan">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-1">New Paradigm: GameOS</div>
              <h3 className="text-2xl font-bold text-white mb-4">"How do we build RIGHT?"</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-2.5 text-cyan-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  Pre-validate concepts with cognitive simulation
                </li>
                <li className="flex items-center gap-2.5 text-cyan-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  Align game mechanics with player mental models
                </li>
                <li className="flex items-center gap-2.5 text-cyan-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  Eliminate 80% waste & avoid wasted sprints
                </li>
                <li className="flex items-center gap-2.5 text-cyan-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  Build sustainable multi-year live-service loyalty
                </li>
              </ul>
            </div>
          </div>

          {/* The GameOS Feedback Loop */}
          <div className="clay-card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>The RACK Feedback Loop: Survivors predict player response, not just react</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-cyan-500/20">
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs mb-2">1</div>
                <div className="text-sm font-bold text-white">Real Player Signals</div>
                <div className="text-xs text-slate-400 mt-1">Community data, Discord chatter, Reddit sentiment, game telemetry</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1424] border border-cyan-500/20">
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs mb-2">2</div>
                <div className="text-sm font-bold text-white">Predict Behavior</div>
                <div className="text-xs text-slate-400 mt-1">LLM cognitive agents simulate player response before code is committed</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1424] border border-cyan-500/20">
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs mb-2">3</div>
                <div className="text-sm font-bold text-white">Iterate & Improve</div>
                <div className="text-xs text-slate-400 mt-1">Tune weapon curves and battle pass milestones in hours, not weeks</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1424] border border-cyan-500/20">
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs mb-2">4</div>
                <div className="text-sm font-bold text-white">De-risk Investment</div>
                <div className="text-xs text-slate-400 mt-1">Guaranteed player alignment, high retention, healthy studio economics</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

