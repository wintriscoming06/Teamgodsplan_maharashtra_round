import { Clip, AnalysisStage, TranscriptItem, RepurposedCard, Project } from '../types';

export const DEMO_VIDEO_INFO = {
  title: "The Future of Software Development",
  duration: "20:14",
  durationSeconds: 1214,
  fileSize: "1.4 GB",
  resolution: "4K UHD 60FPS",
  codec: "ProRes 422",
  recorded: "Today, 14:30 EST",
  speaker: "Elena Vance (Solo)",
  language: "English (US) • 320kbps",
  estimatedClips: "8-12 Viral Segments",
  description: "Deep-dive keynote exploring autonomous AI agents, ambient coding environments, and the death of traditional boilerplate engineering.",
  thumbnail: "/assets/media_1791040457019.png"
};

export const INITIAL_STAGES: AnalysisStage[] = [
  {
    id: 1,
    stageNum: "STAGE 01",
    name: "Uploading",
    status: "done",
    description: "100% completed • 1.4 GB original ProRes 422 proxy transferred via edge ingest.",
    metrics: "Edge Network: 840 MB/s",
    progress: 100
  },
  {
    id: 2,
    stageNum: "STAGE 02",
    name: "Extracting Audio",
    status: "done",
    description: "320kbps 48kHz pristine audio extracted • Multi-track voice isolation complete.",
    metrics: "SNR: +24dB isolated",
    progress: 100
  },
  {
    id: 3,
    stageNum: "STAGE 03",
    name: "Transcribing",
    status: "done",
    description: "Whisper v3 Large • 4,120 words captured across two primary speakers • 99.4% confidence score.",
    metrics: "Speed: 18x Realtime",
    progress: 100
  },
  {
    id: 4,
    stageNum: "STAGE 04",
    name: "Understanding Content",
    status: "done",
    description: "8 core themes identified • 14 semantic sub-topics indexed • Key argument arcs isolated.",
    metrics: "Semantic Cohesion: 96%",
    progress: 100
  },
  {
    id: 5,
    stageNum: "STAGE 05",
    name: "Finding Highlights",
    status: "in-progress",
    description: "Evaluating 19 candidate hook timestamps against TikTok & YouTube Shorts virality models.",
    metrics: "Live Scan: Model v4.8",
    progress: 78
  },
  {
    id: 6,
    stageNum: "STAGE 06",
    name: "Generating Clips",
    status: "queued",
    description: "Ready to render 5 high-converting vertical cuts (9:16) with automated kinetic typography captions.",
    metrics: "Batch Curation: 5 Clips",
    progress: 0
  }
];

export const TRANSCRIPT_ITEMS: TranscriptItem[] = [
  {
    id: 't-1',
    speaker: 'Elena Vance (Speaker 01)',
    speakerRole: 'Keynote Speaker',
    timeRange: '00:15 - 00:48',
    text: "Welcome back everyone. Today we are unpacking one of the biggest paradigm shifts in the tech landscape: what code synthesis actually means for senior developers."
  },
  {
    id: 't-2',
    speaker: 'Elena Vance',
    speakerRole: 'Keynote Speaker',
    timeRange: '04:32 - 05:18',
    text: "AI won't replace programmers — but programmers using AI will replace those who don't. It is about architectural bandwidth, not syntactic speed.",
    isViralCandidate: true,
    viralScore: 94,
    energySpike: "+88% dB",
    highlightWords: ["AI won't replace programmers", "programmers using AI will replace those who don't"]
  },
  {
    id: 't-3',
    speaker: 'David K. (Guest Speaker)',
    speakerRole: 'Systems Architect',
    timeRange: '08:15 - 08:52',
    text: "When you look at LLMs writing code, it's not about typing speed; it's about architecture. Junior engineers think prompt engineering is typing magic, but it's really distributed systems modeling."
  },
  {
    id: 't-4',
    speaker: 'Elena Vance',
    speakerRole: 'Keynote Speaker',
    timeRange: '14:10 - 15:02',
    text: "Syntax errors are obsolete. System logic design is the only game left. If you spend your time memorizing regex instead of understanding data flow, you're training for yesterday's battle."
  },
  {
    id: 't-5',
    speaker: 'Elena Vance',
    speakerRole: 'Keynote Speaker',
    timeRange: '17:22 - 18:04',
    text: "10x engineers aren't 10x faster at writing loops — they build autonomous feedback loops that test, iterate, and refine while they sleep."
  }
];

