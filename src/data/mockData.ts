import { GamePreset, TaskItem, GraphNode, GraphEdge, CombatSimParams } from '../types';

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Fix AI pathfinding stuck in corridor choke points",
    source: "Player Feedback (Reddit)",
    priority: "High",
    status: "In Progress",
    horizon: "Now",
    impact: 9,
    effort: 3,
    assignee: "Studio Lead",
    description: "Enemies frequently get trapped behind navmesh geometry near rock corridors in Desert Biome. Requires regenerating RecastNavMesh tile bounds and adding dynamic obstacle avoidance weights.",
    evidence: "Reddit thread #842 (4.2k upvotes): 'Automaton hulks get locked into infinite spin loops when crossing bridges in Sector 4.'",
    codeRef: "Source/Game/AI/EnemyPathfindingComponent.cpp:L142",
    testValidation: "Test Suite #4827: Navmesh stress test passed 94.8%",
    tags: ["AI", "Pathfinding", "P0", "NavMesh"],
    updated: "2h ago"
  },
  {
    id: "task-2",
    title: "Optimize texture streaming & VRAM footprint in 4K",
    source: "Telemetry Cluster",
    priority: "Medium",
    status: "To Do",
    horizon: "Next",
    impact: 7,
    effort: 4,
    assignee: "Mahesh (Systems Architect)",
    description: "VRAM footprint spikes above 10.4 GB on 4K ultra settings during dense particle explosions. Downscale non-critical MipMaps and stream weapon normal maps via Zen Store.",
    evidence: "Telemetry alert TelemetryVector_VRAM_Exceeded triggered in 18% of client sessions.",
    codeRef: "Config/DefaultEngine.ini [SystemSettings] r.Streaming.PoolSize=3500",
    testValidation: "Automated Memory Profiler: Pending benchmark run",
    tags: ["Engine", "VRAM", "Streaming", "ZenStore"],
    updated: "4h ago"
  },
  {
    id: "task-3",
    title: "Projectile collision deflection edge cases on sloped armor",
    source: "Steam Community",
    priority: "Critical",
    status: "In Progress",
    horizon: "Now",
    impact: 10,
    effort: 4,
    assignee: "Taha (Physics Lead)",
    description: "Certain projectile angles against sloped heavy armor deflect erroneously without registering deflection physics materials or triggering ricochet audio.",
    evidence: "Steam review clip: 'Railgun shots bounce off 35-degree carapace plate doing 0 damage instead of expected penetration.'",
    codeRef: "Source/Game/Weapons/BaseWeapon.h & ArmorPenetrationComponent.cpp:L88",
    testValidation: "RACK Deterministic Simulation: 10,000 raycasts verified with 99.2% accuracy",
    tags: ["Physics", "Combat", "ArmorPen", "RACK"],
    updated: "1d ago"
  },
  {
    id: "task-4",
    title: "Add 8 discrete footstep surface sound variations",
    source: "Audio Team",
    priority: "Low",
    status: "To Do",
    horizon: "Later",
    impact: 4,
    effort: 2,
    assignee: "Riya (Sound PM)",
    description: "Add 8 discrete audio surface variations for metallic grates, snowy mud, and molten slag to improve tactical acoustic awareness in competitive matches.",
    evidence: "Sound Design backlog audit item #109; referenced in Audio Immersion design brief v2.",
    codeRef: "Content/Audio/PhysicalMaterials/PM_MetalGrate_SoundCue.uasset",
    testValidation: "Audio concurrency test: Zero voice dropouts",
    tags: ["Audio", "Wwise", "Immersion"],
    updated: "2d ago"
  },
  {
    id: "task-5",
    title: "Dynamic Pelican extraction surge event drops",
    source: "RACK AI Synthesizer",
    priority: "Critical",
    status: "Completed",
    horizon: "Now",
    impact: 10,
    effort: 2,
    assignee: "Arrowhead Squad",
    description: "Inject dynamic high-tier reinforcement supplies near extraction beacon with scarcity mechanics to prevent late-match beacon fatigue.",
    evidence: "Telemetry: Eliminates 34% early match abandonment; praised by Heather Chandler (Arrowhead Principal Producer).",
    codeRef: "Source/Game/Events/PelicanDropSystem.cpp",
    testValidation: "Live Ops Canary: +30% DAU boost recorded",
    tags: ["LiveOps", "Helldivers", "Retention", "Validated"],
    updated: "Verified"
  }
];

