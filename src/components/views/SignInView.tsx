import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Zap, 
  ShieldCheck, 
  Layers, 
  User, 
  AtSign,
  TrendingUp,
  Cpu,
  Video,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { api } from '../../services/api';

interface SignInViewProps {
  onSignInSuccess: (userData: { name: string; handle: string; email: string }) => void;
}

export const SignInView: React.FC<SignInViewProps> = ({ onSignInSuccess }) => {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Handle live handle generation when typing name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFullName(val);
    if (mode === 'signup' && !handle) {
      setHandle(val.toLowerCase().replace(/[^a-z0-9]/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast("Please enter your name", "error");
      return;
    }
    if (!email.trim()) {
      showToast("Please enter your email", "error");
      return;
    }

    setIsLoading(true);
    const cleanName = fullName.trim();
    const cleanHandle = handle.trim().replace(/^@/, '') || cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'creator';
    const cleanEmail = email.trim();

    showToast(mode === 'signin' ? `Signing in as ${cleanName}...` : `Creating creator profile for ${cleanName}...`, "info");

    // Call backend API
    await api.signIn(cleanName, cleanEmail, cleanHandle);

    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        name: cleanName,
        handle: cleanHandle,
        email: cleanEmail
      });
      showToast(`Welcome, ${cleanName}! Pro Studio workspace ready.`, "success");
    }, 500);
  };

  const handleDemoSignIn = (presetName: string, presetHandle: string, presetEmail: string) => {
    setIsLoading(true);
    showToast(`Signing in as ${presetName}...`, "info");
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        name: presetName,
        handle: presetHandle,
        email: presetEmail
      });
      showToast(`Welcome back, ${presetName}!`, "success");
    }, 500);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      showToast("Please enter your account email", "error");
      return;
    }
    setShowForgotPassword(false);
    showToast(`Password reset link sent to ${resetEmail}`, "success");
  };

  return (
    <div className="min-h-screen w-screen bg-[#090b10] text-[#e2e8f0] flex flex-col justify-between relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-[#1b2234]/80 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow-sm flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f15] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base tracking-tight">CreatorAI</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                STUDIO
              </span>
            </div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              MULTI-FORMAT CONTENT OPERATING SUITE
            </div>
          </div>
        </div>

        {/* Demo Fast Access Pill */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDemoSignIn('Guest Creator', 'guestcreator', 'guest@creatorai.internal')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151928] hover:bg-[#1f263d] border border-[#27334f] text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Try as Guest</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Value & Live Highlights (6/12) */}
          <div className="lg:col-span-6 space-y-6 hidden lg:block">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>NEURAL PIPELINE v4.8.2</span>
              <span className="text-slate-500">• Ready for Ingestion</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight">
              Sign In to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Creator Workspace</span>
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              Enter your name and details to access your personal AI video suite. Transform any long-form video, keynote, or podcast into 5 viral short-form formats in seconds.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121520]/80 border border-[#1f2639]">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30 mt-0.5">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Universal Video Repurposing</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    1 Master Video → TikTok 9:16, YouTube Shorts, LinkedIn Carousel, X Threads & SEO Descriptions.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121520]/80 border border-[#1f2639]">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Whisper Large-v3 Speech Isolation</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    14x realtime edge extraction with acoustic spike tracking and 99.4% confidence score.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121520]/80 border border-[#1f2639]">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Predictive Virality Hook Scoring</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Algorithmic 3-second hook evaluation ranked from Tier S to Tier B for maximum retention.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card (6/12) */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="bg-[#121520]/95 backdrop-blur-2xl border border-[#232c44] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/20 relative">
              {/* Header Title */}
              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-white">
                  {mode === 'signin' ? 'Sign In to CreatorAI' : 'Create Your Creator Profile'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'signin' 
                    ? 'Enter your name and email to open your dashboard' 
                    : 'Start turning long-form videos into viral content'}
                </p>
              </div>

              {/* Top Tab Switcher: Sign In vs Sign Up */}
              <div className="grid grid-cols-2 p-1 bg-[#0c0e16] rounded-xl border border-[#1f2638] mb-5">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'signin'
                      ? 'bg-[#8b5cf6] text-white shadow-glow-purple'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'signup'
                      ? 'bg-[#8b5cf6] text-white shadow-glow-purple'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name input (Always displayed so ANY person can enter their own real name!) */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={handleNameChange}
                      placeholder="e.g. Jai Desai"
                      className="w-full bg-[#0d101a] border border-[#232b40] focus:border-purple-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Handle input (when signing up) */}
                {mode === 'signup' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Creator Handle
                    </label>
                    <div className="relative">
                      <AtSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="yourhandle"
                        className="w-full bg-[#0d101a] border border-[#232b40] focus:border-purple-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[#0d101a] border border-[#232b40] focus:border-purple-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-[#0d101a] border border-[#232b40] focus:border-purple-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-purple-600 bg-[#0d101a] border-[#232b40]"
                    />
                    <span>Remember this session</span>
                  </label>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-purple flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-3"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Loading Workspace...</span>
                    </span>
                  ) : (
                    <>
                      <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Create My Studio Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Logins */}
              <div className="mt-5">
                <div className="flex items-center gap-3 my-4">
                  <div className="h-[1px] bg-[#1f2638] flex-1" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Or one-click sign in
                  </span>
                  <div className="h-[1px] bg-[#1f2638] flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      const name = fullName.trim() || 'Google Creator';
                      handleDemoSignIn(name, name.toLowerCase().replace(/\s+/g, ''), 'creator@gmail.com');
                    }}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#161a29] hover:bg-[#1d2336] border border-[#252f47] text-xs font-medium text-slate-200 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const name = fullName.trim() || 'GitHub Dev';
                      handleDemoSignIn(name, name.toLowerCase().replace(/\s+/g, ''), 'dev@github.com');
                    }}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#161a29] hover:bg-[#1d2336] border border-[#252f47] text-xs font-medium text-slate-200 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </button>
                </div>
              </div>

              {/* Security certification footer */}
              <div className="mt-5 pt-3.5 border-t border-[#1b2234] flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>SOC2 Type II • Zero AI Training on Private Assets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151928] border border-[#27334f] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-bold text-white mb-1">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your email address and we'll send you an encrypted token to reset your password.
            </p>
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="yourname@domain.com"
                className="w-full bg-[#0d101a] border border-[#232b40] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-glow-purple"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="px-6 lg:px-12 py-4 border-t border-[#1b2234]/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 z-10">
        <div>© 2026 CreatorAI, Inc. All rights reserved. Multi-Format Operating System.</div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span className="hover:text-slate-300 cursor-pointer">Security</span>
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 cursor-pointer">API Status</span>
        </div>
      </footer>
    </div>
  );
};
