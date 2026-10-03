import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Sliders, 
  Music, 
  Crop, 
  Type, 
  Eye, 
  Scissors, 
  Zap, 
  Check, 
  ArrowRight,
  Maximize2,
  RefreshCw,
  Radio,
  FileText,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { DEMO_CLIPS } from '../../data/mockData';
import { StepHeader } from '../common/StepHeader';
import { WorkflowStep, Clip, EditorSettings } from '../../types';
import { useToast } from '../common/Toast';

interface AIEditorViewProps {
  clip?: Clip;
  onProceedToRepurpose: () => void;
  onSelectStep: (step: WorkflowStep) => void;
}

export const AIEditorView: React.FC<AIEditorViewProps> = ({ 
  clip = DEMO_CLIPS[0], 
  onProceedToRepurpose,
  onSelectStep
}) => {
  const { showToast } = useToast();

  // All 7 editable controls with React state
  const [removeSilence, setRemoveSilence] = useState(true);
  const [generateCaptions, setGenerateCaptions] = useState(true);
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [convertTo916, setConvertTo916] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [dynamicCaptions, setDynamicCaptions] = useState(true);
  const [captionStyle, setCaptionStyle] = useState<'kinetic' | 'boxed' | 'classic' | 'neon'>('kinetic');
  const [smartZoom, setSmartZoom] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [musicTrack, setMusicTrack] = useState('Cyber Lofi Beat');
  const [musicVolume, setMusicVolume] = useState(28);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(14);
  const [isMuted, setIsMuted] = useState(false);

  // Interactive Transcript words
  const [transcriptWords, setTranscriptWords] = useState<string[]>([
    "AI", "won't", "replace", "programmers", "—", "but", "programmers", "using", "AI", "will", "replace", "those", "who", "don't."
  ]);
  const [editingWordIndex, setEditingWordIndex] = useState<number | null>(null);
  const [editingWordValue, setEditingWordValue] = useState('');

  const handleEditWord = (index: number) => {
    setEditingWordIndex(index);
    setEditingWordValue(transcriptWords[index]);
  };

  const handleSaveWord = () => {
    if (editingWordIndex !== null) {
      const updated = [...transcriptWords];
      updated[editingWordIndex] = editingWordValue;
      setTranscriptWords(updated);
      setEditingWordIndex(null);
      showToast("Updated caption word directly", "info");
    }
  };

  const handleResetDefaults = () => {
    setRemoveSilence(true);
    setGenerateCaptions(true);
    setHighlightKeywords(true);
    setConvertTo916(true);
    setAspectRatio('9:16');
    setDynamicCaptions(true);
    setCaptionStyle('kinetic');
    setSmartZoom(true);
    setBackgroundMusic(true);
    setMusicVolume(28);
    showToast("Restored AI engine defaults", "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5-Step Workflow Header */}
      <StepHeader 
        currentStep="edit" 
        onSelectStep={onSelectStep} 
        completedSteps={['upload', 'analyze', 'clips']} 
      />

      {/* Top Banner Motto: "AI suggests. You decide." */}
      <div className="bg-gradient-to-r from-purple-950/70 via-[#151929] to-cyan-950/50 border border-purple-500/40 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-purple-500/30 text-purple-300 border border-purple-500/40">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
              HUMAN-IN-THE-LOOP CREATIVE CONTROL
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            “AI suggests. You decide.”
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Every layer from smart silence cuts to kinetic word animations is fully controllable and customizable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-xl bg-[#141824] hover:bg-[#1e2436] border border-[#232c42] text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={onProceedToRepurpose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-purple transition-all active:scale-95"
          >
            <span>Save & Repurpose</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Video Preview (5/12) & Right Controls & Transcript (7/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Video Canvas */}
        <div className="lg:col-span-5 bg-[#121520] border border-[#1f2538] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white truncate max-w-[220px]">
              {clip.title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {aspectRatio} Format
            </span>
          </div>

          {/* Dynamic Video Viewport based on aspect ratio & smart zoom */}
          <div className="relative mx-auto bg-slate-950 rounded-2xl overflow-hidden border-2 border-[#2b3552] shadow-2xl flex items-center justify-center transition-all duration-300"
            style={{
              width: aspectRatio === '9:16' ? '270px' : aspectRatio === '1:1' ? '320px' : '100%',
              height: aspectRatio === '9:16' ? '480px' : aspectRatio === '1:1' ? '320px' : '220px',
            }}
          >
            {/* Background Studio Graphic */}
            <div className={`w-full h-full bg-gradient-to-b from-[#101424] via-[#1a1433] to-[#0a0c16] relative flex flex-col items-center justify-center p-4 transition-transform duration-700 ${
              smartZoom ? 'scale-105' : 'scale-100'
            }`}>
              {/* Speaker Visual */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 p-[3px] shadow-2xl transition-all duration-500 ${
                  aspectRatio === '9:16' ? 'w-24 h-24' : 'w-20 h-20'
                }`}>
                  <div className="w-full h-full rounded-full bg-[#131625] flex items-center justify-center text-white text-xl font-bold">
                    EV
                  </div>
                </div>
                <div className="text-[10px] font-semibold text-white mt-2 px-2 py-0.5 rounded-full bg-black/60 border border-white/10">
                  Elena Vance
                </div>
              </div>

              {/* Dynamic Captions Render Engine */}
              {generateCaptions && (
                <div className="absolute inset-x-2 bottom-12 z-20 text-center pointer-events-none px-2">
                  {captionStyle === 'kinetic' && (
                    <div className="font-black uppercase tracking-tight leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-sm">
                      <span className="text-white">AI WON'T REPLACE </span>
                      <span className={`${highlightKeywords ? 'text-cyan-300 font-black' : 'text-white'}`}>PROGRAMMERS </span>
                      <div className="my-0.5 text-purple-300 text-xs">— BUT DEVELOPERS —</div>
                      <div className={`inline-block px-2.5 py-0.5 my-0.5 rounded-md font-black shadow-lg ${
                        highlightKeywords ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black' : 'bg-white text-black'
                      }`}>
                        USING AI
                      </div>
                      <div className="text-white text-xs mt-0.5">WILL REPLACE THOSE WHO DON'T</div>
                    </div>
                  )}

                  {captionStyle === 'boxed' && (
                    <div className="inline-block bg-black/80 border border-cyan-400/40 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xl">
                      "AI won't replace programmers — programmers using AI will."
                    </div>
                  )}

                  {captionStyle === 'neon' && (
                    <div className="text-xs font-black uppercase text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                      AI WON'T REPLACE PROGRAMMERS • USE AI OR FALL BEHIND
                    </div>
                  )}

                  {captionStyle === 'classic' && (
                    <div className="bg-black/60 px-3 py-1 rounded text-xs text-yellow-300 font-medium">
                      AI won't replace programmers — but developers using AI will replace those who don't.
                    </div>
                  )}
                </div>
              )}

              {/* Background Music Equalizer simulation if enabled */}
              {backgroundMusic && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full border border-purple-500/30">
                  <Music className="w-3 h-3 text-purple-400" />
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-cyan-400 animate-pulse"></span>
                    <span className="w-0.5 h-2 bg-purple-400 animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-cyan-400 animate-pulse"></span>
                  </div>
                </div>
              )}

              {/* Smart Zoom / Face Lock indicator badge */}
              {smartZoom && (
                <div className="absolute top-3 left-3 text-[9px] font-mono bg-black/60 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  🎯 Face Lock 1.1x Zoom
                </div>
              )}
            </div>

            {/* Silence Trim Overlay Indicator */}
            {removeSilence && (
              <div className="absolute bottom-2 left-2 z-30 text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                ✓ 4.2s Dead Air Auto-Cut
              </div>
            )}
          </div>

          {/* Scrubber & Timeline */}
          <div className="bg-[#0e111a] border border-[#1b2234] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>00:{currentTime < 10 ? `0${currentTime}` : currentTime} / 00:46</span>
              <span className="text-cyan-400 font-semibold">
                {removeSilence ? "Trimmed: 41.8s Effective" : "46.0s Original"}
              </span>
            </div>

            {/* Audio Waveform with Silence Trim indicators */}
            <div className="relative h-10 w-full bg-[#080a10] rounded-lg p-1 flex items-center justify-between overflow-hidden">
              {/* Simulated Dead Air Cut Gap */}
              {removeSilence && (
                <div className="absolute left-[35%] w-[8%] top-0 bottom-0 bg-rose-500/30 border-x border-rose-500 flex items-center justify-center">
                  <span className="text-[7px] font-mono text-rose-300">CUT</span>
                </div>
              )}

              {Array.from({ length: 44 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full ${
                    i >= 15 && i <= 18 && removeSilence
                      ? 'bg-rose-500/30'
                      : i <= 14
                      ? 'bg-cyan-400'
                      : 'bg-slate-700'
                  }`}
                  style={{ height: `${Math.sin(i * 0.5) * 14 + 18}px` }}
                />
              ))}
            </div>

            {/* Scrubber Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                  className="p-1 rounded bg-[#141824] hover:bg-[#1c2234] text-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                <button
                  onClick={() => setCurrentTime(Math.min(46, currentTime + 5))}
                  className="p-1 rounded bg-[#141824] hover:bg-[#1c2234] text-slate-300"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded bg-[#141824] text-slate-400 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 7 Editable Controls & Interactive Transcript (7/12) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#121520] border border-[#1f2538] rounded-2xl p-5 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-[#1b2234] pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  AI Enhancement Controls
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toggle and customize AI automated adjustments
                </p>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                7 Controls Active
              </span>
            </div>

            {/* 7 Controls Grid */}
            <div className="space-y-3.5">
              {/* 1. Remove silence */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141825] border border-[#20273d]">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Scissors className="w-3.5 h-3.5 text-purple-400" />
                    <span>Remove silence</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {removeSilence ? "Trimmed 4.2s of dead air across 3 pauses" : "Disabled (Original audio length preserved)"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRemoveSilence(!removeSilence);
                    showToast(removeSilence ? "Restored original silence pauses" : "Trimmed 4.2s of silence", "info");
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    removeSilence ? 'bg-purple-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    removeSilence ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* 2. Generate captions */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141825] border border-[#20273d]">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Generate captions</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {generateCaptions ? "Whisper v3 high-accuracy speech-to-text overlay" : "Captions hidden from video frame"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setGenerateCaptions(!generateCaptions);
                    showToast(generateCaptions ? "Captions disabled" : "Captions enabled", "info");
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    generateCaptions ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    generateCaptions ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* 3. Highlight keywords */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141825] border border-[#20273d]">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Highlight keywords</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {highlightKeywords ? "Cyan & purple gradient pill highlights on core hooks" : "Plain white typography"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setHighlightKeywords(!highlightKeywords);
                    showToast(highlightKeywords ? "Keyword highlights turned off" : "Keywords highlighted in cyan/purple", "info");
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    highlightKeywords ? 'bg-purple-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    highlightKeywords ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* 4. Convert to 9:16 & Aspect Ratio */}
              <div className="p-3 rounded-xl bg-[#141825] border border-[#20273d] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Crop className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Convert to 9:16 (Auto-Framing)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Speaker Face Lock</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {(['9:16', '1:1', '16:9'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => {
                        setAspectRatio(ratio);
                        setConvertTo916(ratio === '9:16');
                        showToast(`Aspect ratio set to ${ratio}`, 'info');
                      }}
                      className={`py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                        aspectRatio === ratio
                          ? 'bg-purple-600 text-white shadow-glow-purple border border-purple-400'
                          : 'bg-[#101320] text-slate-400 hover:text-white border border-[#232b40]'
                      }`}
                    >
                      {ratio} {ratio === '9:16' ? '(Vertical)' : ratio === '1:1' ? '(Square)' : '(Landscape)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Dynamic captions style */}
              <div className="p-3 rounded-xl bg-[#141825] border border-[#20273d] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Dynamic captions style</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300">Kinetic Typography</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {(['kinetic', 'boxed', 'neon', 'classic'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => {
                        setCaptionStyle(style);
                        showToast(`Caption style: ${style.toUpperCase()}`, 'info');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs capitalize font-medium transition-all ${
                        captionStyle === style
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-sm border border-purple-400'
                          : 'bg-[#101320] text-slate-400 hover:text-white border border-[#232b40]'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Smart zoom */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141825] border border-[#20273d]">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Smart zoom</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {smartZoom ? "Auto-punches in 1.1x during emotional peak hooks" : "Static fixed camera framing"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSmartZoom(!smartZoom);
                    showToast(smartZoom ? "Smart zoom disabled" : "Smart zoom enabled", "info");
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    smartZoom ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    smartZoom ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* 7. Background music */}
              <div className="p-3 rounded-xl bg-[#141825] border border-[#20273d] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Background music</span>
                  </div>
                  <button
                    onClick={() => {
                      setBackgroundMusic(!backgroundMusic);
                      showToast(backgroundMusic ? "Background music muted" : "Background music enabled", "info");
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      backgroundMusic ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      backgroundMusic ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {backgroundMusic && (
                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <select
                      value={musicTrack}
                      onChange={(e) => setMusicTrack(e.target.value)}
                      className="bg-[#0f121d] border border-[#242e47] text-white rounded-lg px-2.5 py-1 text-xs outline-none w-full sm:w-auto"
                    >
                      <option value="Cyber Lofi Beat">Cyber Lofi Beat</option>
                      <option value="Tech Ambient Horizon">Tech Ambient Horizon</option>
                      <option value="Viral Upbeat Pulse">Viral Upbeat Pulse</option>
                    </select>

                    <div className="flex items-center gap-2 w-full sm:w-44">
                      <span className="text-[10px] text-slate-400 font-mono">Vol: {musicVolume}%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={musicVolume}
                        onChange={(e) => setMusicVolume(Number(e.target.value))}
                        className="w-full accent-cyan-400 h-1 bg-[#1a2030] rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Word-Level Interactive Transcript Editor */}
            <div className="pt-4 border-t border-[#1b2234]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  Word-Level Caption Editor (Click word to tweak)
                </span>
                <span className="text-[10px] font-mono text-slate-400">14 Words</span>
              </div>

              <div className="p-3 bg-[#0d101a] border border-[#1d2436] rounded-xl flex flex-wrap gap-1.5">
                {transcriptWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEditWord(idx)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      editingWordIndex === idx 
                        ? 'bg-purple-600 text-white ring-2 ring-purple-400' 
                        : 'bg-[#151928] text-slate-300 hover:text-white hover:bg-[#1e2438] border border-[#232b40]'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>

              {/* Editing Word Input */}
              {editingWordIndex !== null && (
                <div className="mt-2 flex items-center gap-2 p-2 bg-[#161a29] rounded-xl border border-purple-500/50">
                  <span className="text-xs text-slate-400 font-mono">Edit word #{editingWordIndex + 1}:</span>
                  <input
                    type="text"
                    value={editingWordValue}
                    onChange={(e) => setEditingWordValue(e.target.value)}
                    className="bg-[#0f121d] border border-[#26314c] rounded-lg px-2 py-1 text-xs text-white outline-none flex-1"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveWord}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingWordIndex(null)}
                    className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