export const WEAPON_PRESETS: { [key: string]: CombatSimParams } = {
  "RS-422 Railgun": {
    weapon: "RS-422 Railgun",
    target: "Bile Titan",
    distance: 35,
    damage: 600,
    falloff: 65,
    armorPen: 6,
    ping: 28
  },
  "AC-8 Autocannon": {
    weapon: "AC-8 Autocannon",
    target: "Automaton Hulk",
    distance: 45,
    damage: 260,
    falloff: 80,
    armorPen: 4,
    ping: 32
  },
  "SG-225 Breaker": {
    weapon: "SG-225 Breaker",
    target: "Charger",
    distance: 12,
    damage: 330,
    falloff: 20,
    armorPen: 2,
    ping: 24
  },
  "AR-23 Liberator": {
    weapon: "AR-23 Liberator",
    target: "Devastator",
    distance: 25,
    damage: 60,
    falloff: 40,
    armorPen: 2,
    ping: 30
  }
};

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  { id: "sig-1", label: "Reddit: Railgun Nerf Backlash", type: "signal", x: 60, y: 80, details: "Community thread with 4.8k comments protesting armor damage reduction." },
  { id: "sig-2", label: "Steam: Bile Titan Impasse", type: "signal", x: 60, y: 190, details: "Reviews reporting inability to kill Bile Titans without coordinated stratagems." },
  { id: "code-1", label: "BaseWeapon.h", type: "ast_class", x: 260, y: 60, details: "Core weapon base class defining penetration tiers and damage falloff curves." },
  { id: "code-2", label: "ArmorPenetrationComponent.cpp", type: "ast_class", x: 260, y: 160, details: "Deterministic calculation for deflection angles and heavy armor resistance." },
  { id: "ini-1", label: "DefaultGame.ini [CombatSettings]", type: "config_ini", x: 260, y: 260, details: "Live-configurable weapon balance constants and falloff multipliers." },
  { id: "sim-1", label: "10k Match Q32.32 Sim", type: "sim_result", x: 470, y: 110, details: "Headless Monte Carlo simulation: TTK stabilized at 4.2s (Design DNA Corridor compliant)." },
  { id: "fleet-1", label: "Agones Fleet Hotfix <5ms", type: "hotfix", x: 470, y: 230, details: "Live zero-downtime hotfix dispatched to 1,250 pods with zero server restart." }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  { from: "sig-1", to: "code-2", label: "maps to" },
  { from: "sig-2", to: "code-1", label: "maps to" },
  { from: "code-1", to: "ini-1", label: "configured by" },
  { from: "code-2", to: "sim-1", label: "verified in" },
  { from: "ini-1", to: "sim-1", label: "input into" },
  { from: "sim-1", to: "fleet-1", label: "deployed via" }
];

