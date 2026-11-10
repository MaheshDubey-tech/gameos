export interface PlayerSignal {
  id: string;
  source: 'reddit' | 'discord' | 'steam' | 'gameplay';
  author: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'critical';
  text: string;
  upvotes: number;
  timestamp: string;
}

export interface PlayerArchetype {
  id: string;
  name: string;
  share: number;
  sentimentScore: number;
  churnRisk: number;
  primaryMotivation: string;
  predictedReaction: string;
  avatarColor: string;
}

export interface BacklogRecommendation {
  id: string;
  title: string;
  category: 'Monetization' | 'Progression' | 'Weapon Balance' | 'Retention Loop' | 'Live Event';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  impactMetric: string;
  devTimeSaved: string;
  solution: string;
  riskAvoided: string;
}

export interface GamePreset {
  id: string;
  name: string;
  genre: string;
  studio: string;
  status: string;
  signalsCount: number;
  initialSentiment: number;
  sampleSignals: PlayerSignal[];
  archetypes: PlayerArchetype[];
  recommendations: BacklogRecommendation[];
  isCustom?: boolean;
  platform?: string;
  engine?: string;
  monetizationModel?: string;
  stage?: string;
}

// Features from mohammad7210/GameOS.git
export interface CombatSimParams {
  weapon: string;
  target: string;
  distance: number;
  damage: number;
  falloff: number;
  armorPen: number;
  ping: number;
}

export interface CombatSimResult {
  ttkSeconds: number;
  winratePct: number;
  headshotPct: number;
  entropyScore: number;
  latencyMs: number;
  corridorBreach: boolean;
  traceLogs: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  source: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'To Do' | 'In Review' | 'Completed';
  horizon: 'Now' | 'Next' | 'Later';
  impact: number; // 1-10
  effort: number; // 1-10
  assignee: string;
  description: string;
  evidence: string;
  codeRef: string;
  testValidation: string;
  tags: string[];
  updated: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'signal' | 'ast_class' | 'config_ini' | 'sim_result' | 'hotfix';
  x: number;
  y: number;
  details: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  proposal?: {
    title: string;
    targetWeapon: string;
    diffSnippet: string;
    predictedTtkDelta: string;
  };
}
