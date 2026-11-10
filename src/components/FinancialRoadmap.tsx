import React, { useState } from 'react';
import { TrendingUp, Users, Award, Shield, BarChart3, ChevronRight, DollarSign } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

export const FinancialRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FINANCIAL' | 'GTM' | 'ADVANTAGE'>('FINANCIAL');

  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 hero-glow-cyan pointer-events-none -z-10 blur-3xl opacity-20" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
          <TrendingUp className="w-4 h-4" />
          <span>Execution & Unit Economics</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Roadmap, Financials & Unfair Advantage
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          From lean pilot execution to ₹22 Cr Year-1 ARR at 94.2% EBITDA margin with an elite founding team.
        </p>

        {/* Tab pills */}
        <div className="mt-8 inline-flex p-1.5 rounded-full clay-container-inset border border-white/10">
          <button
            onClick={() => setActiveTab('FINANCIAL')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'FINANCIAL'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-clay-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Year 1 Financial Roadmap
          </button>
          <button
            onClick={() => setActiveTab('GTM')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'GTM'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-clay-purple'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            6-Month GTM Execution
          </button>
          <button
            onClick={() => setActiveTab('ADVANTAGE')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'ADVANTAGE'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-clay-purple'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Founding Architects & Moat
          </button>
        </div>
      </div>

      {/* Tab 1: Financial Projections & Unit Economics */}
      {activeTab === 'FINANCIAL' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top 4 KPI Cards from Page 13 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="clay-card p-5 text-center border-t-4 border-t-emerald-400">
              <div className="text-2xl sm:text-4xl font-black text-emerald-400 font-heading">₹22 Cr</div>
              <div className="text-xs font-bold text-white mt-1">Total Target Revenue</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Year 1 Target</div>
            </div>
            <div className="clay-card p-5 text-center border-t-4 border-t-cyan-400">
              <div className="text-2xl sm:text-4xl font-black text-cyan-400 font-heading">₹20.73 Cr</div>
              <div className="text-xs font-bold text-white mt-1">EBITDA (94.2% Margin)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Ultra-Lean AI Cost Basis</div>
            </div>
            <div className="clay-card p-5 text-center border-t-4 border-t-purple-400">
              <div className="text-2xl sm:text-4xl font-black text-purple-400 font-heading">₹2.2 Cr</div>
              <div className="text-xs font-bold text-white mt-1">Per Employee Revenue</div>
              <div className="text-[10px] text-slate-400 mt-0.5">High Talent Density</div>
            </div>
            <div className="clay-card p-5 text-center border-t-4 border-t-amber-400">
              <div className="text-2xl sm:text-4xl font-black text-amber-400 font-heading">₹10.5L</div>
              <div className="text-xs font-bold text-white mt-1">Cost Per Client</div>
              <div className="text-[10px] text-slate-400 mt-0.5">High Gross Margins</div>
            </div>
          </div>

          {/* Revenue Architecture vs Cost Breakdown (Page 13) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Architecture */}
            <div className="clay-card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span>Revenue Architecture (12 Clients)</span>
                <span className="text-xs font-mono text-emerald-400">₹22 Cr ARR</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0D1624] border border-cyan-500/20">
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span>Medium Studios (4 clients × ₹4 Cr)</span>
                    <span className="text-cyan-400 font-mono">₹16 Cr (73%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[73%]" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Embedded strategic PM foresight retainers for active live-service titles.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D1624] border border-purple-500/20">
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span>Indie Studios (8 clients × ₹0.75 Cr)</span>
                    <span className="text-purple-400 font-mono">₹6 Cr (27%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-400 h-full w-[27%]" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Scoped simulation and feature audit sprints before launch.</p>
                </div>
              </div>
            </div>

            {/* Lean Cost Structure */}
            <div className="clay-card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span>Lean OPEX Structure</span>
                <span className="text-xs font-mono text-slate-400">Total OPEX: ₹1.27 Cr</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0B0F19]">
                  <span className="text-slate-300">Base Cloud & AI Tokens Infrastructure</span>
                  <span className="font-mono font-bold text-white">₹29L (23%)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0B0F19]">
                  <span className="text-slate-300">Product Team (3 PMs @ ₹14L)</span>
                  <span className="font-mono font-bold text-white">₹42L (33%)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0B0F19]">
                  <span className="text-slate-300">Data & Telemetry Analysis (3 Analysts @ ₹6L)</span>
                  <span className="font-mono font-bold text-white">₹18L (14%)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0B0F19]">
                  <span className="text-slate-300">Technical Team (4 Devs @ ₹7L avg)</span>
                  <span className="font-mono font-bold text-white">₹28L (22%)</span>
                </div>
              </div>

              {/* Valuation Framework Box */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#18233A] to-[#121B30] border border-cyan-400/30 text-center">
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-300">Estimated Company Valuation</div>
                <div className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">₹140–185 Cr ($17M–$22M)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Blended Approach: 40% Revenue Multiple (3.5x) + 60% EBITDA Multiple (9x)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 6-Month GTM Execution (Page 11) */}
      {activeTab === 'GTM' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clay-card p-6 border-t-4 border-t-cyan-400">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-1">Month 1–2</div>
              <h4 className="text-lg font-bold text-white">MVP Finalization & Outreach</h4>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                <p>• Finalize core MVP cognitive stack</p>
                <p>• Integrate manual-mode LLM agents with persona clustering</p>
                <p>• Start high-intent outreach to ~20 live-service studios</p>
                <p>• Build standardized onboarding collateral</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-cyan-300">
                Goal: Validated MVP completion
              </div>
            </div>

            <div className="clay-card p-6 border-t-4 border-t-purple-400">
              <div className="text-xs font-mono text-purple-400 font-bold mb-1">Month 3–4</div>
              <h4 className="text-lg font-bold text-white">Pilot Projects & Iteration</h4>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                <p>• Launch first 2 paid pilot programs</p>
                <p>• Deliver high-context, KPI-prioritized roadmaps</p>
                <p>• Build complete telemetry ingestion pipeline</p>
                <p>• Gather feedback and iterate accuracy</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-purple-300">
                Goal: 2 Paying Pilots (₹1.5 Cr revenue)
              </div>
            </div>

            <div className="clay-card p-6 border-t-4 border-t-emerald-400">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Month 5–6</div>
              <h4 className="text-lg font-bold text-white">GTM Scale & SaaS Shift</h4>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                <p>• Launch content-led GTM funnel & case studies</p>
                <p>• Publish demo simulations (Helldivers, Concord)</p>
                <p>• Transition from service-only to modular SaaS</p>
                <p>• Scale client base to 3–5 recurring contracts</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-300">
                Goal: ₹11 Cr Annualized Run-Rate
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Founding Architects & Moat (Page 10) */}
      {activeTab === 'ADVANTAGE' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Founding Team Cards */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">THE ARCHITECTS</span>
              <h3 className="text-2xl font-bold text-white">Exceptional Gamers • Systems Architects • 10,000+ Hours</h3>
              <p className="text-xs text-slate-400 mt-1">National-level hackathon & ideathon winners across top Indian institutions (IIT, IIM, BITS, IMT)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="clay-card p-5 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 mx-auto mb-3 shadow-md">
                    <div className="w-full h-full rounded-[14px] bg-[#141C2E] flex items-center justify-center font-bold text-white text-base">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white">{member.name}</h4>
                  <div className="text-xs text-cyan-300 font-medium mt-0.5">{member.role}</div>
                  <div className="text-[10px] text-slate-400 mt-2 font-mono">{member.org}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Triad of Unfair Advantage */}
          <div className="clay-card p-6 sm:p-8 bg-gradient-to-r from-[#141D30] to-[#16172E] border-white/10">
            <h3 className="text-lg font-bold text-white text-center mb-6">
              Founder-Product-Market Fit Formula: <span className="text-cyan-400">Architects + Product + Market Fit = Success</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-[#0C121F] border border-white/5">
                <div className="text-sm font-bold text-cyan-300 mb-1">1. The Architects</div>
                <div className="text-xs text-slate-300">Exceptional gaming intuition paired with rigorous systems engineering. 10,000+ hours in competitive & live-service titles.</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0C121F] border border-white/5">
                <div className="text-sm font-bold text-purple-300 mb-1">2. The Product Moat</div>
                <div className="text-xs text-slate-300">RACK Cognitive Simulation vs rudimentary dashboard analytics. Proprietary IP that cannot be easily reverse-engineered.</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0C121F] border border-white/5">
                <div className="text-sm font-bold text-emerald-300 mb-1">3. Perfect Market Timing</div>
                <div className="text-xs text-slate-300">The 2024–2025 AAA crisis ($300M failures) creates desperate industry demand for predictive pre-validation tools.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