export const DEMO_CLIPS: Clip[] = [
  {
    id: 'clip-1',
    rank: 1,
    badge: '#1 HIGHEST RETENTION',
    title: "AI won't replace programmers.",
    timeRange: "04:32 – 05:18",
    durationSeconds: 46,
    score: 94,
    scoreTier: 'EXTREME',
    tags: ["Career & Tech Future", "Contrarian Take", "High Shareability"],
    hook: "AI won't replace programmers — but programmers using AI will replace those who don't.",
    wpm: 154,
    engineInsight: "Strong cold opening, standalone context and high information density. Immediate emotional tension drives initial 3-second hook rate to >82%.",
    recommendedPlatform: "Recommended for Instagram Reels & Shorts",
    aspectRatio: "9:16",
    transcriptSnippet: "AI won't replace programmers — but programmers using AI will replace those who don't. It is about architectural bandwidth, not syntactic speed."
  },
  {
    id: 'clip-2',
    rank: 2,
    badge: '#2 HIGH POTENTIAL',
    title: "Why Senior Engineers Write Less Code in 2025",
    timeRange: "08:15 – 09:00",
    durationSeconds: 45,
    score: 91,
    scoreTier: 'HIGH',
    tags: ["Engineering Productivity", "Dev Insights"],
    hook: "The best coders aren't typing 100 lines a minute anymore. They are orchestrating models.",
    wpm: 148,
    engineInsight: "High relatability hook with clear contrarian insight. Targets developer community debate; proven comment velocity booster.",
    recommendedPlatform: "Optimal for LinkedIn Developer Feed",
    aspectRatio: "9:16",
    transcriptSnippet: "When you look at LLMs writing code, it's not about typing speed; it's about architecture. Junior engineers think prompt engineering is typing magic, but it's really distributed systems modeling."
  },
  {
    id: 'clip-3',
    rank: 3,
    badge: '#3 BOOKMARK MAGNET',
    title: "The Death of Boilerplate Syntax",
    timeRange: "14:10 – 15:02",
    durationSeconds: 52,
    score: 88,
    scoreTier: 'GOOD',
    tags: ["Developer Mindset", "Architecture"],
    hook: "Syntax errors are obsolete. System logic design is the only game left.",
    wpm: 162,
    engineInsight: "Concise punchline format with high bookmark potential on LinkedIn and TikTok for educational saves.",
    recommendedPlatform: "High Save Rate on TikTok & X",
    aspectRatio: "9:16",
    transcriptSnippet: "Syntax errors are obsolete. System logic design is the only game left. If you spend your time memorizing regex instead of understanding data flow, you're training for yesterday's battle."
  },
  {
    id: 'clip-4',
    rank: 4,
    badge: '#4 TREND RIDER',
    title: "The 10x Engineer Transformation",
    timeRange: "17:22 – 18:04",
    durationSeconds: 42,
    score: 92,
    scoreTier: 'HIGH',
    tags: ["Future of Work", "Productivity Hacks"],
    hook: "10x engineers aren't 10x faster at writing loops — they build autonomous feedback loops.",
    wpm: 156,
    engineInsight: "Explosive opening with strong authority framing. Great retention through the 30-second mark.",
    recommendedPlatform: "Paced for TikTok High Retention",
    aspectRatio: "9:16",
    transcriptSnippet: "10x engineers aren't 10x faster at writing loops — they build autonomous feedback loops that test, iterate, and refine while they sleep."
  },
  {
    id: 'clip-5',
    rank: 5,
    badge: '#5 CONTRARIAN TAKE',
    title: "Why Junior Devs Are Learning the Wrong Skills",
    timeRange: "19:05 – 19:48",
    durationSeconds: 43,
    score: 87,
    scoreTier: 'GOOD',
    tags: ["Career Advice", "Education"],
    hook: "If your bootcamp is still teaching you React state syntax instead of agent orchestration, ask for a refund.",
    wpm: 150,
    engineInsight: "High controversy trigger generating 4.2x above average comment section engagement.",
    recommendedPlatform: "Debate-Driven for LinkedIn & Reels",
    aspectRatio: "9:16",
    transcriptSnippet: "If your bootcamp is still teaching you React state syntax instead of agent orchestration, ask for a refund. The abstraction layer just moved 3 levels higher."
  }
];

