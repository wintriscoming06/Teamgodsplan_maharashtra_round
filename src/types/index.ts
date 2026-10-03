export type NavRoute = 
  | 'dashboard'
  | 'content-studio'
  | 'ai-clip-studio'
  | 'ai-editor'
  | 'repurpose-studio'
  | 'script-generator'
  | 'asset-library'
  | 'analytics';

export type WorkflowStep = 
  | 'upload'
  | 'analyze'
  | 'clips'
  | 'edit'
  | 'repurpose';

export type StageStatus = 'done' | 'in-progress' | 'queued';

export interface AnalysisStage {
  id: number;
  stageNum: string;
  name: string;
  status: StageStatus;
  description: string;
  metrics: string;
  progress?: number;
}

export interface TranscriptItem {
  id: string;
  speaker: string;
  speakerRole?: string;
  timeRange: string;
  text: string;
  isViralCandidate?: boolean;
  viralScore?: number;
  energySpike?: string;
  highlightWords?: string[];
}

export interface Clip {
  id: string;
  rank: number;
  badge: string;
  title: string;
  timeRange: string;
  durationSeconds: number;
  score: number;
  scoreTier: 'EXTREME' | 'HIGH' | 'GOOD';
  tags: string[];
  hook: string;
  wpm: number;
  engineInsight: string;
  recommendedPlatform: string;
  aspectRatio: string;
  thumbnailUrl?: string;
  transcriptSnippet: string;
}

export interface EditorSettings {
  removeSilence: boolean;
  generateCaptions: boolean;
  highlightKeywords: boolean;
  convertTo916: boolean;
  aspectRatio: '9:16' | '16:9' | '1:1';
  dynamicCaptions: boolean;
  captionStyle: 'kinetic' | 'boxed' | 'classic' | 'neon';
  smartZoom: boolean;
  backgroundMusic: boolean;
  musicTrack: string;
  musicVolume: number;
  customCaptions: string;
}

export interface RepurposedCard {
  id: string;
  platform: 'reel' | 'short' | 'linkedin' | 'x' | 'youtube_desc';
  platformName: string;
  title: string;
  caption: string;
  hashtags: string[];
  specs: string;
  extraInfo?: string;
  aspectRatio: string;
  characterLimit?: number;
}

export interface Project {
  id: string;
  title: string;
  format: string;
  duration: string;
  status: 'Ready' | 'Processing' | 'Published';
  statusDetail: string;
  clipsCount: number;
  repurposedSummary: string;
  thumbnail: string;
  timeAgo: string;
}
