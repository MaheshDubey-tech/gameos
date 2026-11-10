import React, { useState } from 'react';
import { 
  Gamepad2, Cpu, Radio, Sparkles, AlertCircle, CheckCircle2, 
  Download, Plus, RefreshCw, Filter, ArrowUpRight, ShieldCheck, 
  Zap, Share2, Layers, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GAME_PRESETS } from '../data/mockData';
import { GamePreset, PlayerSignal, BacklogRecommendation } from '../types';

interface Props {
  onBackToLanding: () => void;
}

export const PrototypeWorkbench: React.FC<Props> = ({ onBackToLanding }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('helldivers2');
  const [currentPreset, setCurrentPreset] = useState<GamePreset>(GAME_PRESETS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(true);
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  
  // Custom signal input state
  const [newSignalText, setNewSignalText] = useState<string>('');
  const [newSignalSource, setNewSignalSource] = useState<'reddit' | 'discord' | 'steam' | 'gameplay'>('reddit');
  const [newSignalSentiment, setNewSignalSentiment] = useState<'positive' | 'neutral' | 'negative' | 'critical'>('critical');

  const handleSelectPreset = (id: string) => {
    const found = GAME_PRESETS.find(p => p.id === id);
    if (found) {
      setSelectedPresetId(id);
      setCurrentPreset(found);
      setSimulationComplete(true);
    }
  };

  const handleAddSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSignalText.trim()) return;

    const newSignal: PlayerSignal = {
      id: `sig-${Date.now()}`,
      source: newSignalSource,
      author: 'LiveTester_' + Math.floor(Math.random() * 900 + 100),
      sentiment: newSignalSentiment,
      text: newSignalText.trim(),
      upvotes: 1,
      timestamp: 'Just now'
    };

    setCurrentPreset(prev => ({
      ...prev,
      signalsCount: prev.signalsCount + 1,
      sampleSignals: [newSignal, ...prev.sampleSignals]
    }));

    setNewSignalText('');
    runSimulation(true);
  };

  const runSimulation = (fast: boolean = false) => {
    setIsSimulating(true);
    setSimulationComplete(false);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#8B5CF6', '#10B981']
      });
    }, fast ? 700 : 1800);
  };

  const filteredSignals = currentPreset.sampleSignals.filter(sig => {
    if (filterSentiment === 'all') return true;
    return sig.sentiment === filterSentiment;
  });

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 pb-24">
      {/* Top Prototype Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0C121F]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLanding}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-800/60"
          >
            ← Back to Overview
          </button>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
            <span className="text-sm font-extrabold text-white font-heading hidden sm:inline">
              GameOS Workbench
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#1B2640] text-cyan-300 font-mono">
              RACK Simulator v2.4
            </span>
          </div>
        </div>

        {/* Studio Presets Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden md:inline">Studio Case:</span>
          <div className="flex gap-1.5 bg-[#090D15] p-1 rounded-xl border border-white/10">
            {GAME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedPresetId === preset.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Workbench Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Preset Header Banner */}
        <div className="clay-card p-6 sm:p-8 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-xs font-mono font-bold">
                  {currentPreset.genre}
                </span>
                <span className="text-xs font-mono text-slate-400">• {currentPreset.studio}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {currentPreset.status}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentPreset.name}
              </h1>
            </div>

            {/* Re-simulate Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => runSimulation(false)}
                disabled={isSimulating}
                className="clay-btn clay-cyan-btn px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Computing Cognitive Weights...' : 'Run RACK Cognitive Sim'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Ingested Player Signals</div>
              <div className="text-2xl font-bold text-white font-heading mt-0.5">
                {currentPreset.signalsCount.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Baseline Player Sentiment</div>
              <div className={`text-2xl font-bold font-heading mt-0.5 ${
                currentPreset.initialSentiment >= 60 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {currentPreset.initialSentiment}%
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Simulated Virtual Agents</div>
              <div className="text-2xl font-bold text-cyan-400 font-heading mt-0.5">
                10,000 Agents
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Predicted Backlog Items</div>
              <div className="text-2xl font-bold text-purple-400 font-heading mt-0.5">
                {currentPreset.recommendations.length} Actionable Items
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Signals Feed (Left) vs Simulation & Backlog (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Signal Chaos Ingestion (Page 4 Step 1) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="clay-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Signal Input Stream</h2>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  Live Feed
                </span>
              </div>

              {/* Add New Custom Signal Form */}
              <form onSubmit={handleAddSignal} className="mb-5 p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
                <div className="text-xs font-semibold text-slate-300 mb-2">Inject Custom Gamer Signal:</div>
                <textarea
                  value={newSignalText}
                  onChange={(e) => setNewSignalText(e.target.value)}
                  placeholder="e.g. 'The latest patch weapon damage falloff makes solo queuing impossible...'"
                  rows={2}
                  className="w-full text-xs bg-[#121A2C] border border-white/10 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />

                <div className="flex items-center justify-between mt-2.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <select
                      value={newSignalSource}
                      onChange={(e: any) => setNewSignalSource(e.target.value)}
                      className="bg-[#121A2C] border border-white/10 text-slate-300 text-[11px] rounded-lg px-2 py-1"
                    >
                      <option value="reddit">Reddit (r/gaming)</option>
                      <option value="discord">Discord Official</option>
                      <option value="steam">Steam Reviews</option>
                      <option value="gameplay">Telemetry Cluster</option>
                    </select>

                    <select
                      value={newSignalSentiment}
                      onChange={(e: any) => setNewSignalSentiment(e.target.value)}
                      className="bg-[#121A2C] border border-white/10 text-slate-300 text-[11px] rounded-lg px-2 py-1"
                    >
                      <option value="critical">Critical</option>
                      <option value="negative">Negative</option>
                      <option value="neutral">Neutral</option>
                      <option value="positive">Positive</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="clay-btn bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Inject</span>
                  </button>
                </div>
              </form>

              {/* Sentiment filter pills */}
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 text-[11px]">
                <span className="text-slate-400 font-mono">Filter:</span>
                {['all', 'critical', 'negative', 'positive'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterSentiment(cat)}
                    className={`px-2.5 py-0.5 rounded-full capitalize transition-all cursor-pointer ${
                      filterSentiment === cat
                        ? 'bg-slate-200 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white bg-[#0B0F19]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Signal List */}
              <div className="space-y-3 mt-4 max-h-[480px] overflow-y-auto pr-1">
                {filteredSignals.map((signal) => (
                  <div
                    key={signal.id}
                    className="p-3.5 rounded-2xl bg-[#0D1424] border border-white/5 hover:border-white/20 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          signal.source === 'reddit' ? 'bg-orange-500/20 text-orange-400' :
                          signal.source === 'discord' ? 'bg-indigo-500/20 text-indigo-400' :
                          signal.source === 'steam' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {signal.source}
                        </span>
                        <span className="font-semibold text-slate-300">{signal.author}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        signal.sentiment === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        signal.sentiment === 'negative' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {signal.sentiment}
                      </span>
                    </div>

                    <p className="text-slate-200 leading-relaxed">{signal.text}</p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Upvotes: {signal.upvotes.toLocaleString()}</span>
                      <span>{signal.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Cognitive Archetype Simulation & Backlog Generator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Cognitive Simulation Engine Visualizer */}
            <div className="clay-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white">Player Archetype Cognitive Simulation</h2>
                </div>
                <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
                  10,000 Agent Population
                </span>
              </div>

              {isSimulating ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />
                  <div className="text-sm font-bold text-cyan-300">Simulating Player Psychology & Churn Probabilities...</div>
                  <div className="text-xs text-slate-400 max-w-sm mx-auto">
                    Evaluating mechanical friction against implicit gameplay contracts across 4 primary gamer archetypes.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentPreset.archetypes.map((arch) => (
                    <div 
                      key={arch.id} 
                      className="p-4 rounded-2xl bg-[#0D1526] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white flex items-center gap-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: arch.avatarColor }} 
                            />
                            {arch.name}
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-bold">{arch.share}% Cohort</span>
                        </div>

                        <div className="space-y-1.5 my-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Satisfaction Score</span>
                            <span className="font-bold text-cyan-400">{arch.sentimentScore}/100</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-cyan-400 rounded-full" 
                              style={{ width: `${arch.sentimentScore}%` }} 
                            />
                          </div>

                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-slate-400">Churn Risk Probability</span>
                            <span className={`font-bold ${arch.churnRisk > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {arch.churnRisk}%
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${arch.churnRisk > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${arch.churnRisk}%` }} 
                            />
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-[#080D17] p-2.5 rounded-xl border border-white/5">
                          <span className="font-semibold text-slate-200">Predicted Behavior:</span> {arch.predictedReaction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Actionable Backlog & Solution Tickets (Page 4 & 5) */}
            <div className="clay-card p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-lg font-bold text-white">Generated PM Backlog & Strategy Specs</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    "Actually generates specific backlog items and ways to solve them." — Heather Chandler
                  </p>
                </div>

                <button
                  onClick={() => {
                    alert("Exported 3 validated RACK Sprint Tickets to studio engineering backlog (Linear/Jira formatted)!");
                  }}
                  className="clay-btn bg-[#18233A] hover:bg-[#202E4C] text-slate-200 px-3.5 py-1.5 text-xs font-bold border border-white/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export to Jira / Linear</span>
                </button>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {currentPreset.recommendations.map((rec, idx) => (
                  <div
                    key={rec.id}
                    className="p-5 rounded-2xl bg-[#0C121F] border border-white/10 hover:border-cyan-500/40 transition-all shadow-inner"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                          rec.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {rec.priority}
                        </span>
                        <span className="text-xs font-mono text-cyan-300 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded">
                          {rec.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">TICKET-RACK-0{idx + 1}</span>
                      </div>

                      <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        {rec.impactMetric}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{rec.title}</h3>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-[#141C2E] border border-white/5">
                        <div className="font-bold text-cyan-300 mb-0.5">PM Solution & System Spec:</div>
                        <p className="text-slate-300 leading-relaxed">{rec.solution}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-[#111927] border border-white/5">
                          <span className="font-semibold text-rose-300">Catastrophic Risk Avoided:</span>
                          <div className="text-slate-300 mt-0.5">{rec.riskAvoided}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#111927] border border-white/5">
                          <span className="font-semibold text-emerald-300">Sprint Dev Time Saved:</span>
                          <div className="text-slate-300 mt-0.5">{rec.devTimeSaved}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

