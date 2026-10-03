import React from 'react';
import { Check, Sparkles, UploadCloud, Film, SlidersHorizontal, Repeat2 } from 'lucide-react';
import { WorkflowStep } from '../../types';

interface StepHeaderProps {
  currentStep: WorkflowStep;
  onSelectStep: (step: WorkflowStep) => void;
  completedSteps?: WorkflowStep[];
}

export const StepHeader: React.FC<StepHeaderProps> = ({ 
  currentStep, 
  onSelectStep,
  completedSteps = []
}) => {
  const steps: { id: WorkflowStep; number: string; title: string; subtitle: string; icon: any }[] = [
    { id: 'upload', number: '01', title: 'Upload', subtitle: 'STEP ACTIVE', icon: UploadCloud },
    { id: 'analyze', number: '02', title: 'Analyze', subtitle: 'AI Scan', icon: Sparkles },
    { id: 'clips', number: '03', title: 'Clips', subtitle: 'Viral Curation', icon: Film },
    { id: 'edit', number: '04', title: 'Edit', subtitle: 'Captions & Zoom', icon: SlidersHorizontal },
    { id: 'repurpose', number: '05', title: 'Repurpose', subtitle: 'Multi-Platform', icon: Repeat2 },
  ];

  const stepOrder: WorkflowStep[] = ['upload', 'analyze', 'clips', 'edit', 'repurpose'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="w-full bg-[#111420]/80 backdrop-blur-md border border-[#1f2538] rounded-2xl p-2.5 mb-6 shadow-xl">
      <div className="flex items-center justify-between relative px-2">
        {steps.map((step, idx) => {
          const isCurrent = step.id === currentStep;
          const isDone = completedSteps.includes(step.id) || idx < currentIndex;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <button
                onClick={() => onSelectStep(step.id)}
                className={`group flex items-center gap-3 py-1.5 px-3 rounded-xl transition-all duration-200 text-left ${
                  isCurrent 
                    ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6]/60 shadow-glow-sm'
                    : isDone
                    ? 'hover:bg-[#161a29] text-slate-300'
                    : 'hover:bg-[#161a29]/50 text-slate-400 opacity-80'
                }`}
              >
                {/* Indicator Badge */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  isCurrent
                    ? 'bg-[#8b5cf6] text-white shadow-glow-purple'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#181d2c] text-slate-400 border border-[#232b40]'
                }`}>
                  {isDone && !isCurrent ? (
                    <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Text Labels */}
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-semibold ${
                      isCurrent ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}
                  </div>
                  <div className={`text-[10px] font-medium tracking-tight ${
                    isCurrent 
                      ? 'text-purple-300 uppercase font-semibold' 
                      : isDone 
                      ? 'text-emerald-400/80' 
                      : 'text-slate-400'
                  }`}>
                    {isCurrent ? 'STEP ACTIVE' : isDone ? 'Done' : step.subtitle}
                  </div>
                </div>
              </button>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-2 h-[2px] bg-[#1d2335] rounded-full overflow-hidden hidden md:block">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      idx < currentIndex 
                        ? 'bg-gradient-to-r from-emerald-500 to-purple-500 w-full' 
                        : idx === currentIndex 
                        ? 'bg-gradient-to-r from-purple-500 to-[#1d2335] w-2/3 animate-pulse'
                        : 'w-0'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