export const INITIAL_REPURPOSED_CARDS: RepurposedCard[] = [
  {
    id: 'rep-reel',
    platform: 'reel',
    platformName: 'Instagram Reel',
    title: 'The AI Replacement Myth 🤯 (Why devs are safer than you think)',
    caption: `Are developers actually getting replaced by AI in 2026? Here's the brutal truth from 10+ years building software.\n\nAI won't replace programmers — but programmers using AI will replace those who don't.\n\nKey takeaways:\n⚡ Syntax is commoditized; architectural intuition is king.\n⚡ Prompting is just distributed systems modeling in plain English.\n⚡ The real 10x engineers are building autonomous feedback loops.\n\nSave this reel for your next technical interview prep! 💾`,
    hashtags: ['#AI', '#SoftwareEngineering', '#TechCareers', '#CodingTips', '#DevCommunity', '#FullStack', '#FutureOfWork'],
    specs: '9:16 Vertical Video • 46s • High Engagement Hook',
    aspectRatio: '9:16'
  },
  {
    id: 'rep-short',
    platform: 'short',
    platformName: 'YouTube Short',
    title: 'AI won\'t replace programmers. (Here\'s who will) #Shorts',
    caption: `"AI won't replace programmers — but programmers using AI will replace those who don't."\n\nFull deep-dive keynote available on the main channel: "The Future of Software Development" (20:14). Subscribe for weekly engineering architecture breakdowns! 🔔`,
    hashtags: ['#Shorts', '#AI', '#Coding', '#Developer', '#TechNews', '#Programming'],
    specs: '9:16 Vertical • Loop Optimized • Audio Boosted',
    aspectRatio: '9:16'
  },
  {
    id: 'rep-linkedin',
    platform: 'linkedin',
    platformName: 'LinkedIn Post',
    title: 'Why AI will not replace senior software engineers',
    caption: `The conversation around AI replacing developers fundamentally misunderstands what engineering actually is.\n\nWriting code was never the bottleneck.\n\nThe real job has always been:\n1. Translating ambiguous business problems into verifiable state machines\n2. Designing resilient distributed data boundaries\n3. Ensuring fault-tolerant rollback capabilities\n\nAI won't replace programmers — but programmers using AI will quickly replace those who don't.\n\nWhat skills are you actively upgrading this quarter? Let's discuss in the comments below. 👇`,
    hashtags: ['#SoftwareEngineering', '#ArtificialIntelligence', '#Leadership', '#TechInnovation', '#CareerGrowth'],
    specs: '1:1 Square Card / PDF Carousel Support • Professional Tone',
    aspectRatio: '1:1'
  },
  {
    id: 'rep-x',
    platform: 'x',
    platformName: 'X Post (Twitter)',
    title: 'Thread starter: The AI Developer Paradigm',
    caption: `AI won't replace programmers.\n\nBut programmers using AI will replace those who don't.\n\nSyntax errors are obsolete. System logic design is the only game left in town.\n\n5 things senior engineers do differently today (and how to survive): 🧵👇`,
    hashtags: ['#buildinpublic', '#devs', '#AIagents'],
    specs: '242/280 Characters • Optimized for Quote RTs',
    characterLimit: 280,
    aspectRatio: '16:9'
  },
  {
    id: 'rep-yt-desc',
    platform: 'youtube_desc',
    platformName: 'YouTube Description',
    title: 'The Future of Software Development (Keynote 2026) — Elena Vance',
    caption: `In this keynote, Elena Vance breaks down how autonomous AI coding agents, ambient development environments, and LLM-assisted workflows are redefining what it means to be a software engineer in 2026.\n\n⏱️ TIMESTAMPS:\n00:00 - Introduction & The Current State of AI\n04:32 - The AI Replacement Myth (Programmer vs Tool)\n08:15 - Why Senior Engineers Write Less Code\n14:10 - The Death of Boilerplate Syntax\n17:22 - The Autonomous Feedback Loop (10x Engineer)\n19:05 - The Critical Skills Bootcamps Aren't Teaching\n\n🔗 RESOURCES MENTIONED:\n- CreatorAI Suite: https://creatorai.internal\n- Full Transcript & Slide Deck: https://elenacreates.dev/keynote-2026\n\n#SoftwareDevelopment #ArtificialIntelligence #ElenaVance #TechKeynote`,
    hashtags: ['#SoftwareDevelopment', '#ArtificialIntelligence', '#ElenaVance', '#TechKeynote'],
    specs: 'Longform SEO Optimized • 1,240 Characters • Chapters Included',
    aspectRatio: '16:9'
  }
];