export const GAME_PRESETS: GamePreset[] = [
  {
    id: 'helldivers2',
    name: 'Helldivers II: Pelican & Warbond Drop',
    genre: 'Co-op Extraction Shooter',
    studio: 'Arrowhead Game Studios',
    status: 'Case Study Validated',
    signalsCount: 14250,
    initialSentiment: 68,
    sampleSignals: [
      {
        id: 'sig-1',
        source: 'reddit',
        author: 'u/DemocracyBringer',
        sentiment: 'critical',
        text: 'The weapon nerf in the new patch breaks implicit promise of co-op power fantasy. Fix the armor pen!',
        upvotes: 4210,
        timestamp: '14m ago'
      },
      {
        id: 'sig-2',
        source: 'discord',
        author: 'VanguardCadet#8812',
        sentiment: 'negative',
        text: 'Pelican extraction timing feels unfair when bile titans spawn directly on landing pad without warning.',
        upvotes: 890,
        timestamp: '32m ago'
      },
      {
        id: 'sig-3',
        source: 'steam',
        author: 'FreedomFighter99',
        sentiment: 'positive',
        text: 'The new environmental hazard fire effects look stunning, but Warbond progression is starting to feel grindy.',
        upvotes: 1540,
        timestamp: '1h ago'
      },
      {
        id: 'sig-4',
        source: 'gameplay',
        author: 'Telemetry-Cluster-EU',
        sentiment: 'critical',
        text: 'Telemetry anomaly: 34% early match abandonment when extraction beacon timer exceeds 3 minutes under swarm conditions.',
        upvotes: 9999,
        timestamp: 'Live'
      }
    ],
    archetypes: [
      {
        id: 'arch-1',
        name: 'The Tactician Grinder',
        share: 38,
        sentimentScore: 74,
        churnRisk: 18,
        primaryMotivation: 'Optimized weapon synergy & milestone unlock speed',
        predictedReaction: 'High conversion to optional Platinum Warbond fast-tracks if rewards feel earned rather than pay-to-win.',
        avatarColor: '#0F1D38'
      },
      {
        id: 'arch-2',
        name: 'The Co-op Socialite',
        share: 34,
        sentimentScore: 82,
        churnRisk: 12,
        primaryMotivation: 'Hilarious emergent chaos with friends & squad survivability',
        predictedReaction: 'Extended session length (+24%) during dynamic Pelican event drops with shared squad cosmetics.',
        avatarColor: '#C5A880'
      },
      {
        id: 'arch-3',
        name: 'The Lore & Galactic War Patriot',
        share: 18,
        sentimentScore: 91,
        churnRisk: 8,
        primaryMotivation: 'Major Order community progression & galactic map shifts',
        predictedReaction: 'Massive organic advocacy on Reddit/X when planetary defense directives have clear narrative stakes.',
        avatarColor: '#10B981'
      },
      {
        id: 'arch-4',
        name: 'The Casual Weekend Recruit',
        share: 10,
        sentimentScore: 61,
        churnRisk: 39,
        primaryMotivation: 'Low-friction fun without steep punishing grind',
        predictedReaction: 'Risk of early abandonment if difficulty spikes are unresolved at difficulty 6+.',
        avatarColor: '#F59E0B'
      }
    ],
    recommendations: [
      {
        id: 'rec-1',
        title: 'Dynamic Pelican Extraction Surge Drops',
        category: 'Live Event',
        priority: 'CRITICAL',
        impactMetric: '+30% DAU / Session length +25 min',
        devTimeSaved: 'Event deployed in 1 day vs 2-3 week cycle (80% cost reduction)',
        solution: 'Inject random high-tier reinforcement supplies near extraction with scarcity mechanics and limited-time cosmetics.',
        riskAvoided: 'Prevents 34% drop-off during late-match beacon defense fatigue.'
      },
      {
        id: 'rec-2',
        title: '15-Piece Extended Milestone Warbond Pacing',
        category: 'Retention Loop',
        priority: 'HIGH',
        impactMetric: '15-22% ARPPU increase & 18-20% conversion uplift',
        devTimeSaved: 'Pre-validated telemetry saves 4 weeks of tuning iterations',
        solution: 'Structure battle-pass tier progression with alternating cosmetic and functional rewards with transparent currency accrual.',
        riskAvoided: 'Prevents review-bomb backlash over perceived aggressive monetization.'
      },
      {
        id: 'rec-3',
        title: 'Implicit Promise Armor Penetration Buffs',
        category: 'Weapon Balance',
        priority: 'HIGH',
        impactMetric: '94% Community Trust Accuracy score restored',
        devTimeSaved: 'Saves estimated $4.2M in avoided player churn',
        solution: 'Rebalance heavy weapons to preserve power fantasy against armored units while increasing horde volume.',
        riskAvoided: 'Reverses negative sentiment spiral in Discord and Reddit.'
      }
    ]
  },
  {
    id: 'concord',
    name: 'Sony Concord: Disaster Post-Mortem & Fix',
    genre: '5v5 Hero Shooter',
    studio: 'Firewalk Studios / PlayStation',
    status: 'Industry Crisis Example',
    signalsCount: 38400,
    initialSentiment: 23,
    sampleSignals: [
      {
        id: 'sig-c1',
        source: 'reddit',
        author: 'u/HeroShooterVet',
        sentiment: 'critical',
        text: 'Why would anyone pay $40 upfront for a genre dominated by free-to-play giants with 10x the content?',
        upvotes: 12500,
        timestamp: 'Post-launch'
      },
      {
        id: 'sig-c2',
        source: 'steam',
        author: 'SteamCuratorPro',
        sentiment: 'critical',
        text: 'Player count peaked below 700 concurrent players. Character designs do not resonate with the core target audience.',
        upvotes: 8700,
        timestamp: 'Day 3'
      }
    ],
    archetypes: [
      {
        id: 'arch-c1',
        name: 'The Free-to-Play Competitive Main',
        share: 52,
        sentimentScore: 19,
        churnRisk: 94,
        primaryMotivation: 'Ranked ladders, prestige skins, high population pools',
        predictedReaction: 'Zero adoption at $40 paywall. Total rejection without F2P on-ramp.',
        avatarColor: '#EF4444'
      },
      {
        id: 'arch-c2',
        name: 'The Character/Lore Loyalist',
        share: 26,
        sentimentScore: 34,
        churnRisk: 78,
        primaryMotivation: 'Expressive charismatic hero identities & cutscenes',
        predictedReaction: 'Alienated by lack of strong iconic visual silhouettes and disparate weekly vignette storytelling.',
        avatarColor: '#C5A880'
      }
    ],
    recommendations: [
      {
        id: 'rec-c1',
        title: 'Emergency Transition to F2P with Founder Battle Pass',
        category: 'Monetization',
        priority: 'CRITICAL',
        impactMetric: '10x Matchmaking pool expansion',
        devTimeSaved: 'Could have saved Sony $400M write-down if pre-validated in pre-production',
        solution: 'Pivot immediately to free-to-play with exclusive cosmetic legacy rewards for original purchasers.',
        riskAvoided: 'Averts total game shutdown and studio closure.'
      }
    ]
  },
  {
    id: 'suicidesquad',
    name: 'Suicide Squad: Kill the Justice League',
    genre: 'Live-Service Looter Shooter',
    studio: 'Rocksteady / WB Games',
    status: '$200M Loss Pre-Mortem',
    signalsCount: 42100,
    initialSentiment: 28,
    sampleSignals: [
      {
        id: 'sig-s1',
        source: 'reddit',
        author: 'u/ArkhamKnightFan',
        sentiment: 'critical',
        text: 'Rocksteady spent 8 years to turn Batman Arkham legendary free-flow combat into generic floating guns with purple weak spots.',
        upvotes: 18400,
        timestamp: 'Review'
      }
    ],
    archetypes: [
      {
        id: 'arch-s1',
        name: 'The Arkham Single-Player Purist',
        share: 48,
        sentimentScore: 21,
        churnRisk: 92,
        primaryMotivation: 'Deep narrative, Batman mythos, hand-to-hand mastery',
        predictedReaction: 'Violent rejection of repetitive live-service gear grind and disrespectful narrative beats.',
        avatarColor: '#EF4444'
      }
    ],
    recommendations: [
      {
        id: 'rec-s1',
        title: 'Hero-Specific Melee & Traversal Specialization',
        category: 'Weapon Balance',
        priority: 'CRITICAL',
        impactMetric: '+85% Combat satisfaction rating',
        devTimeSaved: 'Prevents 18% WB stock decline ($200M direct loss)',
        solution: 'Replace homogenous gunplay with character-defining kits: Boomerang melee agility, King Shark brutality, Deadshot pinpoint snipes.',
        riskAvoided: 'Halts 92% Day-30 retention collapse.'
      }
    ]
  }
];

