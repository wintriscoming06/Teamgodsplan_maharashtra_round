import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Link as LinkIcon, 
  Plus, 
  ArrowUpRight, 
  Rocket, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  Play, 
  Filter, 
  Clock, 
  CheckCircle, 
  RefreshCw,
  Eye,
  Share2
} from 'lucide-react';
import { PIPELINE_DATA, RECENT_PROJECTS } from '../../data/mockData';
import { NavRoute, WorkflowStep } from '../../types';
import { useToast } from '../common/Toast';

interface DashboardViewProps {
  userName?: string;
  onStartWorkflow: (step?: WorkflowStep) => void;
  onNavigate: (route: NavRoute) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ userName = 'Creator', onStartWorkflow, onNavigate }) => {
  const { showToast } = useToast();
  const [showImportModal, setShowImportModal] = useState(false);
  const [importUrl, setImportUrl] = useState('');

  const firstName = userName.trim().split(' ')[0] || 'Creator';

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) {
      showToast("Please enter a valid video link", "error");
      return;
    }
    setShowImportModal(false);
    showToast("Importing stream metadata: " + importUrl, "info");
    onStartWorkflow('analyze');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          {/* Autonomous Mode Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>AUTONOMOUS MODE ACTIVE</span>
            <span className="text-slate-400">v4.8.2-engine</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Here's what your AI engine synthesized while you were offline. Ready to repurpose your latest stream into high-conversion micro-content?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141824] hover:bg-[#1a2030] border border-[#263047] text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <LinkIcon className="w-4 h-4 text-cyan-400" />
            <span>Import YouTube URL</span>
          </button>

          <button
            onClick={() => onStartWorkflow('upload')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-glow-purple transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Repurpose New Video</span>
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          </button>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Content */}
        <div className="bg-[#121520] border border-[#1f2538] hover:border-[#2a344d] rounded-2xl p-4 transition-all hover:shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium text-slate-300">Total Content</span>
            <div className="p-1.5 rounded-lg bg-[#191e2e] text-slate-400 group-hover:text-cyan-400 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 mb-1">
            <span className="text-2xl font-bold text-white font-mono tracking-tight">148 Pieces</span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded-md">
              +24%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mb-4">From 9 master videos</div>
          
          {/* Sparkline curve */}
          <div className="h-9 w-full">
            <svg viewBox="0 0 120 30" className="w-full h-full stroke-cyan-400 fill-none" preserveAspectRatio="none">
              <path
                d="M0,25 Q20,24 35,18 T70,14 T95,8 T120,4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,25 Q20,24 35,18 T70,14 T95,8 T120,4 L120,30 L0,30 Z"
                fill="url(#sparkline-grad)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="sparkline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Card 2: AI Clips Generated */}
        <div className="bg-[#121520] border border-[#1f2538] hover:border-[#2a344d] rounded-2xl p-4 transition-all hover:shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium text-slate-300">AI Clips Generated</span>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-950/70 border border-purple-800/80 px-2 py-0.5 rounded-md">
              +12 TODAY
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight mb-1">
            84 Short Clips
          </div>
          <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>98.4% viral potential score</span>
          </div>

          <div className="mt-2 pt-2 border-t border-[#1c2235]">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span>Hook Score Index</span>
              <span className="text-purple-400 font-bold font-mono">Tier S</span>
            </div>
            <div className="w-full bg-[#1a2030] h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-[94%]" />
            </div>
          </div>
        </div>

        {/* Card 3: Published Content */}
        <div className="bg-[#121520] border border-[#1f2538] hover:border-[#2a344d] rounded-2xl p-4 transition-all hover:shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium text-slate-300">Published Content</span>
            <div className="p-1.5 rounded-lg bg-[#191e2e] text-slate-400 group-hover:text-purple-400 transition-colors">
              <Rocket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight mb-1">
            62 Live Posts
          </div>
          <div className="text-[11px] text-slate-400 mb-4">Across 5 primary ecosystems</div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#1c2235] text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>TikTok</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Reels</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Shorts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>X/In</span>
            </div>
          </div>
        </div>

        {/* Card 4: Average Engagement */}
        <div className="bg-[#121520] border border-[#1f2538] hover:border-[#2a344d] rounded-2xl p-4 transition-all hover:shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium text-slate-300">Average Engagement</span>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 px-2 py-0.5 rounded-md">
              Top 5% Creators
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight mb-1">
            8.6%
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mb-3">
            +3.2% vs manual cut baseline
          </div>

          <div className="flex items-center gap-1.5 pt-2 border-t border-[#1c2235] text-[11px] text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>1.4M views converted this cycle</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Content Pipeline & Algorithmic Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Content Pipeline (7/12 cols) */}
        <div className="lg:col-span-8 bg-[#121520] border border-[#1f2538] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <h2 className="text-sm font-bold text-white">Content Pipeline</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-[#161a29] border border-[#232a3d] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
              Live Sync 4s ago
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Real-time production flow: 1 Master Video → 5 Channels
          </p>

          {/* Segmented Pipeline Bar */}
          <div className="w-full h-1.5 bg-[#1a2030] rounded-full overflow-hidden flex mb-6">
            <div className="w-[18%] bg-blue-500 h-full" />
            <div className="w-[14%] bg-indigo-500 h-full" />
            <div className="w-[20%] bg-purple-500 h-full" />
            <div className="w-[24%] bg-cyan-400 h-full" />
            <div className="w-[24%] bg-emerald-400 h-full" />
          </div>

          {/* 5 Stage Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* 1. Ideas */}
            <div className="bg-[#141724] border border-[#20273c] rounded-xl p-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>1. Ideas</span>
                <span className="text-[10px] font-mono bg-[#1c2236] px-1.5 py-0.5 rounded text-slate-400">4</span>
              </div>
              <div className="space-y-2">
                <div className="bg-[#0f121d] p-2 rounded-lg border border-[#1b2234]">
                  <div className="text-[11px] font-medium text-slate-200 truncate">Future of Agentic AI...</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-1">9.2 Trend 📍</div>
                </div>
                <div className="bg-[#0f121d] p-2 rounded-lg border border-[#1b2234]">
                  <div className="text-[11px] font-medium text-slate-200 truncate">Why 99% of podcasts fail...</div>
                  <div className="text-[10px] text-purple-400 font-mono mt-1">8.7 Trend 📊</div>
                </div>
              </div>
            </div>

            {/* 2. Scripting */}
            <div className="bg-[#141724] border border-[#20273c] rounded-xl p-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>2. Scripting</span>
                <span className="text-[10px] font-mono bg-[#1c2236] px-1.5 py-0.5 rounded text-slate-400">2</span>
              </div>
              <div className="bg-[#0f121d] p-2 rounded-lg border border-[#1b2234]">
                <div className="text-[11px] font-medium text-slate-200 truncate">Devin vs Real Engineers...</div>
                <div className="text-[10px] text-indigo-400 font-mono mt-1">3 Hooks Gen ⚡</div>
              </div>
            </div>

            {/* 3. Editing */}
            <div className="bg-[#141724] border border-[#20273c] rounded-xl p-3 ring-1 ring-purple-500/40">
              <div className="flex items-center justify-between text-xs font-semibold text-purple-300 mb-2">
                <span>3. Editing</span>
                <span className="text-[10px] font-mono bg-purple-950/60 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">3</span>
              </div>
              <div className="bg-[#0f121d] p-2 rounded-lg border border-purple-900/40">
                <div className="text-[11px] font-semibold text-white truncate">The Future of Software Dev</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                  <span className="text-cyan-400 font-bold">82%</span>
                  <span>20:14 master</span>
                </div>
                <div className="w-full bg-[#1b2133] h-1 rounded-full overflow-hidden mt-1">
                  <div className="bg-cyan-400 h-full w-[82%]" />
                </div>
              </div>
            </div>

            {/* 4. Ready */}
            <div className="bg-[#141724] border border-[#20273c] rounded-xl p-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>4. Ready</span>
                <span className="text-[10px] font-mono bg-cyan-950/60 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">6</span>
              </div>
              <div className="space-y-2">
                <div 
                  onClick={() => onStartWorkflow('clips')}
                  className="bg-[#0f121d] p-2 rounded-lg border border-[#1b2234] hover:border-cyan-500/50 cursor-pointer transition-colors"
                >
                  <div className="text-[11px] font-medium text-slate-200 truncate">"AI won't replace..."</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-1 font-semibold flex items-center justify-between">
                    <span>99 Viral</span>
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                  </div>
                </div>
                <div 
                  onClick={() => onStartWorkflow('clips')}
                  className="bg-[#0f121d] p-2 rounded-lg border border-[#1b2234] hover:border-cyan-500/50 cursor-pointer transition-colors"
                >
                  <div className="text-[11px] font-medium text-slate-200 truncate">"Coding in 2026: Agent..."</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-1 font-semibold flex items-center justify-between">
                    <span>94 Viral</span>
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Published */}
            <div className="bg-[#141724] border border-[#20273c] rounded-xl p-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>5. Published</span>
                <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">12</span>
              </div>
              <div className="bg-[#0f121d] p-2 rounded-lg border border-[#1b2234]">
                <div className="text-[11px] font-medium text-slate-200 truncate">How I scaled to 100k with...</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">34.2k views 🌐</div>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithmic Insight Card (4/12 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#181c2d] to-[#121522] border border-[#26314f] rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  ALGORITHMIC INSIGHT
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              AI Opportunity Detected
            </h3>

            <div className="text-xs text-slate-300 leading-relaxed mb-4">
              Clips with hooks strictly under <strong className="text-cyan-400 font-semibold">3.2 seconds</strong> are generating <strong className="text-purple-300 font-semibold">3.4x higher completion rates</strong> on YouTube Shorts this week.
            </div>

            <p className="text-[11px] text-slate-400 leading-normal mb-5">
              Our timeline engine has automatically re-trimmed and re-centered <strong className="text-white">4 active drafts</strong> to capture this exact retention window without losing key message context.
            </p>
          </div>

          <button
            onClick={() => onStartWorkflow('clips')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1d2338] hover:bg-purple-600/30 hover:border-purple-500/50 border border-[#2b3552] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all group"
          >
            <span>Review 4 Optimized Drafts</span>
            <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Recent Video Projects Table */}
      <div className="bg-[#121520] border border-[#1f2538] rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-white">Recent Video Projects</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitor synthesis state, viral distribution, and generated short formats
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast("Filters: Showing all formats & statuses", "info")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161a29] border border-[#232a3d] text-xs text-slate-300 hover:text-white"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter</span>
            </button>
            <button 
              onClick={() => showToast("Loaded all 28 video projects from vault", "info")}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium px-2 py-1"
            >
              View All (28)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1f2538] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">SOURCE PROJECT</th>
                <th className="pb-3">DURATION</th>
                <th className="pb-3">ENGINE STATUS</th>
                <th className="pb-3">REPURPOSED CONTENT</th>
                <th className="pb-3 text-right pr-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181d2e]">
              {/* Row 1: Elena Vance Keynote */}
              <tr className="hover:bg-[#151928] transition-colors group">
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-[#263048]">
                      <div className="w-full h-full bg-gradient-to-tr from-purple-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                        <Play className="w-4 h-4 text-purple-300 fill-purple-300/40" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-white px-1 rounded">
                        20:14
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        The Future of Software Development
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>Uploaded 2 hours ago • 4K ProRes</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 font-mono text-slate-300">
                  20 min 14 sec
                </td>
                <td className="py-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Ready (7 Clips)
                  </span>
                </td>
                <td className="py-3.5 text-slate-300">
                  <div className="font-medium text-white">12 Multi-Posts</div>
                  <div className="text-[11px] text-slate-400">7 Shorts, 3 X Threads, 2 Blogs</div>
                </td>
                <td className="py-3.5 text-right pr-2">
                  <button
                    onClick={() => onStartWorkflow('clips')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#8b5cf6] hover:bg-purple-600 text-white font-semibold text-xs transition-all shadow-glow-sm"
                  >
                    Open Studio
                  </button>
                </td>
              </tr>

              {/* Row 2: How To Build AI Apps */}
              <tr className="hover:bg-[#151928] transition-colors group">
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-[#263048]">
                      <div className="w-full h-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-white px-1 rounded">
                        34:10
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        How To Build AI Apps in 1 Hour
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>Transcribing • Whisper Engine v3</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 font-mono text-slate-300">
                  34 min 10 sec
                </td>
                <td className="py-3.5">
                  <div className="w-36">
                    <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Processing
                      </span>
                      <span className="font-mono font-bold text-cyan-400">84%</span>
                    </div>
                    <div className="w-full bg-[#1b2133] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[84%] animate-pulse" />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-slate-300">
                  <div className="font-medium text-white">5 Clips Identified</div>
                  <div className="text-[11px] text-slate-400">Extracting hooks & B-rolls</div>
                </td>
                <td className="py-3.5 text-right pr-2">
                  <button
                    onClick={() => onStartWorkflow('analyze')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#191e2e] hover:bg-[#232b40] border border-[#2a344f] text-slate-200 hover:text-white font-semibold text-xs transition-colors"
                  >
                    View Analysis
                  </button>
                </td>
              </tr>

              {/* Row 3: Podcast Ep 42 */}
              <tr className="hover:bg-[#151928] transition-colors group">
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-[#263048]">
                      <div className="w-full h-full bg-gradient-to-tr from-amber-950 via-slate-900 to-stone-900 flex items-center justify-center">
                        <Play className="w-4 h-4 text-amber-300 fill-amber-300/40" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-white px-1 rounded">
                        52:19
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                        Podcast Ep #42: Solo Founder Playbook
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>Fully Distributed • Spotify & Apple</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 font-mono text-slate-300">
                  52 min 19 sec
                </td>
                <td className="py-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Published
                  </span>
                </td>
                <td className="py-3.5 text-slate-300">
                  <div className="font-medium text-white">22 Posts Live</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">184.2k aggregate views</div>
                </td>
                <td className="py-3.5 text-right pr-2">
                  <button
                    onClick={() => onNavigate('analytics')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#191e2e] hover:bg-[#232b40] border border-[#2a344f] text-slate-200 hover:text-white font-semibold text-xs transition-colors"
                  >
                    View Analytics
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151928] border border-[#26314f] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-white mb-1">Import Public Video URL</h3>
            <p className="text-xs text-slate-400 mb-4">
              Paste a YouTube, Loom, or Twitch URL to ingest audio & transcribe at 14x realtime speed.
            </p>
            <form onSubmit={handleImportSubmit} className="space-y-4">
              <input
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#101320] border border-[#232a3d] focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
                >
                  Fetch & Ingest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
