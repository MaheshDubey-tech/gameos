import React, { useState } from 'react';
import { 
  ArrowLeft, Terminal, Cpu, AlertTriangle, Layers, 
  TrendingUp, ShieldCheck, DollarSign, Download, Plus, 
  RefreshCw, CheckCircle2, ChevronRight, Zap, Radio, Globe, Award,
  PlusCircle, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GAME_PRESETS, CRISIS_FAILURES_2024, RACK_STEPS, PARTNERSHIP_TIERS, TEAM_MEMBERS } from '../data/mockData';
import { GamePreset, PlayerSignal, BacklogRecommendation } from '../types';
import { NewGameSetupPage } from './NewGameSetupPage';
import { soundEngine } from './AudioEngine';

interface Props {
  onBackToIntro: () => void;
}

export const PlatformHub: React.FC<Props> = ({ onBackToIntro }) => {
  const [activeTab, setActiveTab] = useState<'NEW_GAME' | 'WORKBENCH' | 'CRISIS_MARKET' | 'RACK_ENGINE' | 'COMMERCIAL'>('WORKBENCH');
  
  // Studio Games state (includes default cases + user-created games)
  const [gamesList, setGamesList] = useState<GamePreset[]>(GAME_PRESETS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('helldivers2');
  const [currentPreset, setCurrentPreset] = useState<GamePreset>(GAME_PRESETS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  // Custom signal ingestion form
  const [newSignalText, setNewSignalText] = useState<string>('');
  const [newSignalSource, setNewSignalSource] = useState<'reddit' | 'discord' | 'steam' | 'gameplay'>('reddit');
  const [newSignalSentiment, setNewSignalSentiment] = useState<'positive' | 'neutral' | 'negative' | 'critical'>('critical');

  const handleSelectPreset = (id: string) => {
    soundEngine.playClick(480);
    const found = gamesList.find(p => p.id === id);
    if (found) {
      setSelectedPresetId(id);
      setCurrentPreset(found);
      setActiveTab('WORKBENCH');
    }
  };

  const handleGameCreated = (newGame: GamePreset) => {
    setGamesList(prev => [newGame, ...prev]);
    setSelectedPresetId(newGame.id);
    setCurrentPreset(newGame);
    setActiveTab('WORKBENCH');
  };

  const handleAddSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSignalText.trim()) return;

    const newSignal: PlayerSignal = {
      id: `sig-${Date.now()}`,
      source: newSignalSource,
      author: 'LiveTester_' + Math.floor(Math.random() * 800 + 100),
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
    soundEngine.playClick(550);
    setTimeout(() => {
      setIsSimulating(false);
      soundEngine.playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F1D38', '#C5A880', '#10B981']
      });
    }, fast ? 600 : 1400);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0F1D38] pb-24 selection:bg-[#C5A880] selection:text-[#0F1D38]">
      
      {/* 1. TOP PLATFORM HEADER */}
      <header className="sticky top-0 z-40 bg-[#EEF2F6]/90 backdrop-blur-md border-b border-[#D6E0EC] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToIntro}
              className="clay-btn clay-btn-white px-3.5 py-1.5 text-xs font-bold text-royal-navy flex items-center gap-1.5 cursor-pointer border border-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Intro</span>
            </button>

            <div className="h-4 w-px bg-slate-300" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-black text-royal-navy font-heading hidden sm:inline">
                GameOS Platform
              </span>
              <span className="text-[10px] font-mono font-bold bg-royal-champagne text-royal-goldDark px-2 py-0.5 rounded-full border border-royal-gold/30">
                v2.4 Production
              </span>
            </div>
          </div>

          {/* Quick Studio Case / Custom Game Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick(600);
                setActiveTab('NEW_GAME');
              }}
              className="clay-btn clay-btn-navy px-3.5 py-1 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Add New Game Title for your Studio"
            >
              <PlusCircle className="w-3.5 h-3.5 text-royal-goldLight" />
              <span>New Game System</span>
            </button>

            <div className="flex gap-1 clay-pill-inset p-1 border border-white">
              {gamesList.slice(0, 3).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    selectedPresetId === preset.id && activeTab !== 'NEW_GAME'
                      ? 'clay-btn-navy text-white shadow-sm'
                      : 'text-royal-slate hover:text-royal-navy'
                  }`}
                >
                  {preset.name.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* 2. MAIN STRUCTURAL TAB NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="clay-card-light p-2 flex flex-wrap gap-2 border border-white/80 mb-8">
          
          <button
            onClick={() => {
              soundEngine.playClick(500);
              setActiveTab('NEW_GAME');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-[20px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'NEW_GAME'
                ? 'clay-btn-navy text-white shadow-md'
                : 'text-royal-slate hover:text-royal-navy bg-royal-champagne/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-royal-goldDark" />
            <span>0. New Game System</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(500);
              setActiveTab('WORKBENCH');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-[20px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'WORKBENCH'
                ? 'clay-btn-navy text-white shadow-md'
                : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Cpu className="w-4 h-4 text-royal-goldLight" />
            <span>1. Active Simulation Workbench</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(500);
              setActiveTab('CRISIS_MARKET');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-[20px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'CRISIS_MARKET'
                ? 'clay-btn-navy text-white shadow-md'
                : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-royal-goldLight" />
            <span>2. Industry Crisis & Sizing</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(500);
              setActiveTab('RACK_ENGINE');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-[20px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'RACK_ENGINE'
                ? 'clay-btn-navy text-white shadow-md'
                : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Layers className="w-4 h-4 text-royal-goldLight" />
            <span>3. RACK 5-Step Methodology</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(500);
              setActiveTab('COMMERCIAL');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-[20px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'COMMERCIAL'
                ? 'clay-btn-navy text-white shadow-md'
                : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-royal-goldLight" />
            <span>4. Commercial Tiers & Financials</span>
          </button>

        </div>

        {/* 3. TAB 0: INITIALIZE NEW GAME SYSTEM (FOR NEW CUSTOMERS) */}
        {activeTab === 'NEW_GAME' && (
          <div className="animate-fadeIn">
            <NewGameSetupPage 
              onGameCreated={handleGameCreated} 
              onCancel={() => setActiveTab('WORKBENCH')} 
            />
          </div>
        )}

        {/* 4. TAB 1: INTERACTIVE SIMULATION WORKBENCH */}
        {activeTab === 'WORKBENCH' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Active Studio Case Hero */}
            <div className="clay-card-light p-6 sm:p-8 border border-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-royal-goldDark bg-royal-champagne px-2.5 py-0.5 rounded-full border border-royal-gold/30">
                      {currentPreset.genre}
                    </span>
                    <span className="text-xs font-mono text-royal-slate">• {currentPreset.studio}</span>
                    {currentPreset.isCustom && (
                      <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Custom Studio System
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-royal-navy font-heading">
                    {currentPreset.name}
                  </h1>
                </div>

                <button
                  onClick={() => runSimulation(false)}
                  disabled={isSimulating}
                  className="clay-btn clay-btn-navy px-6 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-clay-btn-navy disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Running Simulation...' : 'Re-Run Cognitive Simulation'}</span>
                </button>
              </div>

              {/* Top Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#DCE4ED] text-center">
                <div className="clay-card-sm p-3">
                  <div className="text-xs font-mono text-royal-slate uppercase">Signals Ingested</div>
                  <div className="text-2xl font-black text-royal-navy font-heading mt-0.5">
                    {currentPreset.signalsCount.toLocaleString()}
                  </div>
                </div>
                <div className="clay-card-sm p-3">
                  <div className="text-xs font-mono text-royal-slate uppercase">Baseline Sentiment</div>
                  <div className={`text-2xl font-black font-heading mt-0.5 ${
                    currentPreset.initialSentiment >= 60 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {currentPreset.initialSentiment}%
                  </div>
                </div>
                <div className="clay-card-sm p-3">
                  <div className="text-xs font-mono text-royal-slate uppercase">Virtual Agents</div>
                  <div className="text-2xl font-black text-royal-goldDark font-heading mt-0.5">
                    10,000 Agents
                  </div>
                </div>
                <div className="clay-card-sm p-3">
                  <div className="text-xs font-mono text-royal-slate uppercase">Actionable Backlog</div>
                  <div className="text-2xl font-black text-royal-navy font-heading mt-0.5">
                    {currentPreset.recommendations.length} Tickets Generated
                  </div>
                </div>
              </div>
            </div>

            {/* Split Grid: Signals Stream (Left) vs Archetypes & PM Backlog (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Signal Ingestion */}
              <div className="lg:col-span-5 space-y-6">
                <div className="clay-card-light p-6 border border-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-royal-navy" />
                      <h2 className="text-base font-bold text-royal-navy font-heading">Signal Ingestion Feed</h2>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Live Ingest
                    </span>
                  </div>

                  {/* Inject Custom Gamer Signal Form */}
                  <form onSubmit={handleAddSignal} className="clay-inset-light p-4 mb-4 border border-white">
                    <div className="text-xs font-bold text-royal-navy mb-1.5">Inject Gamer Feedback Signal:</div>
                    <textarea
                      value={newSignalText}
                      onChange={(e) => setNewSignalText(e.target.value)}
                      placeholder="e.g. 'Armor penetration nerf ruins squad extraction balance...'"
                      rows={2}
                      className="w-full text-xs bg-white/90 border border-slate-300 rounded-xl p-2.5 text-royal-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-gold resize-none"
                    />

                    <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                      <select
                        value={newSignalSource}
                        onChange={(e: any) => setNewSignalSource(e.target.value)}
                        className="bg-white border border-slate-300 text-royal-slate text-[11px] rounded-lg px-2 py-1 font-medium"
                      >
                        <option value="reddit">Reddit (r/gaming)</option>
                        <option value="discord">Discord Official</option>
                        <option value="steam">Steam Reviews</option>
                        <option value="gameplay">Telemetry Cluster</option>
                      </select>

                      <button
                        type="submit"
                        className="clay-btn clay-btn-navy px-3 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Inject</span>
                      </button>
                    </div>
                  </form>

                  {/* Signals List */}
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {currentPreset.sampleSignals.map((signal) => (
                      <div
                        key={signal.id}
                        className="clay-card-sm p-3.5 text-xs border border-white/70"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-royal-champagne text-royal-navy">
                              {signal.source}
                            </span>
                            <span className="font-semibold text-royal-navy">{signal.author}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            signal.sentiment === 'critical' ? 'bg-rose-100 text-rose-700' :
                            signal.sentiment === 'negative' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {signal.sentiment}
                          </span>
                        </div>
                        <p className="text-royal-slate leading-relaxed">{signal.text}</p>
                        <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-400">
                          <span>Upvotes: {signal.upvotes.toLocaleString()}</span>
                          <span>{signal.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Cognitive Simulation & PM Backlog */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Cognitive Archetype Evaluation */}
                <div className="clay-card-light p-6 border border-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-royal-goldDark" />
                      <h2 className="text-base font-bold text-royal-navy font-heading">
                        Cognitive Player Archetype Simulation
                      </h2>
                    </div>
                    <span className="text-xs font-mono font-bold text-royal-slate">
                      10,000 Agents
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentPreset.archetypes.map((arch) => (
                      <div key={arch.id} className="clay-card-sm p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-royal-navy">{arch.name}</span>
                            <span className="text-xs font-mono text-royal-slate font-bold">{arch.share}% Cohort</span>
                          </div>

                          <div className="space-y-1.5 my-2.5">
                            <div className="flex justify-between text-xs text-royal-slate">
                              <span>Satisfaction Score</span>
                              <span className="font-bold text-royal-navy">{arch.sentimentScore}/100</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div className="h-full bg-royal-navy rounded-full" style={{ width: `${arch.sentimentScore}%` }} />
                            </div>

                            <div className="flex justify-between text-xs text-royal-slate mt-1">
                              <span>Churn Risk</span>
                              <span className={`font-bold ${arch.churnRisk > 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {arch.churnRisk}%
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${arch.churnRisk > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${arch.churnRisk}%` }} 
                              />
                            </div>
                          </div>

                          <p className="text-xs text-royal-slate leading-relaxed clay-inset-light p-2.5 rounded-xl">
                            <span className="font-bold text-royal-navy">Behavioral Reaction:</span> {arch.predictedReaction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated PM Backlog Tickets */}
                <div className="clay-card-light p-6 border border-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#DCE4ED]">
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-base font-bold text-royal-navy font-heading">
                          Auto-Generated Sprint Backlog Tickets
                        </h2>
                      </div>
                      <p className="text-xs text-royal-slate">
                        Verified by Heather Chandler: direct translation of gamer signals into sprint specs.
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Successfully exported 3 validated RACK Sprint tickets for ${currentPreset.name} to Jira / Linear format!`)}
                      className="clay-btn clay-btn-white px-3.5 py-1.5 text-xs font-bold text-royal-navy flex items-center gap-1.5 cursor-pointer border border-white"
                    >
                      <Download className="w-3.5 h-3.5 text-royal-goldDark" />
                      <span>Export Tickets</span>
                    </button>
                  </div>

                  {/* Tickets List */}
                  <div className="space-y-3">
                    {currentPreset.recommendations.map((rec, idx) => (
                      <div key={rec.id} className="clay-card-sm p-4 border border-white">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              rec.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {rec.priority}
                            </span>
                            <span className="text-xs font-mono font-bold text-royal-navy">{rec.category}</span>
                            <span className="text-xs font-mono text-slate-400">RACK-0{idx + 1}</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 font-mono">
                            {rec.impactMetric}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-royal-navy mb-1.5">{rec.title}</h3>
                        <p className="text-xs text-royal-slate leading-relaxed mb-2.5 clay-inset-light p-2.5 rounded-xl">
                          <span className="font-bold text-royal-navy">PM Spec:</span> {rec.solution}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-rose-50 text-rose-800">
                            <span className="font-bold">Avoided:</span> {rec.riskAvoided}
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                            <span className="font-bold">Dev Time Saved:</span> {rec.devTimeSaved}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* 5. TAB 2: CRISIS & MARKET SIZING */}
        {activeTab === 'CRISIS_MARKET' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* The 2024 Industry Reckoning Summary */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-rose-600 font-bold uppercase tracking-wider">
                The 2024 AAA Failure Loop
              </span>
              <h2 className="text-3xl font-extrabold text-royal-navy mt-1 mb-2 font-heading">
                Why $300M+ Budgets Evaporate
              </h2>
              <p className="text-sm text-royal-slate max-w-3xl leading-relaxed">
                The old paradigm of "build faster" prioritizes speed over accuracy, ignores player mental models, and perpetuates a 92% Day-30 churn disaster.
              </p>

              {/* 3 Casualties */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {CRISIS_FAILURES_2024.map((fail, i) => (
                  <div key={i} className="clay-card-sm p-6 border-t-4 border-t-rose-500">
                    <div className="text-xs font-mono text-slate-400">{fail.studio}</div>
                    <div className="text-lg font-bold text-royal-navy mt-0.5">{fail.name}</div>
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
                ))}
              </div>
            </div>

            {/* Market Opportunity TAM • SAM • SOM */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-royal-goldDark font-bold uppercase tracking-wider">
                Addressable Market Economics
              </span>
              <h2 className="text-3xl font-extrabold text-royal-navy mt-1 mb-6 font-heading">
                TAM • SAM • SOM Market Sizing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="clay-card-sm p-6 border-t-4 border-t-royal-navy">
                  <div className="text-xs font-mono uppercase text-royal-slate font-bold">TAM • Global</div>
                  <div className="text-3xl font-black text-royal-navy font-heading mt-1">$3 Billion</div>
                  <div className="text-xs text-royal-goldDark font-bold">₹25,000 Cr / year</div>
                  <p className="text-xs text-royal-slate mt-3 leading-relaxed">
                    25,000+ studios globally requiring PM foresight, simulation, and live-service retention engineering.
                  </p>
                </div>

                <div className="clay-card-sm p-6 border-t-4 border-t-royal-goldDark">
                  <div className="text-xs font-mono uppercase text-royal-slate font-bold">SAM • Serviceable</div>
                  <div className="text-3xl font-black text-royal-goldDark font-heading mt-1">$187 Million</div>
                  <div className="text-xs text-royal-navy font-bold">₹1,560 Cr / year</div>
                  <p className="text-xs text-royal-slate mt-3 leading-relaxed">
                    1,300–3,300 live-service studios with active budgets, English fluency, and outsourcing readiness.
                  </p>
                </div>

                <div className="clay-card-sm p-6 border-t-4 border-t-emerald-600">
                  <div className="text-xs font-mono uppercase text-royal-slate font-bold">SOM • Obtainable</div>
                  <div className="text-3xl font-black text-emerald-700 font-heading mt-1">$94 Million</div>
                  <div className="text-xs text-emerald-800 font-bold">₹780 Cr / year</div>
                  <p className="text-xs text-royal-slate mt-3 leading-relaxed">
                    650+ active studios realistically secured within 3 years through proven studio traction.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 6. TAB 3: RACK 5-STEP PIPELINE */}
        {activeTab === 'RACK_ENGINE' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-royal-goldDark font-bold uppercase tracking-wider">
                Proprietary Methodology
              </span>
              <h2 className="text-3xl font-extrabold text-royal-navy mt-1 mb-2 font-heading">
                RACK: From Chaos to Cash
              </h2>
              <p className="text-sm text-royal-slate max-w-3xl leading-relaxed mb-8">
                From reactive firefighting to predictive foresight. A complete cognitive pipeline turning multi-source player noise into high-margin gameplay decisions.
              </p>

              {/* 5 Steps Grid */}
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

              {/* Helldivers II Validation Deep Dive */}
              <div className="mt-8 pt-8 border-t border-[#DCE4ED]">
                <div className="clay-inset-light p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-royal-navy uppercase">Case Validation</span>
                    <h3 className="text-lg font-bold text-royal-navy">Helldivers II Pelican Drop Optimization</h3>
                    <p className="text-xs text-royal-slate max-w-xl mt-1">
                      Event prototype constructed in 1 day vs 3-week sprint cycle. Resulted in +30% DAU boost, 15–22% ARPPU uplift, and 80% dev cost reduction.
                    </p>
                  </div>
                  <div className="flex gap-3 text-center flex-shrink-0">
                    <div className="clay-card-sm p-3">
                      <div className="text-xl font-black text-royal-navy font-heading">+22%</div>
                      <div className="text-[10px] font-mono text-royal-slate">ARPPU</div>
                    </div>
                    <div className="clay-card-sm p-3">
                      <div className="text-xl font-black text-royal-goldDark font-heading">80%</div>
                      <div className="text-[10px] font-mono text-royal-slate">Dev Saved</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 7. TAB 4: COMMERCIALS & FINANCIAL ROADMAP */}
        {activeTab === 'COMMERCIAL' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Partnership Models */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-royal-goldDark font-bold uppercase tracking-wider">
                Engagement Models
              </span>
              <h2 className="text-3xl font-extrabold text-royal-navy mt-1 mb-6 font-heading">
                Partnership Tiers
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

            {/* Financial Roadmap Year 1 */}
            <div className="clay-card-light p-8 border border-white">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
                Unit Economics & Year 1 ARR
              </span>
              <h2 className="text-3xl font-extrabold text-royal-navy mt-1 mb-6 font-heading">
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