export const CRISIS_FAILURES_2024 = [
  {
    name: 'Sony Concord',
    studio: 'Firewalk Studios',
    stockImpact: '-12% Stock Drop',
    financialLoss: '$400M Loss',
    cause: 'Speed over accuracy, ignored player psychology, $40 paywall in saturated F2P market',
    retention: 'Offline in 14 days (<700 CCU)'
  },
  {
    name: 'WB Games Suicide Squad',
    studio: 'Rocksteady',
    stockImpact: '-18% Stock Drop',
    financialLoss: '$200M Loss',
    cause: 'Forced live-service onto single-player pedigree, generic looter mechanics',
    retention: '92% player drop-off by Day 30'
  },
  {
    name: 'Ubisoft Skull & Bones',
    studio: 'Ubisoft Singapore',
    stockImpact: '-22% Stock Drop',
    financialLoss: '$120M Loss',
    cause: '$70 "AAAA" claim vs shallow gameplay loop and endless development hell',
    retention: 'Stagnant content & community backlash'
  }
];

export const RACK_STEPS = [
  {
    num: 1,
    title: 'Signal Input',
    sub: 'Capture the chaos',
    icon: 'Radio',
    color: '#0F1D38',
    items: ['Social chatter (Reddit, X)', 'Gameplay logs & telemetry', 'Community feedback (Discord)', 'In-game player behavior']
  },
  {
    num: 2,
    title: 'AI Analysis',
    sub: 'Find the patterns',
    icon: 'Cpu',
    color: '#C5A880',
    items: ['Pattern recognition', 'Sentiment analysis', 'Behavioral modeling', 'Prediction engine']
  },
  {
    num: 3,
    title: 'Strategic Clarity',
    sub: 'Know what to do',
    icon: 'Compass',
    color: '#0F1D38',
    items: ['Feature priorities', 'Risk assessment', 'Player personas', 'Action plans']
  },
  {
    num: 4,
    title: 'Implement',
    sub: 'Execute right',
    icon: 'Wrench',
    color: '#10B981',
    items: ['Build what matters', 'Avoid waste & rework', 'Align cross-functional teams', 'Deploy & iterate safely']
  },
  {
    num: 5,
    title: 'Business Impact',
    sub: 'Measurable results',
    icon: 'TrendingUp',
    color: '#C5A880',
    items: ['15-22% Revenue uplift', '+30% Player retention', '80% Faster dev speed', '94% Community trust']
  }
];

