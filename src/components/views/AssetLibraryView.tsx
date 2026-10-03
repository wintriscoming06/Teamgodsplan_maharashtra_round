import React, { useState } from 'react';
import { FolderOpen, Film, Music, FileText, Download, Play, Trash2, Search, Filter } from 'lucide-react';
import { useToast } from '../common/Toast';

export const AssetLibraryView: React.FC = () => {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<'all' | 'video' | 'audio' | 'captions'>('all');

  const assets = [
    { id: 1, name: 'Keynote_2025_ProRes422_Master.mp4', type: 'video', size: '1.4 GB', duration: '20:14', format: '4K UHD', date: 'Today, 14:30' },
    { id: 2, name: 'Elena_Vance_Isolated_Voice_320k.wav', type: 'audio', size: '82 MB', duration: '20:14', format: '48kHz Stereo', date: 'Today, 14:32' },
    { id: 3, name: 'Clip_01_AI_Replacement_Myth_9x16.mp4', type: 'video', size: '48 MB', duration: '00:46', format: '1080x1920', date: 'Today, 14:35' },
    { id: 4, name: 'Keynote_Full_Transcript_WhisperV3.srt', type: 'captions', size: '124 KB', duration: '4,120 words', format: 'SRT Subtitles', date: 'Today, 14:33' },
    { id: 5, name: 'Clip_02_Senior_Engineers_9x16.mp4', type: 'video', size: '42 MB', duration: '00:45', format: '1080x1920', date: 'Today, 14:36' },
    { id: 6, name: 'Cyber_Lofi_Beat_BGM_Loop.mp3', type: 'audio', size: '14 MB', duration: '03:20', format: '320kbps MP3', date: 'Yesterday' }
  ];

  const filtered = assets.filter(a => filterType === 'all' || a.type === filterType);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
              <FolderOpen className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase text-cyan-400">
              CLOUD ASSET VAULT
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">Asset Library</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Original master footage, extracted multi-track stems, and 9:16 vertical proxies.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          {(['all', 'video', 'audio', 'captions'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterType === t
                  ? 'bg-purple-600 text-white shadow-glow-sm'
                  : 'bg-[#141824] text-slate-400 hover:text-white border border-[#232b40]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(asset => (
          <div
            key={asset.id}
            className="p-4 rounded-2xl bg-[#121520] border border-[#1f2538] hover:border-[#2a344d] transition-all shadow-md flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#181d2e] border border-[#27324d] text-cyan-400">
                  {asset.type === 'video' && <Film className="w-4 h-4" />}
                  {asset.type === 'audio' && <Music className="w-4 h-4" />}
                  {asset.type === 'captions' && <FileText className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-mono bg-[#191f30] text-slate-400 px-2 py-0.5 rounded border border-[#28324e]">
                  {asset.format}
                </span>
              </div>

              <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                {asset.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                <span>{asset.size}</span>
                <span>{asset.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1b2234] mt-3">
              <span className="text-[10px] text-slate-500 font-mono">{asset.date}</span>
              <button
                onClick={() => showToast(`Downloaded ${asset.name}`, 'success')}
                className="p-1.5 rounded-lg bg-[#161a29] hover:bg-purple-600 text-slate-300 hover:text-white transition-colors"
                title="Download file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