export const RECENT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Future of Software Development',
    format: 'Uploaded 2 hours ago • 4K ProRes',
    duration: '20 min 14 sec',
    status: 'Ready',
    statusDetail: 'Ready (7 Clips)',
    clipsCount: 7,
    repurposedSummary: '12 Multi-Posts (7 Shorts, 3 X Threads, 2 Blogs)',
    thumbnail: '/assets/media_1791040457019.png',
    timeAgo: '2h ago'
  },
  {
    id: 'proj-2',
    title: 'How To Build AI Apps in 1 Hour',
    format: 'Transcribing • Whisper Engine v3',
    duration: '34 min 10 sec',
    status: 'Processing',
    statusDetail: 'Processing 84%',
    clipsCount: 5,
    repurposedSummary: '5 Clips Identified: Extracting hooks & B-rolls',
    thumbnail: '/assets/media_1791040473592.png',
    timeAgo: '4h ago'
  },
  {
    id: 'proj-3',
    title: 'Podcast Ep #42: Solo Founder P...',
    format: 'Fully Distributed • Spotify & Apple',
    duration: '52 min 19 sec',
    status: 'Published',
    statusDetail: 'Published',
    clipsCount: 12,
    repurposedSummary: '22 Posts Live: 184.2k aggregate views',
    thumbnail: '/assets/media_1791040204833.png',
    timeAgo: 'Yesterday'
  }
];

export const PIPELINE_DATA = {
  ideas: [
    { title: "Future of Agentic AI...", trend: "9.2 Trend" },
    { title: "Why 99% of podcasts fail...", trend: "8.7 Trend" }
  ],
  scripting: [
    { title: "Devin vs Real Engineers...", hooks: "3 Hooks Gen" }
  ],
  editing: [
    { title: "The Future of Software Dev", progress: "82%", masterTime: "20:14 master" }
  ],
  ready: [
    { title: "\"AI won't replace...\"", viralScore: "99 Viral" },
    { title: "\"Coding in 2026: Agent...\"", viralScore: "94 Viral" }
  ],
  published: [
    { title: "How I scaled to 100k with...", views: "34.2k views" }
  ]
};

export const SEMANTIC_TOPICS = [
  "#ArtificialIntelligence",
  "#SoftwareEngineering",
  "#FutureOfWork",
  "#LLMs",
  "#CareerAdvice"
];

export const VIRAL_SPIKE_POINTS = [
  { time: "00:00", value: 20 },
  { time: "02:15", value: 35 },
  { time: "04:32", value: 94, isPeak: true, label: "04:32 ★" },
  { time: "06:10", value: 40 },
  { time: "08:15", value: 91, isPeak: true, label: "08:15" },
  { time: "11:00", value: 45 },
  { time: "13:40", value: 82, isPeak: true, label: "13:40" },
  { time: "15:30", value: 50 },
  { time: "17:22", value: 92, isPeak: true, label: "17:22 ★" },
  { time: "19:05", value: 87, isPeak: true, label: "19:05" },
  { time: "20:14", value: 30 }
];
