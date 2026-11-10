import React, { useState } from 'react';
import { Globe2, Target, Trophy, DollarSign, Calculator, ArrowUpRight } from 'lucide-react';

export const MarketOpportunity: React.FC = () => {
  const [studioCount, setStudioCount] = useState<number>(4);
  const [budgetPerTitle, setBudgetPerTitle] = useState<number>(1.2); // Cr INR

  const estimatedSavedWaste = Math.round(studioCount * budgetPerTitle * 0.4 * 10) / 10;
  const projectedRevenueGain = Math.round(studioCount * budgetPerTitle * 0.22 * 10) / 10;

  return (
    <section id="market" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Globe2 className="w-4 h-4" />
          <span>Addressable Market Economics</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Market Opportunity: TAM • SAM • SOM
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Massive addressable market with high willing-to-pay dynamics across 25,000+ indie and mid-tier live-service studios worldwide.
        </p>
      </div>

      {/* TAM SAM SOM Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* TAM */}
        <div className="clay-card p-6 sm:p-8 border-t-4 border-t-blue-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-blue-400 font-bold">TAM • Total Addressable</span>
              <Globe2 className="w-5 h-5 text-blue-400" />
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-heading">$3 Billion</div>
            <div className="text-sm font-bold text-blue-300 mt-1">₹25,000 Cr / year</div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#0C121F] border border-white/5">
                <span className="font-bold text-white">25,000+ Studios Globally</span>
                <p className="text-slate-400 mt-1">Need external PM strategy, cognitive simulation, and live-service retention engineering.</p>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Formula: 20,000 studios × $150k avg annual PM tool/retainer spend
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-blue-400">
            Global Gaming Infrastructure
          </div>
        </div>

        {/* SAM */}
        <div className="clay-card p-6 sm:p-8 border-t-4 border-t-purple-500 flex flex-col justify-between shadow-clay-purple">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-bold">SAM • Serviceable Available</span>
              <Target className="w-5 h-5 text-purple-400" />
            </div>

            <div className="text-4xl sm:text-5xl font-black text-purple-400 font-heading">$187 Million</div>
            <div className="text-sm font-bold text-purple-300 mt-1">₹1,560 Cr / year</div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#140F24] border border-white/5">
                <span className="font-bold text-white">1,300–3,300 Studios</span>
                <p className="text-slate-400 mt-1">With active live services, dedicated budgets, English fluency, and outsourcing readiness.</p>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Formula: 1,300 studios × ₹1.2 Cr avg spend
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-purple-400">
            High Willingness-to-Pay Cohort
          </div>
        </div>

        {/* SOM */}
        <div className="clay-card p-6 sm:p-8 border-t-4 border-t-emerald-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">SOM • Serviceable Obtainable</span>
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-heading">$94 Million</div>
            <div className="text-sm font-bold text-emerald-300 mt-1">₹780 Cr / year</div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#0D1815] border border-white/5">
                <span className="font-bold text-white">650+ Active Studios (50% SAM)</span>
                <p className="text-slate-400 mt-1">Realistic 3-year market capture target enabled by lean AI operations and proven studio traction.</p>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Formula: 650 studios × ₹1.2 Cr = ₹780 Cr
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-emerald-400">
            Target Year 3 Scale
          </div>
        </div>
      </div>

      {/* Interactive Studio ROI Calculator (Claymorphic) */}
      <div className="clay-card p-6 sm:p-10 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-inner">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Interactive Studio ROI & Waste Simulator</h3>
              <p className="text-xs text-slate-400">Estimate how much budget and revenue GameOS recovers for your studio.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
            Live Model
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          {/* Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-slate-300">Active Live-Service Titles / Pilots:</span>
                <span className="text-cyan-400 font-bold font-mono text-sm">{studioCount} Titles</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={studioCount}
                onChange={(e) => setStudioCount(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-[#0B0F19] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>1 Title</span>
                <span>10 Titles</span>
                <span>20 Titles</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-slate-300">Avg Annual Live-Ops Spend per Title:</span>
                <span className="text-purple-400 font-bold font-mono text-sm">₹{budgetPerTitle} Cr ($150k–$400k)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={budgetPerTitle}
                onChange={(e) => setBudgetPerTitle(Number(e.target.value))}
                className="w-full accent-purple-400 bg-[#0B0F19] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>₹0.5 Cr</span>
                <span>₹2.5 Cr</span>
                <span>₹5.0 Cr</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0F1E29] border border-cyan-500/30 text-center shadow-inner">
              <div className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">Wasted Sprint Spend Saved</div>
              <div className="text-3xl font-black text-white font-heading mt-2">₹{estimatedSavedWaste} Cr</div>
              <div className="text-[11px] text-cyan-200 mt-1">Via pre-validated feature pipelines</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#1C132E] border border-purple-500/30 text-center shadow-inner">
              <div className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold">Estimated Revenue Uplift</div>
              <div className="text-3xl font-black text-white font-heading mt-2">+₹{projectedRevenueGain} Cr</div>
              <div className="text-[11px] text-purple-200 mt-1">From +15–22% ARPPU optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

