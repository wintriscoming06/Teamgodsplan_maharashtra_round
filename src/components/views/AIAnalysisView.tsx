import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  RefreshCw, 
  Clock, 
  Zap, 
  ArrowRight, 
  X, 
  TrendingUp, 
  Mic, 
  Volume2, 
  Layers, 
  ShieldCheck, 
  Play
} from 'lucide-react';
import { INITIAL_STAGES, TRANSCRIPT_ITEMS, SEMANTIC_TOPICS, VIRAL_SPIKE_POINTS, DEMO_VIDEO_INFO } from '../../data/mockData';
import { StepHeader } from '../common/StepHeader';
import { WorkflowStep, AnalysisStage } from '../../types';
import { useToast } from '../common/Toast';

interface AIAnalysisViewProps {
  onComplete: () => void;
  onCancel: () => void;
  onSelectStep: (step: WorkflowStep) => void;
}

export const AIAnalysisView: React.FC<AIAnalysisViewProps> = ({ 
  onComplete, 
  onCancel,
  onSelectStep
}) => {
  const { showToast } = useToast();
  const [elapsedSeconds, setElapsedSeconds] = useState(42);
  const [stages, setStages] = useState<AnalysisStage[]>(INITIAL_STAGES);
  const [overallProgress, setOverallProgress] = useState(78);
  const [autoScroll, setAutoScroll] = useState(true);

  // Live timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Live progress simulation: steadily marches towards 100%
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setOverallProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        const next = prev + 1;
        if (next >= 90) {
          // Transition stage 5 to done, stage 6 to in-progress
          setStages(sList => sList.map(s => {
            if (s.id === 5) return { ...s, status: 'done', progress: 100 };
            if (s.id === 6) return { ...s, status: 'in-progress', progress: 85 };
            return s;
          }));
        }
        if (next >= 100) {
          // Both stage 5 and 6 done
          setStages(sList => sList.map(s => ({ ...s, status: 'done', progress: 100 })));
          showToast("AI Synthesis complete! 5 Viral Clips ready for review.", "success");
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(progressTimer);
  }, [showToast]);

  const estRemaining = Math.max(0, 54 - elapsedSeconds);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5-Step Workflow Header */}
      <StepHeader currentStep="analyze" onSelectStep={onSelectStep} completedSteps={['upload']} />

      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>NEURAL COMPUTE V4.2</span>
            <span className="text-slate-400">• BATCH #8921 / {DEMO_VIDEO_INFO.title} ({DEMO_VIDEO_INFO.duration})</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            CreatorAI Neural Engine is Analyzing Your Video
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Extracting semantic speech patterns, acoustic energy, visual gestures, and viral hook opportunities across {DEMO_VIDEO_INFO.durationSeconds.toLocaleString()} seconds of footage.
          </p>
        </div>

        {/* Timers */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#121520] border border-[#20273c] rounded-xl px-4 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">ELAPSED TIME</div>
            <div className="text-base font-mono font-bold text-white">
              00:{elapsedSeconds < 10 ? `0${elapsedSeconds}` : elapsedSeconds}s
            </div>
          </div>

          <div className="bg-[#121520] border border-[#20273c] rounded-xl px-4 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-cyan-400 font-semibold">EST. REMAINING</div>
            <div className="text-base font-mono font-bold text-cyan-400">
              ~00:{estRemaining < 10 ? `0${estRemaining}` : estRemaining}s
            </div>
          </div>
        </div>
      </div>

      {/* Stage Progress Bar Banner */}
      <div className="bg-[#121520] border border-[#20273c] rounded-2xl p-4 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>
              {overallProgress < 90 
                ? "Stage 5 of 6: Synthesizing Viral Highlight Anchors" 
                : overallProgress < 100 
                ? "Stage 6 of 6: Rendering 9:16 Vertical Reframing Proxies" 
                : "Synthesis Complete: All 5 Clips Curated & Ready"}
            </span>
          </div>
          <span className="font-mono font-bold text-cyan-400 text-sm">{overallProgress}% Complete</span>
        </div>

        {/* Bar */}
        <div className="w-full bg-[#181d2c] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-glow-cyan"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span>Latency: 28ms / Token</span>
          <span className="text-cyan-400">CUDA Acceleration: 4x H100 Cluster Active</span>
        </div>
      </div>

      {/* 6 Stage Cards Grid (2 rows of 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {stages.map((stage) => {
          const isDone = stage.status === 'done';
          const isInProgress = stage.status === 'in-progress';
          const isQueued = stage.status === 'queued';

          return (
            <div 
              key={stage.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isInProgress 
                  ? 'bg-[#151928] border-cyan-500/50 shadow-glow-cyan/20 ring-1 ring-cyan-500/30' 
                  : isDone
                  ? 'bg-[#111420] border-[#1f2538]'
                  : 'bg-[#0f121d] border-[#181d2a] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
                  {stage.stageNum} {isInProgress && '• IN PROGRESS'}
                </span>
                
                {isDone && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                    Done
                  </span>
                )}
                {isInProgress && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded-full font-semibold">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Live Scan
                  </span>
                )}
                {isQueued && (
                  <span className="text-[10px] font-mono text-slate-500 bg-[#161a29] px-2 py-0.5 rounded-full">
                    In Queue
                  </span>
                )}
              </div>

              <div className="font-bold text-sm text-white mb-1">{stage.name}</div>
              <p className="text-[11px] text-slate-400 leading-snug mb-2">{stage.description}</p>

              {/* Mini progress for in-progress */}
              {isInProgress && (
                <div className="w-full bg-[#1b2133] h-1 rounded-full overflow-hidden mb-1">
                  <div className="bg-cyan-400 h-full w-[80%] animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Middle Split: Live Speech & Hook Extraction (Left) + Semantic/Spike Insights (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Speech & Hook Extraction (7/12) */}
        <div className="lg:col-span-7 bg-[#121520] border border-[#1f2538] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2234] mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <h3 className="text-sm font-bold text-white">Live Speech & Hook Extraction</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAutoScroll(!autoScroll)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    autoScroll ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  Auto-Scroll {autoScroll ? 'ON' : 'OFF'}
                </button>
                <span className="text-[10px] font-mono text-slate-400">4,120 words</span>
              </div>
            </div>

            {/* Transcript Stream */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {TRANSCRIPT_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all text-left ${
                    item.isViralCandidate 
                      ? 'bg-gradient-to-r from-purple-950/40 via-[#181a2c] to-cyan-950/30 border-purple-500/40 shadow-glow-sm' 
                      : 'bg-[#0e111a] border-[#1c2233]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-slate-400" />
                      {item.speaker}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.isViralCandidate && (
                        <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                          VIRAL CANDIDATE • {item.viralScore} SCORE
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-slate-400">{item.timeRange}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {item.text}
                  </p>

                  {item.isViralCandidate && (
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-2 border-t border-purple-500/20">
                      <span className="text-cyan-400 flex items-center gap-1">
                        <Check className="w-3 h-3 text-cyan-400" />
                        Auto-Trimmed: 46s Duration
                      </span>
                      <span className="text-purple-300">Energy Spike: {item.energySpike}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Semantic Topics & Spike Moments (5/12) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Detected Semantic Topics */}
          <div className="bg-[#121520] border border-[#1f2538] rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">Detected Semantic Topics</span>
              <span className="text-[10px] font-mono text-slate-400">5 Extracted</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SEMANTIC_TOPICS.map((topic, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#161a29] border border-[#242d44] text-[11px] font-mono font-medium text-cyan-300 hover:border-cyan-500/50 cursor-pointer transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Key Viral Spike Moments Graph */}
          <div className="bg-[#121520] border border-[#1f2538] rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">Key Viral Spike Moments</span>
              <span className="text-[10px] font-mono text-purple-400">5 Detected Peaks</span>
            </div>

            {/* Simulated Audio/Retention Waveform Peaks */}
            <div className="h-20 w-full relative flex items-end justify-between px-2 pt-4 bg-[#0d0f17] rounded-xl border border-[#1b2234]">
              {VIRAL_SPIKE_POINTS.map((pt, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  {pt.isPeak && (
                    <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-1 rounded border border-cyan-800">
                      {pt.label}
                    </span>
                  )}
                  <div
                    className={`w-2 rounded-t-full transition-all ${
                      pt.isPeak 
                        ? 'bg-gradient-to-t from-purple-500 to-cyan-400 shadow-glow-cyan' 
                        : 'bg-slate-700/50'
                    }`}
                    style={{ height: `${(pt.value / 100) * 45}px` }}
                  />
                  <span className="text-[8px] font-mono text-slate-500">{pt.time.slice(0, 5)}</span>
                </div>
              ))}
            </div>

            {/* Engine Insight Pill */}
            <div className="mt-3 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-300 leading-snug">
                <strong className="text-white font-semibold">Engine Insight:</strong> Strong emotional valence detected at <span className="text-cyan-400 font-mono font-bold">04:32</span>. High retention probability (<strong className="text-emerald-400">+340% above baseline</strong>). Candidate recommended for TikTok hook test.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Identified Clip Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider text-[11px]">
            Synthesized Clip Candidates (Ready for Curation)
          </span>
          <span className="text-[11px] text-cyan-400 font-mono">Top 3 of 5 Previews</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Clip 1 */}
          <div 
            onClick={onComplete}
            className="p-3 bg-[#121520] hover:bg-[#161a28] border border-[#1f2538] hover:border-purple-500/50 rounded-xl transition-all cursor-pointer group shadow-md"
          >
            <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video mb-2.5 border border-[#232b40]">
              <div className="w-full h-full bg-gradient-to-tr from-purple-950 via-indigo-950 to-slate-900 flex items-center justify-center">
                <Play className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute top-1.5 left-1.5 text-[9px] font-mono bg-black/70 text-slate-300 px-1.5 py-0.5 rounded">
                04:32 - 05:18
              </span>
              <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
                94 Score
              </span>
            </div>
            <div className="font-semibold text-xs text-white group-hover:text-purple-300 transition-colors truncate">
              Clip #1: The AI Replacement Myth
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Recommended for Instagram Reels & Shorts</div>
          </div>

          {/* Clip 2 */}
          <div 
            onClick={onComplete}
            className="p-3 bg-[#121520] hover:bg-[#161a28] border border-[#1f2538] hover:border-purple-500/50 rounded-xl transition-all cursor-pointer group shadow-md"
          >
            <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video mb-2.5 border border-[#232b40]">
              <div className="w-full h-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 flex items-center justify-center">
                <Play className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute top-1.5 left-1.5 text-[9px] font-mono bg-black/70 text-slate-300 px-1.5 py-0.5 rounded">
                08:15 - 09:00
              </span>
              <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800 px-1.5 py-0.5 rounded">
                91 Score
              </span>
            </div>
            <div className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors truncate">
              Clip #2: Architecture over Typing Speed
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Optimal for LinkedIn Developer Feed</div>
          </div>

          {/* Clip 3 */}
          <div 
            onClick={onComplete}
            className="p-3 bg-[#121520] hover:bg-[#161a28] border border-[#1f2538] hover:border-purple-500/50 rounded-xl transition-all cursor-pointer group shadow-md"
          >
            <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video mb-2.5 border border-[#232b40]">
              <div className="w-full h-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
                <Play className="w-5 h-5 text-indigo-300 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute top-1.5 left-1.5 text-[9px] font-mono bg-black/70 text-slate-300 px-1.5 py-0.5 rounded">
                17:22 - 18:04
              </span>
              <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
                92 Score
              </span>
            </div>
            <div className="font-semibold text-xs text-white group-hover:text-indigo-300 transition-colors truncate">
              Clip #3: The 10x Engineer Transformation
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Paced for TikTok High Retention</div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="sticky bottom-4 z-20 bg-[#121522]/95 backdrop-blur-xl border border-[#27324c] rounded-2xl p-3.5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span><strong>Engine Active:</strong> 5 clips prepared for instant review</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel Processing
          </button>

          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-purple transition-all active:scale-95"
          >
            <span>Skip to Clips View (5 Generated)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
