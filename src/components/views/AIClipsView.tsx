import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Sparkles, 
  Share2, 
  Download, 
  Eye, 
  Scissors, 
  Wand2, 
  Check, 
  ChevronDown, 
  ArrowRight,
  Maximize2,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Disc3,
  SlidersHorizontal
} from 'lucide-react';
import { DEMO_CLIPS } from '../../data/mockData';
import { StepHeader } from '../common/StepHeader';
import { WorkflowStep, Clip } from '../../types';
import { useToast } from '../common/Toast';

interface AIClipsViewProps {
  onEditClip: (clip: Clip) => void;
  onSendToRepurpose: (clip?: Clip) => void;
  onSelectStep: (step: WorkflowStep) => void;
}

export const AIClipsView: React.FC<AIClipsViewProps> = ({ 
  onEditClip, 
  onSendToRepurpose,
  onSelectStep 
}) => {
  const { showToast } = useToast();
  const [selectedClip, setSelectedClip] = useState<Clip>(DEMO_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [autoCaptions, setAutoCaptions] = useState(true);
  const [previewPlatform, setPreviewPlatform] = useState<'tiktok' | 'reels' | 'shorts' | 'x'>('tiktok');
  const [sortBy, setSortBy] = useState('virality');
  const [refineModalOpen, setRefineModalOpen] = useState(false);
  const [refineConstraint, setRefineConstraint] = useState('30s');

  // Playback timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedClip.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedClip.durationSeconds]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSelectClip = (clip: Clip) => {
    setSelectedClip(clip);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const sortedClips = [...DEMO_CLIPS].sort((a, b) => {
    if (sortBy === 'virality') return b.score - a.score;
    if (sortBy === 'duration') return a.durationSeconds - b.durationSeconds;
    return a.rank - b.rank;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5-Step Workflow Header */}
      <StepHeader 
        currentStep="clips" 
        onSelectStep={onSelectStep} 
        completedSteps={['upload', 'analyze']} 
      />

      {/* Stage Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-[10px] font-mono font-bold text-white">
              03
            </span>
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              AI Clip Discovery & Reframing
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400">
            SOURCE: "Future_of_Software_Keynote_2025_4K.mp4" (20:14)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast("Detection Settings: Face-lock tracking set to active speaker", "info")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141824] hover:bg-[#1c2233] border border-[#242e47] text-xs font-medium text-slate-200"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span>Detection Settings</span>
          </button>

          <button
            onClick={() => showToast("Exporting all 5 clips (4K ProRes 9:16 proxies)", "success")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141824] hover:bg-[#1c2233] border border-[#242e47] text-xs font-semibold text-slate-200"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Batch Export All (5)</span>
          </button>

          <button
            onClick={() => onSendToRepurpose(selectedClip)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-purple transition-all active:scale-95"
          >
            <span>Send to Repurpose Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left 9:16 Player (5/12) & Right Clips List (7/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive 9:16 Player & Audio Waveform */}
        <div className="lg:col-span-5 bg-[#121520] border border-[#1f2538] rounded-2xl p-4 shadow-xl space-y-4">
          {/* Clip Metadata Top Bar */}
          <div className="flex items-center justify-between text-xs">
            <div className="truncate max-w-[200px] font-semibold text-white">
              {selectedClip.title}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800">
                9:16 PORTRAIT AI
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/60 text-slate-400">
                60 FPS
              </span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>SOURCE_TIMECODE: 00:04:32.14 → 00:05:18.80</span>
            <span className="text-cyan-400 font-bold">
              00:{currentTime < 10 ? `0${currentTime}` : currentTime} / 00:{selectedClip.durationSeconds}
            </span>
          </div>

          {/* 9:16 Portrait Canvas */}
          <div className="relative mx-auto w-[270px] h-[480px] bg-slate-950 rounded-2xl overflow-hidden border-2 border-[#2b3552] shadow-2xl flex flex-col justify-between group">
            {/* Background speaker video simulation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#101424] via-[#1a1433] to-[#0a0c16]">
              {/* Abstract studio backdrop / speaker silhouette */}
              <div className="w-full h-full relative flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent pointer-events-none" />

                {/* Speaker avatar / visualizer */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 p-[3px] shadow-2xl transition-transform duration-500 ${isPlaying ? 'scale-105 shadow-glow-purple' : ''}`}>
                    <div className="w-full h-full rounded-full bg-[#131625] flex items-center justify-center text-white text-2xl font-bold">
                      EV
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-white mt-2 px-2 py-0.5 rounded-full bg-black/50 border border-white/10">
                    Elena Vance
                  </div>
                </div>

                {/* Kinetic Dynamic Captions Overlay */}
                {autoCaptions && (
                  <div className="absolute inset-x-3 bottom-24 z-20 text-center pointer-events-none">
                    <div className="font-black tracking-tight text-white uppercase text-base leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      <div className="text-slate-100 font-black">AI WON'T REPLACE</div>
                      <div className="text-white font-black text-lg">PROGRAMMERS</div>
                      <div className="text-purple-300 font-extrabold text-sm my-0.5">— BUT DEVELOPERS —</div>
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-sm rounded-lg shadow-lg my-0.5">
                        USING AI
                      </div>
                      <div className="text-slate-100 font-black">WILL REPLACE THOSE WHO DON'T.</div>
                    </div>
                  </div>
                )}

                {/* Platform Overlay Simulator */}
                {previewPlatform === 'tiktok' && (
                  <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between text-[10px] text-white/70">
                      <span>Following | For You</span>
                      <span className="font-mono">LIVE</span>
                    </div>

                    <div className="flex items-end justify-between">
                      {/* Left info */}
                      <div className="text-left text-white max-w-[170px] space-y-1">
                        <div className="text-xs font-bold">@elenacreates</div>
                        <div className="text-[10px] text-slate-200 line-clamp-2">
                          The brutal truth about software engineering in 2026. #developer #ai
                        </div>
                        <div className="text-[9px] text-cyan-300 flex items-center gap-1">
                          <Disc3 className="w-3 h-3 animate-spin" />
                          <span>Original Sound - Elena Vance</span>
                        </div>
                      </div>

                      {/* Right action rail */}
                      <div className="flex flex-col items-center gap-3 text-white">
                        <div className="flex flex-col items-center">
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          <span className="text-[9px] font-bold">42.1K</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-[9px] font-bold">814</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Bookmark className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-[9px] font-bold">12.3K</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Send className="w-5 h-5" />
                          <span className="text-[9px] font-bold">Share</span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-white flex items-center justify-center text-[8px] animate-spin">
                          💿
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Frame Badges */}
            <div className="relative z-30 p-2 flex items-center justify-between text-[9px] font-mono text-slate-300 pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                LIVE PREVIEW
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10">
                Active 9:16
              </span>
            </div>

            {/* Bottom Scrubber */}
            <div className="relative z-30 p-2 bg-gradient-to-t from-black/90 to-transparent">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all" 
                  style={{ width: `${(currentTime / selectedClip.durationSeconds) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Smart Audio Voice Track Waveform */}
          <div className="bg-[#0e111a] border border-[#1b2234] rounded-xl p-3">
            <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                SMART AUDIO VOICE TRACK (ISOLATED)
              </span>
              <span className="text-cyan-400 font-bold">
                {selectedClip.timeRange} (Length: {selectedClip.durationSeconds}s)
              </span>
            </div>

            {/* Waveform graphic with HOOK START & CTA */}
            <div className="relative h-12 w-full bg-[#080a10] rounded-lg p-1.5 flex items-center justify-between overflow-hidden">
              {/* Hook Start marker */}
              <div className="absolute left-[8%] top-0 bottom-0 border-l-2 border-purple-500 z-10 flex flex-col justify-start">
                <span className="text-[8px] font-mono font-bold bg-purple-600 text-white px-1 rounded-r">
                  HOOK START
                </span>
              </div>

              {/* CTA marker */}
              <div className="absolute right-[12%] top-0 bottom-0 border-r-2 border-cyan-500 z-10 flex flex-col justify-end items-end">
                <span className="text-[8px] font-mono font-bold bg-cyan-600 text-black px-1 rounded-l">
                  CTA
                </span>
              </div>

              {/* Waveform bars */}
              {Array.from({ length: 48 }).map((_, i) => {
                const height = Math.sin(i * 0.4) * 16 + 22 + (i % 3 === 0 ? 8 : 0);
                const isPassed = (i / 48) <= (currentTime / selectedClip.durationSeconds);
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isPassed ? 'bg-cyan-400' : 'bg-slate-700/60'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Preview UI Platform Selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-semibold text-slate-400">PREVIEW UI:</span>
            <div className="flex items-center gap-1">
              {(['tiktok', 'reels', 'shorts', 'x'] as const).map(platform => (
                <button
                  key={platform}
                  onClick={() => setPreviewPlatform(platform)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium uppercase font-mono transition-colors ${
                    previewPlatform === platform
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-[#151928] text-slate-400 hover:text-white'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-between border-t border-[#1b2234] pt-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                className="p-1.5 rounded-lg bg-[#151928] hover:bg-[#1e2438] text-slate-300"
                title="Rewind 5s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button 
                onClick={() => setCurrentTime(Math.min(selectedClip.durationSeconds, currentTime + 5))}
                className="p-1.5 rounded-lg bg-[#151928] hover:bg-[#1e2438] text-slate-300"
                title="Forward 5s"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setAutoCaptions(!autoCaptions)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                autoCaptions 
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800' 
                  : 'bg-[#151928] text-slate-400 border-transparent'
              }`}
            >
              Auto-Captions: Animated
            </button>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-[#151928] text-slate-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Status Tags */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Smart Face Track Active
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              UHD Neural Upscale
            </span>
          </div>
        </div>

        {/* Right Column: 5 Curated Viral Clips (7/12) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  5 Curated Viral Clips
                </h2>
                <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                  READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ranked by hook strength and predictive watch-time retention
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Virality:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#141824] border border-[#242e47] text-white rounded-lg px-2.5 py-1 text-xs outline-none"
              >
                <option value="virality">High → Low</option>
                <option value="duration">Duration: Shortest</option>
              </select>
            </div>
          </div>

          {/* List of 5 Clips */}
          <div className="space-y-3.5">
            {sortedClips.map((clip) => {
              const isSelected = selectedClip.id === clip.id;

              return (
                <div
                  key={clip.id}
                  onClick={() => handleSelectClip(clip)}
                  className={`bg-[#121520] border rounded-2xl p-4 transition-all cursor-pointer shadow-lg relative ${
                    isSelected
                      ? 'border-purple-500/80 bg-gradient-to-r from-[#171a2a] to-[#131522] ring-1 ring-purple-500/50 shadow-glow-sm'
                      : 'border-[#1f2538] hover:border-[#2a344d] hover:bg-[#141824]'
                  }`}
                >
                  {/* Top Row: Badge, Time, Score */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        clip.rank === 1
                          ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                          : 'bg-[#181d2d] text-slate-300 border-[#263048]'
                      }`}>
                        {clip.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {clip.timeRange} ({clip.durationSeconds}s)
                      </span>
                    </div>

                    {/* Circular Viral Score Badge */}
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-[9px] uppercase font-mono text-slate-400 font-semibold">
                          VIRAL INDEX
                        </div>
                        <div className={`text-[10px] font-bold font-mono ${
                          clip.scoreTier === 'EXTREME' ? 'text-cyan-400' : 'text-purple-400'
                        }`}>
                          {clip.scoreTier}
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center font-bold text-white text-xs shadow-glow-cyan bg-slate-900">
                        {clip.score}
                      </div>
                    </div>
                  </div>

                  {/* Title & Topic Tags */}
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {clip.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {clip.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-[#181c2c] border border-[#242d44] text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Detected Viral Hook Quote Box */}
                  <div className="bg-[#0d1018] border border-[#1d2436] rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="text-purple-400 flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        DETECTED VIRAL HOOK (00:00 - 00:06)
                      </span>
                      <span>WORD PACE: {clip.wpm} WPM</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-200 font-sans leading-relaxed">
                      "{clip.hook}"
                    </blockquote>
                  </div>

                  {/* Engine Insight */}
                  <div className="text-[11px] text-slate-400 mb-4 leading-normal flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-200">Engine Insight:</strong> {clip.engineInsight}
                    </span>
                  </div>

                  {/* Action Buttons on Card */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1b2234]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Generating clip: ${clip.title}`, 'info');
                          onSendToRepurpose(clip);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-glow-purple active:scale-95"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Generate Clip</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditClip(clip);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181d2d] hover:bg-[#22293e] border border-[#26314c] text-white text-xs font-medium transition-colors"
                      >
                        <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                        <span>Edit in Studio</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectClip(clip);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Downloaded proxy preview for ${clip.title}`, 'success');
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Duration Constraint Refinement Card */}
          <div className="bg-[#121520] border border-[#1f2538] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <div className="text-xs font-bold text-white">Need custom duration constraints?</div>
              <div className="text-[11px] text-slate-400">
                Re-scan transcript using 30s, 60s, or 90s target bounds.
              </div>
            </div>
            <button
              onClick={() => setRefineModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#181d2e] hover:bg-[#232b40] border border-[#29344e] text-xs font-semibold text-slate-200 shrink-0"
            >
              Refine Prompt
            </button>
          </div>
        </div>
      </div>

      {/* Refine Duration Modal */}
      {refineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151928] border border-[#26314f] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-bold text-white mb-1">Refine Duration Bounds</h3>
            <p className="text-xs text-slate-400 mb-4">
              Re-scan the keynote speech to isolate tighter or longer punchlines.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {['30s (TikTok/Shorts)', '60s (Standard)', '90s (In-depth)'].map(val => (
                  <button
                    key={val}
                    onClick={() => setRefineConstraint(val)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold ${
                      refineConstraint === val 
                        ? 'bg-purple-600/30 text-purple-300 border-purple-500' 
                        : 'bg-[#101320] text-slate-400 border-[#232b40]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setRefineModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setRefineModalOpen(false);
                    showToast(`Re-scanned transcript using ${refineConstraint} bounds. 5 clips updated.`, 'success');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-glow-purple"
                >
                  Apply & Re-Index
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
