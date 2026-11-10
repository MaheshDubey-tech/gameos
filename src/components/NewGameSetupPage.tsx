import React, { useState } from 'react';
import { 
  PlusCircle, Sparkles, Gamepad2, ArrowRight, ShieldCheck, 
  Layers, CheckCircle2, AlertCircle, RefreshCw, Radio, 
  Cpu, Rocket, Play, ChevronRight, Sliders, Database, Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GamePreset, PlayerArchetype, BacklogRecommendation, PlayerSignal } from '../types';
import { soundEngine } from './AudioEngine';

interface Props {
  onGameCreated: (newGame: GamePreset) => void;
  onCancel: () => void;
}

export const NewGameSetupPage: React.FC<Props> = ({ onGameCreated, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Form State
  const [gameTitle, setGameTitle] = useState<string>('Project Vanguard: Eclipse');
  const [studioName, setStudioName] = useState<string>('Apex Interactive Studios');
  const [genre, setGenre] = useState<string>('Co-op Extraction Shooter');
  const [stage, setStage] = useState<string>('Beta / Pre-Launch');
  const [monetization, setMonetization] = useState<string>('Free-to-Play Seasonal Battle Pass + Cosmetics');
  const [primaryFriction, setPrimaryFriction] = useState<string>(
    'Player churn spike between Day 3 and Day 7 due to steep endgame weapon upgrade wall.'
  );
  
  // Custom Signal Feed
  const [customSignal1, setCustomSignal1] = useState<string>(
    'The tier-4 weapon crafting requires 6 hours of repetitive resource mining. It feels like a second job.'
  );
  const [customSignal2, setCustomSignal2] = useState<string>(
    'Matchmaking queues drop significantly late at night because solo queues get crushed by coordinated squads.'
  );

  const handleCreateGame = () => {
    setIsGenerating(true);
    soundEngine.playClick(600);

    setTimeout(() => {
      // Auto-generate customized archetypes based on genre
      const archetypes: PlayerArchetype[] = [
        {
          id: `arch-${Date.now()}-1`,
          name: genre.includes('Shooter') ? 'The Min-Max Competitor' : 'The Hardcore Grinder',
          share: 36,
          sentimentScore: 68,
          churnRisk: 42,
          primaryMotivation: 'Mastery, leaderboard dominance, optimized meta loadouts',
          predictedReaction: `Sensitive to perceived time-wasting loops. High risk of departure if progression pacing is artificially gatekept.`,
          avatarColor: '#0F1D38'
        },
        {
          id: `arch-${Date.now()}-2`,
          name: 'The Social Co-op Explorer',
          share: 32,
          sentimentScore: 78,
          churnRisk: 18,
          primaryMotivation: 'Emergent squad moments, shared rewards, casual accessibility',
          predictedReaction: `Enjoys emergent gameplay; converts readily to cosmetic battle passes with squad-shared boosts.`,
          avatarColor: '#C5A880'
        },
        {
          id: `arch-${Date.now()}-3`,
          name: 'The Narrative & Lore Enthusiast',
          share: 20,
          sentimentScore: 84,
          churnRisk: 14,
          primaryMotivation: 'World-building, environmental storytelling, seasonal lore arcs',
          predictedReaction: `Strong organic community advocates on Reddit/Discord when world updates have clear stakes.`,
          avatarColor: '#10B981'
        },
        {
          id: `arch-${Date.now()}-4`,
          name: 'The Casual Weekend Recruit',
          share: 12,
          sentimentScore: 54,
          churnRisk: 62,
          primaryMotivation: 'Low-stress fun without grueling weekly checklist anxiety',
          predictedReaction: `High early Day-7 abandonment if onboarding mechanics are too punitive or unguided.`,
          avatarColor: '#F59E0B'
        }
      ];

      // Auto-generate actionable PM backlog recommendations
      const recommendations: BacklogRecommendation[] = [
        {
          id: `rec-${Date.now()}-1`,
          title: 'Dynamic Milestone Pacing & Rest-Bonus Acceleration',
          category: 'Progression',
          priority: 'CRITICAL',
          impactMetric: '+28% Day-14 Retention Uplift',
          devTimeSaved: 'Pre-validated in 1 day; saves ~3 weeks of blind balance iteration',
          solution: `Smooth the tier-4 progression curve by introducing diminishing daily resource thresholds and squad-shared extraction bonuses for ${gameTitle}.`,
          riskAvoided: 'Halts the 42% churn spike observed in competitive player cohorts.'
        },
        {
          id: `rec-${Date.now()}-2`,
          title: 'Squad-Protected Solo Matchmaking Quarantine',
          category: 'Retention Loop',
          priority: 'HIGH',
          impactMetric: '15-20% Matchmaking Pool Expansion',
          devTimeSaved: 'Saves estimated $1.8M in avoided player attrition',
          solution: `Implement algorithmic matchmaking prioritization that separates coordinated 3-stacks from solo queue mercenaries during high-urgency extraction windows.`,
          riskAvoided: 'Averts negative review-bomb spiral on Steam Community Hub.'
        },
        {
          id: `rec-${Date.now()}-3`,
          title: 'Tiered Founder Warbond with Transparency Guarantee',
          category: 'Monetization',
          priority: 'HIGH',
          impactMetric: '+18% ARPPU Conversion',
          devTimeSaved: 'Avoids multi-month community backlash cycle',
          solution: `Structure seasonal cosmetics so premium battle pass holders unlock exclusive weapon finishes while core gameplay power remains 100% earnable via free track.`,
          riskAvoided: 'Maintains 94% Community Trust Accuracy score across Discord and Reddit.'
        }
      ];

      const sampleSignals: PlayerSignal[] = [
        {
          id: `sig-${Date.now()}-1`,
          source: 'reddit',
          author: 'GamerVanguard_99',
          sentiment: 'critical',
          text: customSignal1,
          upvotes: 1840,
          timestamp: '20m ago'
        },
        {
          id: `sig-${Date.now()}-2`,
          source: 'discord',
          author: 'SquadCaptain#4401',
          sentiment: 'negative',
          text: customSignal2,
          upvotes: 520,
          timestamp: '45m ago'
        },
        {
          id: `sig-${Date.now()}-3`,
          source: 'gameplay',
          author: 'Telemetry-Cluster-US-East',
          sentiment: 'critical',
          text: `Telemetry: 38% match abandonment recorded when mission timer surpasses 18 minutes under unrewarded resource deficits.`,
          upvotes: 9999,
          timestamp: 'Live'
        }
      ];

      const newGamePreset: GamePreset = {
        id: `custom-${Date.now()}`,
        name: `${gameTitle}`,
        genre: genre,
        studio: studioName,
        status: 'Active Studio System',
        signalsCount: 8420,
        initialSentiment: 64,
        sampleSignals: sampleSignals,
        archetypes: archetypes,
        recommendations: recommendations,
        isCustom: true,
        platform: 'PC Steam / PS5 / Xbox',
        engine: 'Unreal Engine 5',
        monetizationModel: monetization,
        stage: stage
      };

      setIsGenerating(false);
      soundEngine.playSuccess();

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F1D38', '#C5A880', '#10B981']
      });

      onGameCreated(newGamePreset);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="clay-card-light p-8 sm:p-10 mb-8 border border-white">
        <div className="flex items-center justify-between pb-6 border-b border-[#DCE4ED] flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-champagne text-royal-goldDark text-xs font-mono font-bold uppercase mb-2 border border-royal-gold/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Onboarding Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-royal-navy font-heading">
              Configure Your Studio Game System
            </h1>
            <p className="text-xs sm:text-sm text-royal-slate mt-1">
              Set up GameOS for a new game title to monitor community signals, simulate 10,000 player agents, and generate customized live-service backlog tickets.
            </p>
          </div>

          <button
            onClick={onCancel}
            className="clay-btn clay-btn-white px-4 py-2 text-xs font-bold text-royal-slate hover:text-royal-navy border border-white cursor-pointer"
          >
            Cancel / Back
          </button>
        </div>

        {/* 3 Step Pills */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div 
            onClick={() => setCurrentStep(1)}
            className={`p-3 rounded-2xl cursor-pointer transition-all text-center border ${
              currentStep === 1 ? 'clay-btn-navy text-white shadow-sm' : 'clay-card-sm text-royal-slate'
            }`}
          >
            <div className="text-[10px] font-mono uppercase font-bold">Step 01</div>
            <div className="text-xs font-bold">Game Identity</div>
          </div>
          <div 
            onClick={() => setCurrentStep(2)}
            className={`p-3 rounded-2xl cursor-pointer transition-all text-center border ${
              currentStep === 2 ? 'clay-btn-navy text-white shadow-sm' : 'clay-card-sm text-royal-slate'
            }`}
          >
            <div className="text-[10px] font-mono uppercase font-bold">Step 02</div>
            <div className="text-xs font-bold">Signals & Symptoms</div>
          </div>
          <div 
            onClick={() => setCurrentStep(3)}
            className={`p-3 rounded-2xl cursor-pointer transition-all text-center border ${
              currentStep === 3 ? 'clay-btn-navy text-white shadow-sm' : 'clay-card-sm text-royal-slate'
            }`}
          >
            <div className="text-[10px] font-mono uppercase font-bold">Step 03</div>
            <div className="text-xs font-bold">Review & Initialize</div>
          </div>
        </div>
      </div>

      {/* STEP 1: GAME IDENTITY */}
      {currentStep === 1 && (
        <div className="clay-card-light p-8 border border-white space-y-6 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-royal-navy" />
            <h2 className="text-lg font-bold text-royal-navy font-heading">
              Step 1: Game & Studio Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-royal-navy block mb-1.5">Game Title</label>
              <input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="e.g. Project Vanguard: Eclipse"
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-semibold focus:outline-none focus:ring-2 focus:ring-royal-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-royal-navy block mb-1.5">Studio / Publisher Name</label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="e.g. Apex Interactive Studios"
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-semibold focus:outline-none focus:ring-2 focus:ring-royal-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-royal-navy block mb-1.5">Genre Classification</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-semibold focus:outline-none focus:ring-2 focus:ring-royal-gold"
              >
                <option value="Co-op Extraction Shooter">Co-op Extraction Shooter</option>
                <option value="5v5 Hero Shooter">5v5 Hero Shooter</option>
                <option value="Open World Survival MMO">Open World Survival MMO</option>
                <option value="Sci-Fi Battle Royale">Sci-Fi Battle Royale</option>
                <option value="Action RPG / Looter Slasher">Action RPG / Looter Slasher</option>
                <option value="Tactical FPS / Squad Military">Tactical FPS / Squad Military</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-royal-navy block mb-1.5">Production Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-semibold focus:outline-none focus:ring-2 focus:ring-royal-gold"
              >
                <option value="Pre-Production Concept">Pre-Production Concept</option>
                <option value="Closed Alpha / Early Testing">Closed Alpha / Early Testing</option>
                <option value="Beta / Pre-Launch">Beta / Pre-Launch</option>
                <option value="Live-Ops Active (Post-Launch)">Live-Ops Active (Post-Launch)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-royal-navy block mb-1.5">Monetization Architecture</label>
              <select
                value={monetization}
                onChange={(e) => setMonetization(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-semibold focus:outline-none focus:ring-2 focus:ring-royal-gold"
              >
                <option value="Free-to-Play Seasonal Battle Pass + Cosmetics">Free-to-Play Seasonal Battle Pass + Cosmetics</option>
                <option value="$40 Premium Buy-to-Play with Optional Cosmetic Fast-Tracks">$40 Premium Buy-to-Play with Optional Cosmetic Fast-Tracks</option>
                <option value="$70 Standard AAA with Live Expansion Drops">$70 Standard AAA with Live Expansion Drops</option>
                <option value="Hybrid Subscription + Battle Pass">Hybrid Subscription + Battle Pass</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DCE4ED] flex justify-end">
            <button
              onClick={() => {
                soundEngine.playClick(500);
                setCurrentStep(2);
              }}
              className="clay-btn clay-btn-navy px-6 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-clay-btn-navy"
            >
              <span>Next: Signals & Friction Points</span>
              <ArrowRight className="w-4 h-4 text-royal-goldLight" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SIGNALS & FRICTION */}
      {currentStep === 2 && (
        <div className="clay-card-light p-8 border border-white space-y-6 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-royal-navy" />
            <h2 className="text-lg font-bold text-royal-navy font-heading">
              Step 2: Key Community Signals & Friction Points
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-royal-navy block mb-1.5">
                Primary Live-Service Symptom / Studio Concern:
              </label>
              <textarea
                value={primaryFriction}
                onChange={(e) => setPrimaryFriction(e.target.value)}
                rows={2}
                placeholder="What is your biggest player retention or revenue bottleneck?"
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-medium focus:outline-none focus:ring-2 focus:ring-royal-gold resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-royal-navy block mb-1">
                  Sample Reddit / Forum Criticism:
                </label>
                <textarea
                  value={customSignal1}
                  onChange={(e) => setCustomSignal1(e.target.value)}
                  rows={2}
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-royal-navy resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-royal-navy block mb-1">
                  Sample Discord / Community Complaint:
                </label>
                <textarea
                  value={customSignal2}
                  onChange={(e) => setCustomSignal2(e.target.value)}
                  rows={2}
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-royal-navy resize-none"
                />
              </div>
            </div>

            {/* Ingestion Channels Checkbox Pills */}
            <div>
              <div className="text-xs font-bold text-royal-navy mb-2">Enabled Ingestion Pipelines:</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="clay-card-sm px-3 py-1 text-royal-navy font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Discord Official Guild (#feedback, #bugs)
                </span>
                <span className="clay-card-sm px-3 py-1 text-royal-navy font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Reddit Subreddit Ingestion
                </span>
                <span className="clay-card-sm px-3 py-1 text-royal-navy font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Steam Community Review Crawler
                </span>
                <span className="clay-card-sm px-3 py-1 text-royal-navy font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Gameplay Telemetry Cluster Webhook
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DCE4ED] flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="clay-btn clay-btn-white px-5 py-2.5 text-xs font-bold text-royal-navy cursor-pointer border border-white"
            >
              Back
            </button>
            <button
              onClick={() => {
                soundEngine.playClick(500);
                setCurrentStep(3);
              }}
              className="clay-btn clay-btn-navy px-6 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-clay-btn-navy"
            >
              <span>Next: Review & Initialize System</span>
              <ArrowRight className="w-4 h-4 text-royal-goldLight" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & INITIALIZE */}
      {currentStep === 3 && (
        <div className="clay-card-light p-8 border border-white space-y-6 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-royal-goldDark" />
            <h2 className="text-lg font-bold text-royal-navy font-heading">
              Step 3: Ready to Initialize Custom Game System
            </h2>
          </div>

          <div className="clay-inset-light p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-300">
              <span className="text-xs font-mono text-royal-slate uppercase font-bold">Configured Title:</span>
              <span className="text-base font-black text-royal-navy font-heading">{gameTitle}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-300">
              <span className="text-xs font-mono text-royal-slate uppercase font-bold">Studio:</span>
              <span className="text-xs font-bold text-royal-navy">{studioName}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-300">
              <span className="text-xs font-mono text-royal-slate uppercase font-bold">Genre & Stage:</span>
              <span className="text-xs font-bold text-royal-navy">{genre} • {stage}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-royal-slate uppercase font-bold">Monetization:</span>
              <span className="text-xs font-bold text-royal-navy">{monetization}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-royal-champagne border border-royal-gold/30 text-xs text-royal-navy leading-relaxed">
            <span className="font-bold">Next Automated Step:</span> GameOS will instantiate your custom game telemetry stream, cluster your incoming player feedback into 4 discrete cognitive archetypes, and generate verified P0/P1 backlog items to avert player churn.
          </div>

          <div className="pt-4 border-t border-[#DCE4ED] flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="clay-btn clay-btn-white px-5 py-2.5 text-xs font-bold text-royal-navy cursor-pointer border border-white"
            >
              Back
            </button>
            <button
              onClick={handleCreateGame}
              disabled={isGenerating}
              className="clay-btn clay-btn-navy px-8 py-3.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-clay-btn-navy disabled:opacity-50"
            >
              <Rocket className={`w-4 h-4 text-royal-goldLight ${isGenerating ? 'animate-bounce' : ''}`} />
              <span>{isGenerating ? 'Compiling Cognitive Weights...' : 'Initialize & Launch Game System'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

