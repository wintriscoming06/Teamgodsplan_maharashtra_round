import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Edit3, 
  Download, 
  Sparkles, 
  FileText, 
  Save
} from 'lucide-react';
import { INITIAL_REPURPOSED_CARDS } from '../../data/mockData';
import { StepHeader } from '../common/StepHeader';
import type { WorkflowStep, RepurposedCard, Clip } from '../../types';
import { useToast } from '../common/Toast';

interface RepurposeStudioViewProps {
  clip?: Clip;
  onSelectStep: (step: WorkflowStep) => void;
}

export const RepurposeStudioView: React.FC<RepurposeStudioViewProps> = ({ 
  clip,
  onSelectStep
}) => {
  const { showToast } = useToast();
  const [cards, setCards] = useState<RepurposedCard[]>(INITIAL_REPURPOSED_CARDS);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit draft state
  const [draftTitle, setDraftTitle] = useState('');
  const [draftCaption, setDraftCaption] = useState('');
  const [draftHashtags, setDraftHashtags] = useState('');

  const getPlatformIcon = (platform: RepurposedCard['platform']) => {
    switch (platform) {
      case 'reel':
        return (
          <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'short':
        return (
          <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'x':
        return (
          <svg className="w-4 h-4 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'youtube_desc':
        return <FileText className="w-4 h-4 text-red-400" />;
    }
  };

  const getPlatformBadgeColor = (platform: RepurposedCard['platform']) => {
    switch (platform) {
      case 'reel':
        return 'bg-pink-950/70 text-pink-300 border-pink-700/60';
      case 'short':
        return 'bg-red-950/70 text-red-300 border-red-700/60';
      case 'linkedin':
        return 'bg-blue-950/70 text-blue-300 border-blue-700/60';
      case 'x':
        return 'bg-slate-900 text-slate-200 border-slate-700';
      case 'youtube_desc':
        return 'bg-red-950/70 text-orange-300 border-red-800';
    }
  };

  const handleCopy = (card: RepurposedCard) => {
    const fullText = `${card.title}\n\n${card.caption}\n\n${card.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(card.id);
    showToast(`Copied ${card.platformName} to clipboard!`, 'success');

    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleStartEdit = (card: RepurposedCard) => {
    setEditingCardId(card.id);
    setDraftTitle(card.title);
    setDraftCaption(card.caption);
    setDraftHashtags(card.hashtags.join(' '));
  };

  const handleSaveEdit = (cardId: string) => {
    setCards(prev => prev.map(c => {
      if (c.id === cardId) {
        return {
          ...c,
          title: draftTitle,
          caption: draftCaption,
          hashtags: draftHashtags.split(' ').filter(h => h.startsWith('#') || h.length > 0)
        };
      }
      return c;
    }));
    setEditingCardId(null);
    showToast("Changes saved successfully!", "success");
  };

  const handleBatchCopyAll = () => {
    const bundle = cards.map(c => `=== ${c.platformName.toUpperCase()} ===\n${c.title}\n\n${c.caption}\n\n${c.hashtags.join(' ')}\n`).join('\n\n');
    navigator.clipboard.writeText(bundle);
    showToast("Copied all 5 content pieces to clipboard!", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5-Step Workflow Header */}
      <StepHeader 
        currentStep="repurpose" 
        onSelectStep={onSelectStep} 
        completedSteps={['upload', 'analyze', 'clips', 'edit']} 
      />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-md bg-cyan-500 flex items-center justify-center text-[10px] font-mono font-bold text-black">
              05
            </span>
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              Omni Repurpose Engine • 1 Video → 5 Content Pieces
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            {clip ? `Current focus: "${clip.title}"` : 'Source video'} parsed into 5 platform-optimized micro formats with tailored hooks and hashtags.
          </p>
        </div>

        {/* Batch Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBatchCopyAll}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141824] hover:bg-[#1f2639] border border-[#242e47] text-xs font-semibold text-slate-200 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Copy All 5 Pieces</span>
          </button>

          <button
            onClick={() => showToast("Exported all content cards as Markdown (.md)", "success")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141824] hover:bg-[#1f2639] border border-[#242e47] text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export Markdown</span>
          </button>

          <button
            onClick={() => showToast("Simulated scheduling: Posts queued for peak times tomorrow", "success")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-glow-purple transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Schedule to Socials</span>
          </button>
        </div>
      </div>

      {/* Grid of 5 Repurposed Content Pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const isEditing = editingCardId === card.id;
          const isCopied = copiedId === card.id;
          const charCount = card.caption.length + card.title.length;

          return (
            <div
              key={card.id}
              className={`bg-[#121520] border border-[#1f2538] hover:border-[#2a344d] rounded-2xl p-4 shadow-xl flex flex-col justify-between transition-all ${
                card.platform === 'youtube_desc' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1b2234] mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#181c2c] border border-[#252f47]">
                      {getPlatformIcon(card.platform)}
                    </div>
                    <span className="font-bold text-xs text-white">
                      {card.platformName}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getPlatformBadgeColor(card.platform)}`}>
                      {card.aspectRatio}
                    </span>
                  </div>

                  {card.characterLimit && (
                    <span className={`text-[10px] font-mono ${charCount > card.characterLimit ? 'text-rose-400' : 'text-slate-400'}`}>
                      {charCount}/{card.characterLimit}
                    </span>
                  )}
                </div>

                {/* Content View / Edit Mode */}
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400">Title / Hook</label>
                      <input
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        className="w-full bg-[#0d101a] border border-[#232b40] rounded-lg p-2 text-xs text-white font-medium outline-none mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400">Caption Body</label>
                      <textarea
                        rows={card.platform === 'youtube_desc' ? 8 : 6}
                        value={draftCaption}
                        onChange={(e) => setDraftCaption(e.target.value)}
                        className="w-full bg-[#0d101a] border border-[#232b40] rounded-lg p-2 text-xs text-slate-200 outline-none mt-1 font-sans leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400">Hashtags (Space separated)</label>
                      <input
                        type="text"
                        value={draftHashtags}
                        onChange={(e) => setDraftHashtags(e.target.value)}
                        className="w-full bg-[#0d101a] border border-[#232b40] rounded-lg p-2 text-xs text-cyan-300 font-mono outline-none mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Title */}
                    <h3 className="text-xs font-bold text-white leading-snug">
                      {card.title}
                    </h3>

                    {/* Formatted Caption */}
                    <div className="p-3 bg-[#0d1018] border border-[#1b2234] rounded-xl text-xs text-slate-300 font-sans whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
                      {card.caption}
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {card.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono bg-[#161a29] border border-[#232c42] text-cyan-400 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Specs info */}
                    <div className="text-[10px] font-mono text-slate-500 pt-1">
                      {card.specs}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1b2234] mt-4">
                {isEditing ? (
                  <div className="flex items-center gap-2 w-full justify-end">
                    <button
                      onClick={() => setEditingCardId(null)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(card.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleStartEdit(card)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161a28] hover:bg-[#1f253a] border border-[#232b40] text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleCopy(card)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-glow-sm'
                          : 'bg-[#8b5cf6] hover:bg-purple-600 text-white shadow-glow-purple active:scale-95'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
