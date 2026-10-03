import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Play, 
  Link as LinkIcon, 
  ArrowRight, 
  Check, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Sliders, 
  Sparkles,
  CheckSquare,
  Square,
  ChevronDown
} from 'lucide-react';
import { DEMO_VIDEO_INFO } from '../../data/mockData';
import { StepHeader } from '../common/StepHeader';
import { WorkflowStep } from '../../types';
import { useToast } from '../common/Toast';

interface ContentStudioViewProps {
  onStartAnalysis: () => void;
  onSelectStep: (step: WorkflowStep) => void;
}

export const ContentStudioView: React.FC<ContentStudioViewProps> = ({ 
  onStartAnalysis, 
  onSelectStep 
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cloudUrl, setCloudUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Platform selection state
  const [platforms, setPlatforms] = useState({
    tiktok: true,
    ytShorts: true,
    igReels: true,
    linkedin: true,
    xTwitter: false,
  });

  const [clipStyle, setClipStyle] = useState('Dynamic Captions + Zoom');
  const [hookSensitivity, setHookSensitivity] = useState('High Virality');

  const togglePlatform = (key: keyof typeof platforms) => {
    setPlatforms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Selected file: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`, 'info');
      setTimeout(() => {
        onStartAnalysis();
      }, 600);
    }
  };

  const handleFetchVideo = () => {
    if (!cloudUrl) {
      showToast("Please enter a video URL", "error");
      return;
    }
    showToast("Connecting to video stream...", "info");
    setTimeout(() => {
      onStartAnalysis();
    }, 700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5-Step Workflow Header */}
      <StepHeader currentStep="upload" onSelectStep={onSelectStep} />

      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold mb-1">
            STAGE 01 • INGESTION • High-Bandwidth Neural Pipeline
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Source Video Ingestion
          </h1>
        </div>

        {/* Engine velocity and GPU tags */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141824] border border-[#232b40] text-xs font-mono text-cyan-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engine Velocity: <strong>14x Realtime</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141824] border border-[#232b40] text-xs font-mono text-emerald-400">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>GPU Cluster: <strong>Online</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Dropzone & Demo Video Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Drag & Drop Dropzone (7/12) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              showToast("Uploaded custom stream. Starting ingestion pipeline...", "success");
              onStartAnalysis();
            }}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all bg-gradient-to-b from-[#131724] to-[#0f121b] ${
              isDragging 
                ? 'border-purple-400 bg-purple-950/20 shadow-glow-purple' 
                : 'border-[#242c42] hover:border-[#354060]'
            }`}
          >
            {/* Upload Icon */}
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1b2133] border border-[#2b3552] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <UploadCloud className="w-8 h-8 text-purple-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-black">
                <Play className="w-3 h-3 fill-black ml-0.5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1.5">
              Drag & drop your long-form video here
            </h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
              Supports MP4, MOV, MKV up to 4K resolution (max 5GB). Auto-generates captions, virality scores, and 9:16 vertical clips.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="video/*" 
                className="hidden" 
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-purple transition-all active:scale-95"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Video</span>
              </button>

              <button
                onClick={() => {
                  showToast("Loading 'The Future of Software Development' (20:14)", "info");
                  onStartAnalysis();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181d2e] hover:bg-[#222a42] border border-[#2a344f] text-white text-xs font-semibold transition-all active:scale-95 group"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/30 group-hover:scale-110 transition-transform" />
                <span>Use Demo Video</span>
              </button>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                4K UHD 60FPS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Multi-Track Audio
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Neural Speaker Track
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Smart Silence Trim
              </span>
            </div>
          </div>

          {/* Cloud Video Import */}
          <div className="bg-[#121520] border border-[#1f2538] rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#181d2d] text-cyan-400 border border-[#242e47]">
                <LinkIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Cloud Video Import</div>
                <div className="text-[11px] text-slate-400">Paste YouTube, Loom, or Twitch link</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={cloudUrl}
                onChange={(e) => setCloudUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-[#0f121d] border border-[#232b40] focus:border-cyan-400 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none w-full sm:w-64"
              />
              <button
                onClick={handleFetchVideo}
                className="px-3 py-1.5 rounded-lg bg-[#1a2030] hover:bg-[#242d44] border border-[#2b3652] text-xs font-medium text-slate-200 hover:text-white shrink-0 flex items-center gap-1 transition-colors"
              >
                <span>Fetch Video</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: READY-TO-TEST DEMO Card (5/12) */}
        <div className="lg:col-span-5 bg-[#121520] border border-[#232c44] rounded-2xl p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Top Demo Label */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
                  READY-TO-TEST DEMO
                </span>
              </div>
              <span className="text-[10px] font-mono bg-[#1a2032] border border-[#28334e] text-slate-400 px-2 py-0.5 rounded">
                DEMO #01
              </span>
            </div>

            {/* Video Preview Box */}
            <div className="relative rounded-xl overflow-hidden mb-4 border border-[#28324e] group shadow-inner bg-slate-900 aspect-video">
              {/* Studio Thumbnail Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950 flex items-center justify-center">
                {/* Visualizer illustration */}
                <div className="w-full h-full p-4 flex flex-col justify-between relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-cyan-300 border border-cyan-500/30">
                      4K UHD • 60 FPS • Stereo
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 font-bold border border-purple-500/40">
                      20:14
                    </span>
                  </div>

                  {/* Speaker Graphic Simulation */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 p-[2px] shadow-glow-purple">
                      <div className="w-full h-full rounded-full bg-[#111422] flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Sound Wave Bars */}
                  <div className="flex items-center justify-center gap-1 h-5">
                    {[40, 70, 30, 85, 100, 60, 45, 90, 75, 40, 95, 60, 80, 50].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-cyan-400/80 rounded-full"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
              {DEMO_VIDEO_INFO.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {DEMO_VIDEO_INFO.description}
            </p>

            {/* Metadata specs */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#0e111a] p-3 rounded-xl border border-[#1b2234] mb-4">
              <div>
                <span className="text-slate-400">Recorded:</span>
                <span className="text-slate-200 ml-1.5 font-medium">{DEMO_VIDEO_INFO.recorded}</span>
              </div>
              <div>
                <span className="text-slate-400">Detected Speaker:</span>
                <span className="text-cyan-400 ml-1.5 font-medium">{DEMO_VIDEO_INFO.speaker}</span>
              </div>
              <div>
                <span className="text-slate-400">Language & Audio:</span>
                <span className="text-slate-200 ml-1.5 font-medium">{DEMO_VIDEO_INFO.language}</span>
              </div>
              <div>
                <span className="text-slate-400">Estimated Clips:</span>
                <span className="text-purple-400 ml-1.5 font-medium">{DEMO_VIDEO_INFO.estimatedClips}</span>
              </div>
            </div>
          </div>

          {/* Big Action Button */}
          <div>
            <button
              onClick={() => {
                showToast("Starting neural analysis for 'The Future of Software Development'...", "info");
                onStartAnalysis();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-purple flex items-center justify-between transition-all active:scale-[0.98] group"
            >
              <div className="text-left">
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>Continue with this Demo Video</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[10px] text-purple-200 font-normal font-mono">
                  Proceeds directly to Stage 02: AI Analysis
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Repurposing Engine Preferences */}
      <div className="bg-[#121520] border border-[#1f2538] rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b2234] pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              Repurposing Engine Preferences
            </h3>
            <span className="text-[10px] font-mono bg-[#191f30] text-slate-400 px-2 py-0.5 rounded border border-[#26314c]">
              Applied on Ingestion
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Configure target formats before running speech-to-clip model
          </span>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          {/* Target Platforms Multi-Select */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
              TARGET PLATFORMS (MULTI-SELECT)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => togglePlatform('tiktok')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  platforms.tiktok 
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60' 
                    : 'bg-[#161a29] text-slate-400 border border-[#232b40]'
                }`}
              >
                {platforms.tiktok ? <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> : <Square className="w-3.5 h-3.5" />}
                <span>TikTok 9:16</span>
              </button>

              <button
                onClick={() => togglePlatform('ytShorts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  platforms.ytShorts 
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60' 
                    : 'bg-[#161a29] text-slate-400 border border-[#232b40]'
                }`}
              >
                {platforms.ytShorts ? <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> : <Square className="w-3.5 h-3.5" />}
                <span>YT Shorts 9:16</span>
              </button>

              <button
                onClick={() => togglePlatform('igReels')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  platforms.igReels 
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60' 
                    : 'bg-[#161a29] text-slate-400 border border-[#232b40]'
                }`}
              >
                {platforms.igReels ? <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> : <Square className="w-3.5 h-3.5" />}
                <span>IG Reels 9:16</span>
              </button>

              <button
                onClick={() => togglePlatform('linkedin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  platforms.linkedin 
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60' 
                    : 'bg-[#161a29] text-slate-400 border border-[#232b40]'
                }`}
              >
                {platforms.linkedin ? <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> : <Square className="w-3.5 h-3.5" />}
                <span>LinkedIn 1:1</span>
              </button>

              <button
                onClick={() => togglePlatform('xTwitter')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  platforms.xTwitter 
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60' 
                    : 'bg-[#161a29] text-slate-400 border border-[#232b40]'
                }`}
              >
                {platforms.xTwitter ? <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> : <Square className="w-3.5 h-3.5" />}
                <span>X / Twitter 16:9</span>
              </button>
            </div>
          </div>

          {/* Clip Style Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
              CLIP STYLE
            </label>
            <div className="relative">
              <select
                value={clipStyle}
                onChange={(e) => setClipStyle(e.target.value)}
                className="w-full bg-[#151928] border border-[#242e47] text-xs text-white rounded-xl px-3 py-2 appearance-none outline-none focus:border-cyan-400"
              >
                <option value="Dynamic Captions + Zoom">Dynamic Captions + Zoom</option>
                <option value="Minimalist Subtitles">Minimalist Subtitles</option>
                <option value="High-Impact Kinetic">High-Impact Kinetic</option>
                <option value="Clean Framing Only">Clean Framing Only</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Hook Sensitivity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                HOOK SENSITIVITY
              </label>
              <span className="text-[10px] text-cyan-400 font-mono">Top 20% Moments</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#151928] border border-[#242e47] text-xs">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold text-white">High Virality</span>
              <span className="text-[10px] text-slate-400 ml-auto font-mono">Score &gt; 85</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Badges at Bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#1b2234]">
          <div className="p-3 rounded-xl bg-[#0f121d] border border-[#1b2234] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Whisper Large-v3</div>
              <div className="text-[11px] text-slate-400 mt-0.5">99.4% Transcription Precision</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0f121d] border border-[#1b2234] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/60 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Active Speaker Auto-Framing</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Continuous Face Lock 9:16</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0f121d] border border-[#1b2234] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/60 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Retention Predictive Model</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Trained on 4.2M Viral Hits</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0f121d] border border-[#1b2234] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">SOC2 Encrypted Tunnel</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Zero Training on Private Assets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
