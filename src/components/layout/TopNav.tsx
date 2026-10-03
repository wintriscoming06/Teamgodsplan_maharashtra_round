import React, { useState } from 'react';
import { Search, Plus, Bell, Settings, ChevronRight, LogOut, User, Sparkles } from 'lucide-react';
import { useToast } from '../common/Toast';

interface TopNavProps {
  onNewProject: () => void;
  onSearch?: (query: string) => void;
  onSignOut?: () => void;
  userName?: string;
  userHandle?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ 
  onNewProject, 
  onSearch,
  onSignOut,
  userName = 'Elena Vance',
  userHandle = 'elenacreates'
}) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notifications = [
    { id: 1, title: 'AI Synthesis Completed', desc: '7 high-retention clips extracted from "The Future of Software Development"', time: '12m ago', unread: true },
    { id: 2, title: 'Algorithmic Insight', desc: 'Under 3.2s hooks pacing 3.4x higher on YouTube Shorts', time: '1h ago', unread: true },
    { id: 3, title: 'Scheduled Reel Published', desc: 'Clip #1 successfully pushed to Instagram & TikTok', time: '3h ago', unread: false }
  ];

  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="h-16 border-b border-[#1f2538] bg-[#0c0e14]/90 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="hover:text-slate-200 cursor-pointer">Workspace</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-white font-medium">Video Suite</span>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search clips, transcripts, hooks..."
            className="w-full bg-[#131722] hover:bg-[#161b29] focus:bg-[#161b29] border border-[#21283d] focus:border-purple-500/80 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 bg-[#1d2335] px-1.5 py-0.5 rounded border border-[#2e3752]">
            /
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* New Project Button */}
        <button
          onClick={onNewProject}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-purple transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#141824] hover:bg-[#1b2133] border border-[#222b40] text-slate-300 hover:text-white transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-[#151928] border border-[#27324c] rounded-2xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/50 mb-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800">2 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2 rounded-lg bg-[#111422] hover:bg-[#181d2f] transition-colors cursor-pointer text-left">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{n.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() => showToast("Settings: Neural cluster GPU active at 14x velocity", "info")}
          className="p-2 rounded-xl bg-[#141824] hover:bg-[#1b2133] border border-[#222b40] text-slate-300 hover:text-white transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Avatar with dropdown */}
        <div className="relative">
          <div 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px] cursor-pointer hover:scale-105 transition-transform"
            title={userName}
          >
            <div className="w-full h-full rounded-full bg-[#131622] flex items-center justify-center text-xs font-bold text-white">
              {initials}
            </div>
          </div>

          {showUserDropdown && (
            <div className="absolute right-0 top-12 w-56 bg-[#161a29] border border-[#27324c] rounded-2xl shadow-2xl p-2 z-50 animate-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-700/50 mb-1">
                <div className="text-xs font-bold text-white truncate">{userName}</div>
                <div className="text-[11px] text-slate-400 font-mono truncate">@{userHandle}</div>
              </div>

              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  showToast("Switched to Pro Studio plan", "info");
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-purple-600/20 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Pro Studio Tier</span>
              </button>

              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  onSignOut?.();
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-600/20 rounded-lg flex items-center gap-2 border-t border-slate-700/50 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out / Switch Account</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