export const PARTNERSHIP_TIERS = [
  {
    id: 'feature',
    title: 'Feature-Focused Simulation',
    subtitle: 'Surgical Intervention',
    timeline: '2–4 weeks',
    tag: '$',
    bestFor: 'De-risking specific, high-stakes content drops and achieving quick, measurable wins in design and player sentiment.',
    deliverables: [
      'Risk assessment matrix',
      'Player response predictions',
      'Design optimization recommendations',
      'Telemetry pre-validation'
    ],
    highlight: 'Ideal for Upcoming Battle Pass or Weapon Rebalance'
  },
  {
    id: 'domain',
    title: 'Domain-Scoped Deep Dive',
    subtitle: 'Targeted Systemic Improvement',
    timeline: '12–24 weeks',
    tag: '$$',
    bestFor: 'Fixing broken player progression loops, redesigning underperforming monetization systems, or resolving core narrative-gameplay conflicts.',
    deliverables: [
      'Full system architecture analysis',
      'Redesign recommendations & specs',
      'Implementation roadmap with milestones',
      'KPI optimization & monetization modeling',
      'Player psychology mapping'
    ],
    highlight: 'Most Popular for Mid-Sized Live Services',
    popular: true
  },
  {
    id: 'retainer',
    title: 'Strategic Operations Retainer',
    subtitle: 'Full-Spectrum Partnership',
    timeline: '1 year to ∞',
    tag: '$$$ PREMIUM',
    bestFor: 'Studios managing high-stakes live-service titles requiring constant market intelligence and player behavior prediction.',
    deliverables: [
      'Everything in Feature + Domain tiers',
      'Continuous sentiment monitoring (24/7)',
      'Real-time trend & exploit alerts',
      'Monthly strategic executive briefings',
      'Quarterly roadmap optimization',
      'Dedicated GameOS PM Architect squad'
    ],
    highlight: 'Embedded Foresight Division for AAA Studios'
  }
];

export const TEAM_MEMBERS = [
  { name: 'Mahesh Dubey', role: 'Systems Architecture & PM Strategy', org: 'GameOS Co-Founder' },
  { name: 'Riya Sharma', role: 'Cognitive Simulation & Behavioral Modeling', org: 'GameOS Co-Founder' },
  { name: 'Team Member', role: 'Live-Service Operations & Signal Intelligence', org: 'GameOS Co-Founder' },
  { name: 'Mohammad Taha Kazi', role: 'Telemetry Analytics & GTM Engineering', org: 'GameOS Co-Founder' }
];
