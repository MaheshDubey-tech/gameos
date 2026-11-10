import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Clock, Target, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PARTNERSHIP_TIERS } from '../data/mockData';

interface Props {
  onSelectTier: (tierId: string) => void;
}

export const PartnershipModels: React.FC<Props> = ({ onSelectTier }) => {
  const [selectedTier, setSelectedTier] = useState<string>('domain');

  return (
    <section id="partnerships" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 hero-glow-purple pointer-events-none -z-10 blur-3xl opacity-30" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Flexible Engagement Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Partnership Models
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Amplify your vision with player reality. Cognitive tools ensuring your game resonates perfectly with players, maximizing commercial and cultural impact.
        </p>
      </div>

      {/* 3 Claymorphic Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PARTNERSHIP_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`clay-card p-6 sm:p-8 flex flex-col justify-between relative cursor-pointer transition-all duration-300 ${
                tier.popular
                  ? 'border-purple-400/50 shadow-clay-purple md:-translate-y-2'
                  : 'border-white/10 hover:border-white/30'
              } ${isSelected ? 'ring-2 ring-cyan-400' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[11px] font-extrabold uppercase tracking-widest shadow-lg">
                  Most Popular for Live Ops
                </div>
              )}

              <div>
                {/* Tier Tag & Price Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {tier.subtitle}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0D1424] border border-white/10 text-cyan-300 font-mono text-xs font-bold">
                    {tier.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{tier.title}</h3>

                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-4 pb-4 border-b border-white/10">
                  <Clock className="w-4 h-4" />
                  <span>Timeline: {tier.timeline}</span>
                </div>

                <div className="mb-6">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1.5 font-semibold">Best For:</div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0F19] p-3 rounded-2xl border border-white/5">
                    {tier.bestFor}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">Deliverables:</div>
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTier(tier.id);
                  }}
                  className={`w-full py-3.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.popular
                      ? 'clay-btn clay-purple-btn'
                      : 'clay-btn bg-[#18233A] text-slate-200 hover:text-white border border-white/10'
                  }`}
                >
                  <span>Select {tier.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-center text-[10px] text-slate-400 mt-2 font-mono">
                  {tier.highlight}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

