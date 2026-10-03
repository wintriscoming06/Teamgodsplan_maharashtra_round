import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Film, 
  SlidersHorizontal, 
  Repeat2, 
  FileText, 
  FolderOpen, 
  BarChart3, 
  Zap, 
  MoreVertical, 
  ChevronDown,
  Sparkles,
  LogIn,
  LogOut
} from 'lucide-react';
import type { NavRoute } from '../../types';
import { useToast } from '../common/Toast';

interface SidebarProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  onSignOut?: () => void;
  userName?: string;
  userHandle?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentRoute, 
  onNavigate,
  onSignOut,
  userName = 'Elena Vance',
  userHandle = 'elenacreates'
}) => {
  const { showToast } = useToast();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'dashboard' as NavRoute, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content-studio' as NavRoute, label: 'Content Studio', icon: Video, badge: 'UPLOAD' },
    { id: 'ai-clip-studio' as NavRoute, label: 'AI Clip Studio', icon: Film },
    { id: 'ai-editor' as NavRoute, label: 'AI Editor', icon: SlidersHorizontal },
    { id: 'repurpose-studio' as NavRoute, label: 'Repurpose Studio', icon: Repeat2 },
    { id: 'script-generator' as NavRoute, label: 'Script Generator', icon: FileText },
    { id: 'asset-library' as NavRoute, label: 'Asset Library', icon: FolderOpen },
    { id: 'analytics' as NavRoute, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0d0f15] border-r border-[#1f2538] flex flex-col h-screen select-none shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-4 pb-3 flex items-center justify-between border-b border-[#1f2538]/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow-sm flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f15] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base tracking-tight">CreatorAI</span>
            </div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              MULTI-FORMAT SUITE
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="px-3 pt-3 pb-2 relative">
        <button
          onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#141824] hover:bg-[#1a2030] border border-[#232b40] text-sm text-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-medium text-xs text-white">Pro Studio</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {showWorkspaceMenu && (
          <div className="absolute top-12 left-3 right-3 bg-[#161a29] border border-[#2a344f] rounded-lg shadow-2xl p-1 z-40">
            <div className="px-3 py-1.5 text-[11px] text-slate-400 font-semibold uppercase">Workspaces</div>
            <button
              onClick={() => {
                setShowWorkspaceMenu(false);
                showToast("Active Workspace: Pro Studio", "info");
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-white hover:bg-purple-600/20 rounded flex items-center justify-between"
            >
              <span>Pro Studio (Active)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </button>
            <button
              onClick={() => {
                setShowWorkspaceMenu(false);
                showToast("Switched to Personal Creator Pod", "info");
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-purple-600/20 rounded"
            >
              Elena's Pod
            </button>
            <button
              onClick={() => {
                setShowWorkspaceMenu(false);
                showToast("Workspace settings opened", "info");
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-purple-400 hover:bg-purple-600/20 rounded border-t border-slate-700/50 mt-1"
            >
              + Create New Studio
            </button>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#8b5cf6] text-white shadow-glow-purple font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-[#161a28]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="text-xs">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Area: AI Credits & Profile */}
      <div className="p-3 border-t border-[#1f2538] space-y-3">
        {/* Credits Box */}
        <div className="bg-[#121521] border border-[#1f273d] rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              AI Credits
            </span>
            <span className="text-cyan-400 font-mono font-bold text-xs">72%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#1b2133] h-1.5 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500" 
              style={{ width: '72%' }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
            <span>18/25 hrs processed</span>
          </div>
          <button
            onClick={() => showToast("Upgrade plan dialog: Unlimited H100 tier unlocked", "success")}
            className="w-full py-1.5 px-3 rounded-lg bg-[#181d2e] hover:bg-[#22293f] border border-[#2b3552] text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            Upgrade Plan
          </button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#141824] transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs border border-white/20">
                  {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0d0f15]"></span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">{userName}</div>
                <div className="text-[11px] text-slate-400 truncate">@{userHandle}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
              title="Profile menu"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {showProfileMenu && (
            <div className="absolute bottom-12 left-0 right-0 bg-[#161a29] border border-[#2a344f] rounded-lg shadow-2xl p-1 z-40">
              <button 
                onClick={() => { setShowProfileMenu(false); showToast("Profile settings opened", "info"); }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-purple-600/20 rounded"
              >
                Profile Settings
              </button>
              <button 
                onClick={() => { setShowProfileMenu(false); showToast("Connected channels: YouTube, TikTok, LinkedIn, X", "info"); }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-purple-600/20 rounded"
              >
                Connected Accounts
              </button>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  onSignOut?.();
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-600/20 rounded border-t border-slate-700/50 mt-1 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
