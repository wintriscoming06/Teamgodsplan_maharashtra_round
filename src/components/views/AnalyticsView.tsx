import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Sparkles, Share2, ArrowUpRight } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <BarChart3 className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono font-bold uppercase text-emerald-400">
            VIRAL DISTRIBUTION TELEMETRY
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white">Cross-Platform Analytics</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time retention velocity, 3-second hook conversion, and audience engagement across 5 ecosystems.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#121520] border border-[#1f2538]">
          <div className="text-xs text-slate-400 mb-1">Total Cross-Platform Views</div>
          <div className="text-2xl font-bold font-mono text-white">1,428,940</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">+34.2% vs last cycle</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121520] border border-[#1f2538]">
          <div className="text-xs text-slate-400 mb-1">Average 3s Hook Retention</div>
          <div className="text-2xl font-bold font-mono text-cyan-400">76.4%</div>
          <div className="text-[11px] text-slate-400 mt-1">Benchmark: 42%</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121520] border border-[#1f2538]">
          <div className="text-xs text-slate-400 mb-1">Total Shares & Bookmarks</div>
          <div className="text-2xl font-bold font-mono text-purple-400">48,210</div>
          <div className="text-[11px] text-purple-400 mt-1">High bookmark velocity</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121520] border border-[#1f2538]">
          <div className="text-xs text-slate-400 mb-1">Conversion to Longform</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">8.6%</div>
          <div className="text-[11px] text-slate-400 mt-1">Top 5% Creators</div>
        </div>
      </div>

      {/* Retention Curve Chart Simulation */}
      <div className="p-5 rounded-2xl bg-[#121520] border border-[#1f2538] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Second-by-Second Audience Retention Curve</h3>
            <p className="text-xs text-slate-400">Comparing AI Smart-Trimmed clip vs original continuous stream</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              AI Dynamic Cut (94 Score)
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              Standard Linear Cut
            </span>
          </div>
        </div>

        <div className="h-48 w-full bg-[#0a0c12] rounded-xl p-4 border border-[#1b2234] flex flex-col justify-between relative overflow-hidden">
          <svg viewBox="0 0 500 120" className="w-full h-full" preserveAspectRatio="none">
            {/* Standard linear falloff */}
            <path
              d="M0,10 Q100,50 250,90 T500,110"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* AI Dynamic cut curve */}
            <path
              d="M0,8 Q50,12 100,15 T200,22 T350,30 T500,45"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3.5"
            />
            {/* Fill gradient */}
            <path
              d="M0,8 Q50,12 100,15 T200,22 T350,30 T500,45 L500,120 L0,120 Z"
              fill="url(#ret-gradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="ret-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-[#181d2c]">
            <span>00:00 (Hook)</span>
            <span>00:15 (Argument)</span>
            <span>00:30 (Climax)</span>
            <span>00:46 (CTA)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
