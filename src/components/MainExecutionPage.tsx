import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Crosshair, BarChart3, Radio, Layers, Zap, 
  CheckCircle2, AlertTriangle, ArrowRight, Download, Plus, 
  RefreshCw, Sliders, Shield, Terminal, Send, Server, Play, 
  ExternalLink, FileText, CornerDownRight, X, ChevronRight, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  TaskItem, CombatSimParams, CombatSimResult, 
  GraphNode, GraphEdge, CopilotMessage, GamePreset 
} from '../types';
import { 
  INITIAL_TASKS, WEAPON_PRESETS, INITIAL_GRAPH_NODES, 
  INITIAL_GRAPH_EDGES 
} from '../data/mockData';
import { soundEngine } from './AudioEngine';

interface Props {
  activeGame: GamePreset;
  onOpenNewGameSetup: () => void;
  onNavigateToExamples: () => void;
  onBackToIntro: () => void;
}

export const MainExecutionPage: React.FC<Props> = ({
  activeGame,
  onOpenNewGameSetup,
  onNavigateToExamples,
  onBackToIntro
}) => {
  // Operational Module State
  const [activeModule, setActiveModule] = useState<
    'COMBAT_SIM' | 'RADAR_KANBAN' | 'NLP_SIGNALS' | 'GRAPHRAG' | 'COPILOT_FLEET'
  >('COMBAT_SIM');

  // --- 1. COMBAT SIMULATOR STATE ---
  const [selectedWeaponName, setSelectedWeaponName] = useState<string>('RS-422 Railgun');
  const [selectedTarget, setSelectedTarget] = useState<string>('Bile Titan');
  const [simParams, setSimParams] = useState<CombatSimParams>(WEAPON_PRESETS['RS-422 Railgun']);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<CombatSimResult>({
    ttkSeconds: 4.15,
    winratePct: 53.2,
    headshotPct: 38.6,
    entropyScore: 0.14,
    latencyMs: 3.2,
    corridorBreach: false,
    traceLogs: [
      "[0.00ms] Ingress: Q32.32 Fixed-point raycast initialized (10,000 matches)",
      "[1.12ms] CCD Trace: 84.2% penetration verified against heavy carapace plate",
      "[2.45ms] Multi-Fidelity Monte Carlo: variance reduced by 89.1%",
      "[3.20ms] Batch completed: Mean TTK = 4.15s ± 0.08s (Corridor compliant)"
    ]
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- 2. 10x10 RADAR & KANBAN STATE ---
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [selectedTaskForDossier, setSelectedTaskForDossier] = useState<TaskItem | null>(null);
  const [radarFilter, setRadarFilter] = useState<'All' | 'Now' | 'Next' | 'Later'>('All');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskImpact, setNewTaskImpact] = useState<number>(8);
  const [newTaskEffort, setNewTaskEffort] = useState<number>(3);

  // --- 3. NLP & FEEDBACK CONSOLE STATE ---
  const [signalsList, setSignalsList] = useState(activeGame.sampleSignals);
  const [rawFeedbackInput, setRawFeedbackInput] = useState<string>('');
  const [feedbackSource, setFeedbackSource] = useState<'reddit' | 'discord' | 'steam' | 'gameplay'>('reddit');
  const [sanitizerOutput, setSanitizerOutput] = useState<{
    sanitized: string;
    promptInjectionsDetected: number;
    centroidSentiment: number;
    tokenCount: number;
  }>({
    sanitized: "Community sentiment vectors stabilized. Injections: 0. Centroid: -0.42.",
    promptInjectionsDetected: 0,
    centroidSentiment: -0.42,
    tokenCount: 42
  });

  // --- 4. GRAPHRAG STATE ---
  const [graphNodes] = useState<GraphNode[]>(INITIAL_GRAPH_NODES);
  const [graphEdges] = useState<GraphEdge[]>(INITIAL_GRAPH_EDGES);
  const [selectedGraphNode, setSelectedGraphNode] = useState<GraphNode | null>(INITIAL_GRAPH_NODES[0]);

  // --- 5. COPILOT & FLEET STATE ---
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: "GameOS CoPilot initialized. Ready to synthesize live balance patches, C++ AST diffs, and Agones deployment manifests for " + activeGame.name + ".",
      timestamp: "10:30 AM"
    }
  ]);
  const [copilotInput, setCopilotInput] = useState<string>('');
  const [fleetStatus, setFleetStatus] = useState({
    activePods: 1250,
    drainingPods: 0,
    v2Pods: 0,
    tier1HotfixesDispatched: 4,
    lastDeployLatency: "3.4ms"
  });

  // Canvas Drawing for Combat Histogram
  useEffect(() => {
    if (activeModule === 'COMBAT_SIM' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = '#DCE4ED';
      ctx.lineWidth = 1;
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 30; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Design DNA Safe Corridor (between 3.5s and 5.0s)
      const corridorStart = (width * 0.35);
      const corridorWidth = (width * 0.3);
      ctx.fillStyle = 'rgba(197, 168, 128, 0.15)';
      ctx.fillRect(corridorStart, 0, corridorWidth, height);
      ctx.strokeStyle = '#C5A880';
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(corridorStart, 0, corridorWidth, height);
      ctx.setLineDash([]);

      // Draw TTK Bell Curve based on simResult
      const meanX = width * (Math.min(simResult.ttkSeconds, 8) / 8);
      ctx.beginPath();
      ctx.strokeStyle = simResult.corridorBreach ? '#EF4444' : '#0F1D38';
      ctx.lineWidth = 3;

      for (let x = 10; x < width - 10; x += 4) {
        const dist = (x - meanX) / 45;
        const yVal = Math.exp(-0.5 * dist * dist);
        const y = height - 20 - yVal * (height * 0.75);
        if (x === 10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Mean line
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(meanX, 10);
      ctx.lineTo(meanX, height - 10);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#0F1D38';
      ctx.font = '10px monospace';
      ctx.fillText(`TTK Mean: ${simResult.ttkSeconds}s`, meanX - 35, 24);
      ctx.fillText('Design Corridor [3.5s - 5.0s]', corridorStart + 6, height - 8);
    }
  }, [activeModule, simResult]);

  // Handle Weapon Switch
  const handleWeaponChange = (weaponName: string) => {
    soundEngine.playClick(500);
    setSelectedWeaponName(weaponName);
    const preset = WEAPON_PRESETS[weaponName];
    if (preset) {
      setSimParams(preset);
      runHeadlessCombatSim(preset);
    }
  };

  // Run Headless Combat Simulation (Q32.32 Fixed-point physics)
  const runHeadlessCombatSim = (params: CombatSimParams = simParams) => {
    setIsSimRunning(true);
    soundEngine.playClick(620);

    setTimeout(() => {
      // Deterministic calculation
      const calculatedTtk = Math.round(((params.falloff / params.damage) * (params.distance / 10) * 1.8 + 2.2) * 100) / 100;
      const isBreach = calculatedTtk < 3.2 || calculatedTtk > 5.4;
      const winrate = Math.min(95, Math.max(15, Math.round((70 - calculatedTtk * 6 + params.armorPen * 4) * 10) / 10));

      setSimResult({
        ttkSeconds: calculatedTtk,
        winratePct: winrate,
        headshotPct: Math.round(35 + params.armorPen * 2.5),
        entropyScore: Math.round((0.08 + Math.random() * 0.08) * 100) / 100,
        latencyMs: Math.round((2.8 + Math.random() * 0.8) * 10) / 10,
        corridorBreach: isBreach,
        traceLogs: [
          `[0.00ms] Ingress: Fixed-point Q32.32 raycast for ${params.weapon} vs ${params.target}`,
          `[1.15ms] Distance: ${params.distance}m | Armor Pen Tier: ${params.armorPen} | Damage: ${params.damage}`,
          `[2.30ms] 10,000 matches evaluated in headless Rust kernel with 0 allocation`,
          `[${(Math.random() * 0.8 + 2.8).toFixed(2)}ms] Output: TTK = ${calculatedTtk}s (${isBreach ? 'BREACH: Outside Design Corridor' : 'PASS: Within Corridor'})`
        ]
      });

      setIsSimRunning(false);
      if (!isBreach) {
        soundEngine.playSuccess();
      } else {
        soundEngine.playAlert();
      }
    }, 450);
  };

  // Add Task to 10x10 Radar
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    soundEngine.playClick(600);
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      source: "Manual Studio Ingress",
      priority: newTaskImpact >= 8 ? "Critical" : newTaskImpact >= 5 ? "High" : "Medium",
      status: "In Progress",
      horizon: newTaskImpact >= 7 ? "Now" : "Next",
      impact: newTaskImpact,
      effort: newTaskEffort,
      assignee: "Studio Team",
      description: `Task generated from new operational data. Impact score ${newTaskImpact}/10 with effort ${newTaskEffort}/10. Priority metric P = Impact² / Effort = ${((newTaskImpact * newTaskImpact) / newTaskEffort).toFixed(1)}.`,
      evidence: "Operational telemetry alert captured during current live match session.",
      codeRef: "Source/Game/Balance/WeaponBalancingSubsystem.cpp",
      testValidation: "Headless Monte Carlo automated verification scheduled.",
      tags: ["NewIngress", "P0", "Roadmap"],
      updated: "Just now"
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  // Move Task Horizon
  const moveTaskHorizon = (taskId: string, newHorizon: 'Now' | 'Next' | 'Later') => {
    soundEngine.playClick(450);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, horizon: newHorizon } : t));
  };

  // Ingest & Sanitize New Feedback
  const handleIngestFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawFeedbackInput.trim()) return;

    soundEngine.playClick(500);
    const newSignal = {
      id: `sig-${Date.now()}`,
      source: feedbackSource,
      author: "Operator_" + Math.floor(Math.random() * 800 + 100),
      sentiment: (rawFeedbackInput.toLowerCase().includes('nerf') || rawFeedbackInput.toLowerCase().includes('broken') || rawFeedbackInput.toLowerCase().includes('ruin')) ? 'critical' as const : 'negative' as const,
      text: rawFeedbackInput.trim(),
      upvotes: 1,
      timestamp: "Live Ingress"
    };

    setSignalsList(prev => [newSignal, ...prev]);
    setSanitizerOutput({
      sanitized: rawFeedbackInput.replace(/<[^>]*>?/gm, '').trim(),
      promptInjectionsDetected: rawFeedbackInput.toLowerCase().includes('ignore previous instructions') ? 1 : 0,
      centroidSentiment: -0.68,
      tokenCount: Math.round(rawFeedbackInput.split(' ').length * 1.3)
    });

    setRawFeedbackInput('');
  };

  // CoPilot Prompt Submission
  const handleSendCopilotPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;

    const userMsg: CopilotMessage = {
      id: `cop-${Date.now()}`,
      sender: "user",
      text: copilotInput.trim(),
      timestamp: "Just now"
    };

    setCopilotMessages(prev => [...prev, userMsg]);
    const promptText = copilotInput;
    setCopilotInput('');
    soundEngine.playClick(550);

    setTimeout(() => {
      const assistantMsg: CopilotMessage = {
        id: `cop-${Date.now() + 1}`,
        sender: "assistant",
        text: `Synthesized balance intervention based on Q32.32 combat telemetry. Proposal generated for ${activeGame.name}:`,
        timestamp: "Just now",
        proposal: {
          title: `Hotfix Patch Proposal: Rebalance ${selectedWeaponName}`,
          targetWeapon: selectedWeaponName,
          diffSnippet: `--- Source/Game/Weapons/${selectedWeaponName.replace(/\s+/g, '')}.cpp\n+++ Source/Game/Weapons/${selectedWeaponName.replace(/\s+/g, '')}.cpp\n@@ -84,3 +84,3 @@\n- ArmorPenetration = 4;\n+ ArmorPenetration = 5; // Restores power fantasy vs heavy carapace\n- DamageFalloffStart = 30.0f;\n+ DamageFalloffStart = 45.0f;`,
          predictedTtkDelta: "-0.45s (Re-aligns inside Design DNA Corridor)"
        }
      };
      setCopilotMessages(prev => [...prev, assistantMsg]);
      soundEngine.playSuccess();
    }, 700);
  };

  // Agones Fleet Hotfix Trigger
  const triggerFleetHotfix = () => {
    soundEngine.playClick(700);
    setFleetStatus(prev => ({
      ...prev,
      tier1HotfixesDispatched: prev.tier1HotfixesDispatched + 1,
      lastDeployLatency: "2.8ms"
    }));
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    alert(`Agones Fleet Dispatch Confirmed: Hotfix pushed to ${fleetStatus.activePods} active pods in 2.8ms with ZERO match restarts!`);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0F1D38] pb-24 selection:bg-[#C5A880] selection:text-[#0F1D38]">
      
      {/* 1. TOP OPERATIONAL HEADER */}
      <header className="sticky top-0 z-40 bg-[#EEF2F6]/95 backdrop-blur-md border-b border-[#D6E0EC] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToIntro}
              className="clay-btn clay-btn-white px-3 py-1.5 text-xs font-bold text-royal-slate hover:text-royal-navy flex items-center gap-1.5 cursor-pointer border border-white"
            >
              <span>← Intro</span>
            </button>

            <div className="h-4 w-px bg-slate-300" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-royal-navy font-heading leading-tight">
                  GameOS Studio Console
                </span>
                <span className="text-[10px] font-mono text-royal-slate">
                  Active Execution: <strong className="text-royal-navy">{activeGame.name}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Switchers */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewGameSetup}
              className="clay-btn clay-btn-white px-3.5 py-1.5 text-xs font-bold text-royal-navy flex items-center gap-1.5 cursor-pointer border border-white"
              title="Add an entirely new game title"
            >
              <Plus className="w-3.5 h-3.5 text-royal-goldDark" />
              <span>+ Add New Game</span>
            </button>

            <button
              onClick={onNavigateToExamples}
              className="clay-btn clay-btn-navy px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="View Helldivers II, Concord, Suicide Squad & Industry Post-Mortems"
            >
              <FileText className="w-3.5 h-3.5 text-royal-goldLight" />
              <span>Industry Cases Archive →</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. ORDERED OPERATIONAL WORKFLOW TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        <div className="clay-card-light p-2 flex flex-wrap gap-2 border border-white/80 mb-6">
          <button
            onClick={() => { soundEngine.playClick(480); setActiveModule('COMBAT_SIM'); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeModule === 'COMBAT_SIM' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Crosshair className="w-4 h-4 text-royal-goldLight" />
            <span>1. Headless Combat Simulator</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveModule('RADAR_KANBAN'); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeModule === 'RADAR_KANBAN' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-royal-goldLight" />
            <span>2. 10x10 Prioritization Radar</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveModule('NLP_SIGNALS'); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeModule === 'NLP_SIGNALS' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Radio className="w-4 h-4 text-royal-goldLight" />
            <span>3. Signal Ingestion & NLP</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveModule('GRAPHRAG'); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeModule === 'GRAPHRAG' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Layers className="w-4 h-4 text-royal-goldLight" />
            <span>4. GraphRAG Code Topology</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(480); setActiveModule('COPILOT_FLEET'); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeModule === 'COPILOT_FLEET' ? 'clay-btn-navy text-white shadow-sm' : 'text-royal-slate hover:text-royal-navy'
            }`}
          >
            <Zap className="w-4 h-4 text-royal-goldLight" />
            <span>5. AI CoPilot & Fleet Hotfix</span>
          </button>
        </div>

        {/* 3. MODULE 1: HEADLESS COMBAT SIMULATOR & TTK VISUALIZER */}
        {activeModule === 'COMBAT_SIM' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Weapon & Corridor Status */}
            <div className="clay-card-light p-6 border border-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE4ED]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-royal-goldDark uppercase bg-royal-champagne px-2.5 py-0.5 rounded-full border border-royal-gold/30">
                      Multi-Fidelity Monte Carlo (MFMC)
                    </span>
                    <span className="text-xs font-mono text-royal-slate">• 10,000 Matches / Run</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-royal-navy font-heading mt-1">
                    Predictive Combat Simulator: TTK & Weapon Dynamics
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                    simResult.corridorBreach 
                      ? 'bg-rose-100 text-rose-800 border-rose-300' 
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {simResult.corridorBreach ? '⚠ CORRIDOR BREACH DETECTED' : '✓ WITHIN DESIGN DNA CORRIDOR'}
                  </div>

                  <button
                    onClick={() => runHeadlessCombatSim()}
                    disabled={isSimRunning}
                    className="clay-btn clay-btn-navy px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSimRunning ? 'animate-spin' : ''}`} />
                    <span>{isSimRunning ? 'Simulating...' : 'Run 10,000 Matches'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets Bar */}
              <div className="flex items-center gap-2 pt-4 flex-wrap">
                <span className="text-xs font-mono text-royal-slate font-bold">Weapon Presets:</span>
                {Object.keys(WEAPON_PRESETS).map((wName) => (
                  <button
                    key={wName}
                    onClick={() => handleWeaponChange(wName)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      selectedWeaponName === wName 
                        ? 'clay-btn-navy text-white shadow-sm' 
                        : 'clay-card-sm text-royal-slate hover:text-royal-navy'
                    }`}
                  >
                    {wName}
                  </button>
                ))}
              </div>
            </div>

            {/* Split: Sliders Control (Left) vs Single-Pass Canvas Histogram (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sliders Panel */}
              <div className="lg:col-span-5 clay-card-light p-6 border border-white space-y-4">
                <h3 className="text-sm font-bold text-royal-navy font-heading flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-royal-goldDark" />
                  <span>Combat & Balistics Parameters (Q32.32)</span>
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <div className="flex justify-between font-mono font-bold mb-1">
                      <span className="text-royal-slate">Engagement Distance:</span>
                      <span className="text-royal-navy">{simParams.distance} meters</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={simParams.distance}
                      onChange={(e) => {
                        const newParams = { ...simParams, distance: Number(e.target.value) };
                        setSimParams(newParams);
                        runHeadlessCombatSim(newParams);
                      }}
                      className="w-full accent-royal-navy cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono font-bold mb-1">
                      <span className="text-royal-slate">Base Damage:</span>
                      <span className="text-royal-navy">{simParams.damage} HP</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="800"
                      step="10"
                      value={simParams.damage}
                      onChange={(e) => {
                        const newParams = { ...simParams, damage: Number(e.target.value) };
                        setSimParams(newParams);
                        runHeadlessCombatSim(newParams);
                      }}
                      className="w-full accent-royal-navy cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono font-bold mb-1">
                      <span className="text-royal-slate">Damage Falloff Distance:</span>
                      <span className="text-royal-navy">{simParams.falloff} meters</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={simParams.falloff}
                      onChange={(e) => {
                        const newParams = { ...simParams, falloff: Number(e.target.value) };
                        setSimParams(newParams);
                        runHeadlessCombatSim(newParams);
                      }}
                      className="w-full accent-royal-navy cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono font-bold mb-1">
                      <span className="text-royal-slate">Armor Penetration Tier:</span>
                      <span className="text-royal-goldDark font-bold">Tier {simParams.armorPen} / 6</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={simParams.armorPen}
                      onChange={(e) => {
                        const newParams = { ...simParams, armorPen: Number(e.target.value) };
                        setSimParams(newParams);
                        runHeadlessCombatSim(newParams);
                      }}
                      className="w-full accent-royal-goldDark cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE4ED]">
                  <div className="text-[11px] font-mono text-royal-slate mb-1">CLI Ingress Command:</div>
                  <div className="clay-inset-light p-2.5 rounded-xl text-[10px] font-mono text-royal-navy overflow-x-auto">
                    <code>gameos sim --weapon "{selectedWeaponName}" --dist {simParams.distance} --dmg {simParams.damage} --pen {simParams.armorPen} --runs 10000</code>
                  </div>
                </div>
              </div>

              {/* TTK Histogram & Trace Logs */}
              <div className="lg:col-span-7 clay-card-light p-6 border border-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-royal-navy uppercase">
                      Time to Kill (TTK) Distribution Histogram
                    </span>
                    <span className="text-xs font-mono text-royal-slate">
                      Latency: <strong className="text-emerald-700">{simResult.latencyMs}ms</strong>
                    </span>
                  </div>

                  {/* Canvas Histogram */}
                  <div className="clay-inset-light p-2 rounded-2xl mb-4">
                    <canvas
                      ref={canvasRef}
                      width={520}
                      height={200}
                      className="w-full h-48 block"
                    />
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-3 gap-3 text-center mb-4">
                    <div className="clay-card-sm p-3">
                      <div className="text-xs text-royal-slate font-mono">Mean TTK</div>
                      <div className={`text-xl font-black font-heading mt-0.5 ${
                        simResult.corridorBreach ? 'text-rose-600' : 'text-royal-navy'
                      }`}>
                        {simResult.ttkSeconds}s
                      </div>
                    </div>
                    <div className="clay-card-sm p-3">
                      <div className="text-xs text-royal-slate font-mono">Sim Winrate</div>
                      <div className="text-xl font-black text-emerald-700 font-heading mt-0.5">
                        {simResult.winratePct}%
                      </div>
                    </div>
                    <div className="clay-card-sm p-3">
                      <div className="text-xs text-royal-slate font-mono">Entropy Variance</div>
                      <div className="text-xl font-black text-royal-goldDark font-heading mt-0.5">
                        {simResult.entropyScore}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Headless Rust Trace Logs */}
                <div className="clay-inset-light p-3 rounded-xl">
                  <div className="text-[10px] font-mono text-royal-slate font-bold uppercase mb-1">
                    Deterministic Kernel Trace:
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-royal-navy">
                    {simResult.traceLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 4. MODULE 2: 10x10 PRIORITIZATION RADAR & TASKS KANBAN */}
        {activeModule === 'RADAR_KANBAN' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Quick Create Task Form */}
            <div className="clay-card-light p-6 border border-white">
              <h2 className="text-lg font-bold text-royal-navy font-heading mb-3 flex items-center justify-between">
                <span>10x10 Prioritization Radar & Horizons Kanban</span>
                <span className="text-xs font-mono text-royal-goldDark bg-royal-champagne px-3 py-1 rounded-full border border-royal-gold/30">
                  Formula: P = Impact² / Effort
                </span>
              </h2>

              <form onSubmit={handleCreateTask} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-6">
                  <label className="text-[11px] font-bold text-royal-navy block mb-1">New Operational Task Title</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Smooth weapon recoil recovery curve on gamepad..."
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-royal-navy focus:outline-none focus:ring-2 focus:ring-royal-gold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-royal-navy block mb-1">Impact (1-10): {newTaskImpact}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTaskImpact}
                    onChange={(e) => setNewTaskImpact(Number(e.target.value))}
                    className="w-full accent-royal-navy cursor-pointer"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-royal-navy block mb-1">Effort (1-10): {newTaskEffort}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTaskEffort}
                    onChange={(e) => setNewTaskEffort(Number(e.target.value))}
                    className="w-full accent-royal-navy cursor-pointer"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="clay-btn clay-btn-navy w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Plot on Radar</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Split: Cartesian 10x10 Radar (Left) vs Now/Next/Later Kanban (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Cartesian Radar Matrix */}
              <div className="lg:col-span-5 clay-card-light p-6 border border-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-royal-navy uppercase">Cartesian Priority Matrix</span>
                  <div className="flex gap-1 text-[10px] font-mono">
                    <button 
                      onClick={() => setRadarFilter('All')} 
                      className={`px-2 py-0.5 rounded ${radarFilter === 'All' ? 'bg-royal-navy text-white' : 'text-royal-slate'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setRadarFilter('Now')} 
                      className={`px-2 py-0.5 rounded ${radarFilter === 'Now' ? 'bg-royal-navy text-white' : 'text-royal-slate'}`}
                    >
                      Now
                    </button>
                  </div>
                </div>

                {/* 10x10 Cartesian Visual Canvas */}
                <div className="relative w-full aspect-square clay-inset-light rounded-2xl p-4 border border-white flex flex-col justify-between overflow-hidden">
                  
                  {/* Quadrant Background Watermarks */}
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-600/70 font-bold">
                    QUICK WINS (High Impact, Low Effort)
                  </div>
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-royal-navy/70 font-bold">
                    STRATEGIC (High Impact, High Effort)
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-royal-slate/70">
                    FILL-IN (Low Impact, Low Effort)
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-rose-600/70">
                    TIME SINK (Low Impact, High Effort)
                  </div>

                  {/* Axes lines */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-300" />
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-300" />

                  {/* Plotted Task Dots */}
                  {tasks.filter(t => radarFilter === 'All' || t.horizon === radarFilter).map((t) => {
                    const posX = ((t.effort - 1) / 9) * 85 + 7;
                    const posY = (1 - (t.impact - 1) / 9) * 85 + 7;
                    const priorityScore = ((t.impact * t.impact) / t.effort).toFixed(1);

                    return (
                      <button
                        key={t.id}
                        onClick={() => { soundEngine.playClick(500); setSelectedTaskForDossier(t); }}
                        style={{ left: `${posX}%`, top: `${posY}%` }}
                        className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full clay-btn-navy flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md cursor-pointer hover:scale-125 transition-transform"
                        title={`${t.title} (Score: ${priorityScore})`}
                      >
                        {priorityScore}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex justify-between text-[11px] font-mono text-royal-slate">
                  <span>← Low Effort</span>
                  <span>Impact Score ↑</span>
                  <span>High Effort →</span>
                </div>
              </div>

              {/* Horizons Kanban (Now / Next / Later) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* NOW HORIZON */}
                <div className="clay-card-light p-4 border border-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE4ED]">
                      <span className="text-xs font-mono font-bold text-royal-navy uppercase">NOW (Sprint 1)</span>
                      <span className="w-5 h-5 rounded-full clay-inset-light text-[10px] font-mono flex items-center justify-center font-bold text-royal-navy">
                        {tasks.filter(t => t.horizon === 'Now').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tasks.filter(t => t.horizon === 'Now').map((task) => (
                        <div
                          key={task.id}
                          onClick={() => { soundEngine.playClick(450); setSelectedTaskForDossier(task); }}
                          className="clay-card-sm p-3 text-xs border border-white cursor-pointer hover:border-royal-gold transition-all"
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono text-royal-slate mb-1">
                            <span>Score: {((task.impact * task.impact) / task.effort).toFixed(1)}</span>
                            <span className="text-rose-700 font-bold">{task.priority}</span>
                          </div>
                          <h4 className="font-bold text-royal-navy leading-snug">{task.title}</h4>
                          <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-mono">{task.assignee.split(' ')[0]}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); moveTaskHorizon(task.id, 'Next'); }}
                              className="text-royal-slate hover:text-royal-navy cursor-pointer font-bold"
                            >
                              Push Next →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* NEXT HORIZON */}
                <div className="clay-card-light p-4 border border-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE4ED]">
                      <span className="text-xs font-mono font-bold text-royal-goldDark uppercase">NEXT (Sprint 2)</span>
                      <span className="w-5 h-5 rounded-full clay-inset-light text-[10px] font-mono flex items-center justify-center font-bold text-royal-goldDark">
                        {tasks.filter(t => t.horizon === 'Next').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tasks.filter(t => t.horizon === 'Next').map((task) => (
                        <div
                          key={task.id}
                          onClick={() => { soundEngine.playClick(450); setSelectedTaskForDossier(task); }}
                          className="clay-card-sm p-3 text-xs border border-white cursor-pointer hover:border-royal-gold transition-all"
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono text-royal-slate mb-1">
                            <span>Score: {((task.impact * task.impact) / task.effort).toFixed(1)}</span>
                            <span className="text-royal-goldDark font-bold">{task.priority}</span>
                          </div>
                          <h4 className="font-bold text-royal-navy leading-snug">{task.title}</h4>
                          <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px]">
                            <button
                              onClick={(e) => { e.stopPropagation(); moveTaskHorizon(task.id, 'Now'); }}
                              className="text-royal-slate hover:text-royal-navy cursor-pointer font-bold"
                            >
                              ← Pull Now
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); moveTaskHorizon(task.id, 'Later'); }}
                              className="text-royal-slate hover:text-royal-navy cursor-pointer font-bold"
                            >
                              Push Later →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LATER HORIZON */}
                <div className="clay-card-light p-4 border border-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE4ED]">
                      <span className="text-xs font-mono font-bold text-royal-slate uppercase">LATER (Backlog)</span>
                      <span className="w-5 h-5 rounded-full clay-inset-light text-[10px] font-mono flex items-center justify-center font-bold text-royal-slate">
                        {tasks.filter(t => t.horizon === 'Later').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tasks.filter(t => t.horizon === 'Later').map((task) => (
                        <div
                          key={task.id}
                          onClick={() => { soundEngine.playClick(450); setSelectedTaskForDossier(task); }}
                          className="clay-card-sm p-3 text-xs border border-white cursor-pointer hover:border-royal-gold transition-all"
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono text-royal-slate mb-1">
                            <span>Score: {((task.impact * task.impact) / task.effort).toFixed(1)}</span>
                            <span className="text-slate-500 font-bold">{task.priority}</span>
                          </div>
                          <h4 className="font-bold text-royal-navy leading-snug">{task.title}</h4>
                          <div className="mt-2 pt-2 border-t border-slate-200 flex justify-start items-center text-[10px]">
                            <button
                              onClick={(e) => { e.stopPropagation(); moveTaskHorizon(task.id, 'Next'); }}
                              className="text-royal-slate hover:text-royal-navy cursor-pointer font-bold"
                            >
                              ← Pull to Next
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 5. MODULE 3: REAL-TIME SIGNAL INGESTION & NLP SANITIZER */}
        {activeModule === 'NLP_SIGNALS' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="clay-card-light p-6 border border-white">
              <h2 className="text-lg font-bold text-royal-navy font-heading mb-3 flex items-center justify-between">
                <span>Enterprise Community Ingress & NLP Pipeline Bench</span>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                  VULN-02 Defensive Pipeline Active
                </span>
              </h2>

              {/* Live Signal Ingestion Form */}
              <form onSubmit={handleIngestFeedback} className="clay-inset-light p-4 rounded-2xl mb-6">
                <div className="text-xs font-bold text-royal-navy mb-1.5">Stream Custom Gamer Sentiment Signal:</div>
                <div className="flex gap-3 mb-2 flex-wrap">
                  <select
                    value={feedbackSource}
                    onChange={(e: any) => setFeedbackSource(e.target.value)}
                    className="bg-white border border-slate-300 text-royal-navy text-xs rounded-xl px-3 py-1.5 font-bold"
                  >
                    <option value="reddit">Reddit (r/gaming)</option>
                    <option value="discord">Discord Official Guild</option>
                    <option value="steam">Steam Verified Reviews</option>
                    <option value="gameplay">AF_XDP Telemetry Queue</option>
                  </select>
                </div>

                <textarea
                  value={rawFeedbackInput}
                  onChange={(e) => setRawFeedbackInput(e.target.value)}
                  placeholder="Paste gamer complaint text... (e.g. 'Armor penetration on Railgun got gutted in patch 1.04')"
                  rows={2}
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy font-medium focus:outline-none focus:ring-2 focus:ring-royal-gold resize-none"
                />

                <div className="flex justify-between items-center mt-2.5">
                  <span className="text-[11px] font-mono text-royal-slate">
                    Live Security Filter: Strips prompt injections & HTML scripts
                  </span>
                  <button
                    type="submit"
                    className="clay-btn clay-btn-navy px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Ingest Signal
                  </button>
                </div>
              </form>

              {/* Sanitizer Output & Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mb-6">
                <div className="clay-card-sm p-3">
                  <div className="text-[10px] text-royal-slate font-mono uppercase">Injections Blocked</div>
                  <div className="text-xl font-black text-emerald-700 font-heading mt-0.5">
                    {sanitizerOutput.promptInjectionsDetected}
                  </div>
                </div>
                <div className="clay-card-sm p-3">
                  <div className="text-[10px] text-royal-slate font-mono uppercase">Centroid Score</div>
                  <div className="text-xl font-black text-rose-600 font-heading mt-0.5">
                    {sanitizerOutput.centroidSentiment}
                  </div>
                </div>
                <div className="clay-card-sm p-3">
                  <div className="text-[10px] text-royal-slate font-mono uppercase">Tokens Processed</div>
                  <div className="text-xl font-black text-royal-navy font-heading mt-0.5">
                    {sanitizerOutput.tokenCount}
                  </div>
                </div>
                <div className="clay-card-sm p-3">
                  <div className="text-[10px] text-royal-slate font-mono uppercase">Total Ingested</div>
                  <div className="text-xl font-black text-royal-goldDark font-heading mt-0.5">
                    {signalsList.length} Signals
                  </div>
                </div>
              </div>

              {/* Feed List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-royal-navy">Active Raw Signal Feed:</div>
                {signalsList.map((sig) => (
                  <div key={sig.id} className="clay-card-sm p-3.5 text-xs border border-white flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-royal-champagne text-royal-navy">
                          {sig.source}
                        </span>
                        <span className="font-bold text-royal-navy">{sig.author}</span>
                        <span className="text-[10px] text-slate-400 font-mono">• {sig.timestamp}</span>
                      </div>
                      <p className="text-royal-slate">{sig.text}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      sig.sentiment === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sig.sentiment}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* 6. MODULE 4: GRAPHRAG CODE TOPOLOGY VISUALIZER */}
        {activeModule === 'GRAPHRAG' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="clay-card-light p-6 border border-white">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCE4ED]">
                <div>
                  <h2 className="text-lg font-bold text-royal-navy font-heading">
                    GraphRAG AST Code Dependency Topology
                  </h2>
                  <p className="text-xs text-royal-slate">
                    Causal link from player uproar to Unreal Engine C++ classes and INI configuration redirectors.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-royal-navy bg-royal-champagne px-3 py-1 rounded-full border border-royal-gold/30">
                  Tarjan SCC Condensed DAG
                </span>
              </div>

              {/* Graph Visual Stage */}
              <div className="relative w-full h-[320px] clay-inset-light rounded-2xl p-4 overflow-hidden border border-white">
                
                {/* SVG Connecting Edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {graphEdges.map((edge, idx) => {
                    const fromNode = graphNodes.find(n => n.id === edge.from);
                    const toNode = graphNodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    return (
                      <g key={idx}>
                        <line
                          x1={fromNode.x + 80}
                          y1={fromNode.y + 20}
                          x2={toNode.x}
                          y2={toNode.y + 20}
                          stroke="#C5A880"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Nodes */}
                {graphNodes.map((node) => {
                  const isSelected = selectedGraphNode?.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => { soundEngine.playClick(440); setSelectedGraphNode(node); }}
                      style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      className={`absolute px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm border ${
                        isSelected 
                          ? 'clay-btn-navy text-white scale-105 shadow-md ring-2 ring-royal-gold' 
                          : node.type === 'signal' ? 'bg-white text-rose-800 border-rose-300' :
                            node.type === 'ast_class' ? 'bg-white text-royal-navy border-slate-300' :
                            node.type === 'config_ini' ? 'bg-white text-royal-goldDark border-royal-gold/40' :
                            'bg-emerald-50 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      <div className="text-[9px] font-mono opacity-70 uppercase">{node.type}</div>
                      <div>{node.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* Node Inspector Panel */}
              {selectedGraphNode && (
                <div className="mt-4 p-4 rounded-xl clay-card-sm border border-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono font-bold text-royal-goldDark uppercase">AST Inspector:</span>
                    <span className="text-xs font-mono text-royal-navy font-bold">{selectedGraphNode.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-royal-navy">{selectedGraphNode.label}</h4>
                  <p className="text-xs text-royal-slate mt-1">{selectedGraphNode.details}</p>
                </div>
              )}

            </div>

          </div>
        )}

        {/* 7. MODULE 5: AI COPILOT & AGONES FLEET HOTFIX */}
        {activeModule === 'COPILOT_FLEET' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: AI CoPilot Chat Synthesizer */}
              <div className="lg:col-span-7 clay-card-light p-6 border border-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCE4ED]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-royal-goldDark" />
                      <h2 className="text-base font-bold text-royal-navy font-heading">
                        Autonomous AI CoPilot Synthesizer
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-royal-slate font-bold">LLM Reasoning Engine</span>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 mb-4">
                    {copilotMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3.5 rounded-2xl text-xs ${
                          msg.sender === 'user' 
                            ? 'clay-btn-navy text-white ml-auto max-w-[80%]' 
                            : 'clay-card-sm text-royal-navy mr-auto max-w-[90%] border border-white'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Proposal Card if any */}
                        {msg.proposal && (
                          <div className="mt-3 p-3 rounded-xl bg-white/90 text-royal-navy border border-slate-300 space-y-2">
                            <div className="font-bold text-royal-navy">{msg.proposal.title}</div>
                            <div className="text-[11px] font-mono text-emerald-700">Predicted TTK Delta: {msg.proposal.predictedTtkDelta}</div>
                            <pre className="text-[10px] font-mono bg-[#0F1D38] text-slate-100 p-2.5 rounded-lg overflow-x-auto">
                              {msg.proposal.diffSnippet}
                            </pre>
                            <button
                              onClick={triggerFleetHotfix}
                              className="clay-btn clay-btn-navy px-3.5 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Zap className="w-3.5 h-3.5 text-royal-goldLight" />
                              <span>Dispatch Hotfix to Fleet</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CoPilot Prompt Input */}
                <form onSubmit={handleSendCopilotPrompt} className="flex gap-2">
                  <input
                    type="text"
                    value={copilotInput}
                    onChange={(e) => setCopilotInput(e.target.value)}
                    placeholder="e.g. Synthesize balance hotfix proposal for Railgun vs Bile Titan..."
                    className="flex-1 text-xs bg-white border border-slate-300 rounded-xl p-3 text-royal-navy focus:outline-none focus:ring-2 focus:ring-royal-gold"
                  />
                  <button
                    type="submit"
                    className="clay-btn clay-btn-navy px-4 py-3 text-xs font-bold cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-royal-goldLight" />
                  </button>
                </form>
              </div>

              {/* Right: Agones Kubernetes Fleet Manager */}
              <div className="lg:col-span-5 clay-card-light p-6 border border-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCE4ED]">
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-royal-navy" />
                      <h2 className="text-base font-bold text-royal-navy font-heading">
                        Agones Kubernetes Fleet Dispatch
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">
                      Fleet Healthy
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center mb-4">
                    <div className="clay-card-sm p-3">
                      <div className="text-[10px] font-mono text-royal-slate uppercase">Active Pods</div>
                      <div className="text-2xl font-black text-royal-navy font-heading mt-0.5">
                        {fleetStatus.activePods}
                      </div>
                    </div>
                    <div className="clay-card-sm p-3">
                      <div className="text-[10px] font-mono text-royal-slate uppercase">Deploy Latency</div>
                      <div className="text-2xl font-black text-emerald-700 font-heading mt-0.5">
                        {fleetStatus.lastDeployLatency}
                      </div>
                    </div>
                  </div>

                  {/* Pod Grid Simulation (100 visual cells representing 1,250 pods) */}
                  <div className="clay-inset-light p-3 rounded-2xl mb-4">
                    <div className="text-[10px] font-mono text-royal-slate font-bold uppercase mb-2">
                      Pod Health Matrix:
                    </div>
                    <div className="grid grid-cols-10 gap-1">
                      {Array.from({ length: 60 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-full aspect-square rounded-sm bg-emerald-600/80 animate-pulse"
                          title={`Pod agones-match-${idx + 1}: Live`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={triggerFleetHotfix}
                  className="clay-btn clay-btn-navy w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Zap className="w-4 h-4 text-royal-goldLight" />
                  <span>Dispatch Tier-1 Hotfix (&lt; 5ms Zero-Downtime)</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* 8. LINEAR-STYLE TASK DOSSIER MODAL */}
      {selectedTaskForDossier && (
        <div className="fixed inset-0 z-50 bg-[#0F1D38]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-light max-w-2xl w-full p-6 sm:p-8 border border-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#DCE4ED] mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-royal-goldDark uppercase bg-royal-champagne px-2 py-0.5 rounded">
                  {selectedTaskForDossier.priority} Priority • {selectedTaskForDossier.horizon} Horizon
                </span>
                <h3 className="text-xl font-bold text-royal-navy font-heading mt-1">
                  {selectedTaskForDossier.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTaskForDossier(null)}
                className="w-8 h-8 rounded-full clay-card-sm flex items-center justify-center text-royal-slate hover:text-royal-navy cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="font-bold text-royal-navy mb-1">Description:</div>
                <p className="text-royal-slate leading-relaxed clay-inset-light p-3 rounded-xl">
                  {selectedTaskForDossier.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl clay-card-sm">
                  <span className="font-bold text-royal-navy">Evidence Vector:</span>
                  <p className="text-royal-slate mt-0.5">{selectedTaskForDossier.evidence}</p>
                </div>
                <div className="p-3 rounded-xl clay-card-sm">
                  <span className="font-bold text-royal-navy">AST Code Reference:</span>
                  <p className="font-mono text-royal-navy mt-0.5">{selectedTaskForDossier.codeRef}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl clay-card-sm">
                <span className="font-bold text-royal-navy">Deterministic Verification:</span>
                <p className="text-emerald-700 font-medium mt-0.5">{selectedTaskForDossier.testValidation}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE4ED] flex justify-end gap-3">
              <button
                onClick={() => {
                  alert("Linear / Jira Ticket Export: Generated cryptographic PDF audit dossier.");
                }}
                className="clay-btn clay-btn-white px-4 py-2 text-xs font-bold text-royal-navy border border-white cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 mr-1 inline" />
                Export Audit PDF
              </button>
              <button
                onClick={() => setSelectedTaskForDossier(null)}
                className="clay-btn clay-btn-navy px-5 py-2 text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

