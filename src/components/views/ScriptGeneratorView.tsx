import React, { useState } from 'react';
import { Sparkles, Copy, Wand2, FileText, Check, ArrowRight } from 'lucide-react';
import { useToast } from '../common/Toast';

export const ScriptGeneratorView: React.FC = () => {
  const { showToast } = useToast();
  const [topic, setTopic] = useState('Why AI agents will replace junior frontend engineers first');
  const [format, setFormat] = useState('60s Viral Short');
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptOutput, setScriptOutput] = useState(`[00:00 - 00:03 HOOK]
(Camera punches in, serious tone)
"If your current job is translating Figma mockups into CSS flexbox... you have 18 months left."

[00:03 - 00:15 THE CONTRARIAN TRUTH]
"Here's what nobody in Silicon Valley wants to admit out loud:
LLMs don't get tired. They don't misplace semicolons. And vision models can now write pixel-perfect Tailwind faster than you can switch tabs."

[00:15 - 00:35 ARCHITECTURE > SYNTAX]
"The devs who survive aren't the fastest coders.
They're the ones who understand state machines, edge caching, and distributed consistency.
Stop memorizing CSS tricks. Start orchestrating autonomous agent loops."

[00:35 - 00:45 CALL TO ACTION]
"Save this video for your next architectural review.
Follow for weekly breakdowns of the new AI engineering stack."`);

  const handleGenerate = () => {
    setIsGenerating(true);
    showToast("Generating high-retention viral script with Tier S hooks...", "info");
    setTimeout(() => {
      setIsGenerating(false);
      showToast("Script generated successfully!", "success");
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptOutput);
    showToast("Copied script to clipboard!", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-md bg-purple-500/20 text-purple-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono font-bold uppercase text-purple-400">
            NEURAL SCRIPT SYNTHESIZER
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white">Script Generator</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Generate high-retention short form scripts based on real-time viral hook data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-[#121520] border border-[#1f2538] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-bold text-white">Prompt & Parameters</h2>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-400 uppercase">Core Topic / Argument</label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#0d101a] border border-[#232b40] rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-400 uppercase">Script Target Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-[#0d101a] border border-[#232b40] text-xs text-white rounded-xl p-2.5 outline-none"
            >
              <option value="60s Viral Short">60s Viral Short (TikTok / Shorts / Reels)</option>
              <option value="30s Fast Punchline">30s Fast Punchline (High Retention)</option>
              <option value="90s Deep Dive Case Study">90s Deep Dive Case Study</option>
              <option value="Twitter/X Mega Thread">Twitter/X Mega Thread</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs shadow-glow-purple flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isGenerating ? "Synthesizing Viral Hooks..." : "Generate Viral Script"}</span>
          </button>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 bg-[#121520] border border-[#1f2538] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2234] mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Synthesized Teleprompter Output
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181d2e] hover:bg-[#232b40] border border-[#28324e] text-xs font-semibold text-slate-200"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Script</span>
              </button>
            </div>

            <textarea
              rows={14}
              value={scriptOutput}
              onChange={(e) => setScriptOutput(e.target.value)}
              className="w-full bg-[#0d101a] border border-[#1b2234] rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2">
            <span>Pacing: 154 WPM (Optimal Hook Velocity)</span>
            <span className="text-cyan-400 font-semibold">Predicted Retention: 84.6%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
