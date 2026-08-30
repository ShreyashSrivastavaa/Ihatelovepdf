'use client';

import { Check, Upload, Sliders, Cpu, Download } from 'lucide-react';

export type ToolStep = 'upload' | 'options' | 'process' | 'result';

interface StepIndicatorProps {
  currentStep: ToolStep;
  hasFiles: boolean;
  isProcessing: boolean;
  hasResult: boolean;
  onStepClick?: (step: ToolStep) => void;
  isGenerator?: boolean;
}

const STANDARD_STEPS: { id: ToolStep; label: string; icon: React.ElementType }[] = [
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'options', label: 'Options', icon: Sliders },
  { id: 'process', label: 'Process', icon: Cpu },
  { id: 'result', label: 'Download', icon: Download },
];

const GENERATOR_STEPS: { id: ToolStep; label: string; icon: React.ElementType }[] = [
  { id: 'options', label: 'Options', icon: Sliders },
  { id: 'process', label: 'Create', icon: Cpu },
  { id: 'result', label: 'Download', icon: Download },
];

export default function StepIndicator({
  currentStep,
  hasFiles,
  isProcessing,
  hasResult,
  onStepClick,
  isGenerator = false,
}: StepIndicatorProps) {
  const steps = isGenerator ? GENERATOR_STEPS : STANDARD_STEPS;

  const getStepStatus = (stepId: ToolStep): 'completed' | 'active' | 'upcoming' => {
    if (isGenerator) {
      if (stepId === 'options') {
        if (isProcessing || hasResult) return 'completed';
        return 'active';
      }
      if (stepId === 'process') {
        if (hasResult) return 'completed';
        if (isProcessing) return 'active';
        return 'upcoming';
      }
      if (stepId === 'result') {
        if (hasResult) return 'active';
        return 'upcoming';
      }
      return 'upcoming';
    }

    if (stepId === 'upload') {
      if (hasFiles) return 'completed';
      return currentStep === 'upload' ? 'active' : 'upcoming';
    }
    if (stepId === 'options') {
      if (isProcessing || hasResult) return 'completed';
      if (hasFiles && !isProcessing && !hasResult) return 'active';
      return 'upcoming';
    }
    if (stepId === 'process') {
      if (hasResult) return 'completed';
      if (isProcessing) return 'active';
      return 'upcoming';
    }
    if (stepId === 'result') {
      if (hasResult) return 'active';
      return 'upcoming';
    }
    return 'upcoming';
  };

  return (
    <nav
      aria-label="Workflow progress"
      className="w-full py-3 px-2 sm:px-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 backdrop-blur-sm shadow-xs"
    >
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isClickable =
            Boolean(onStepClick) &&
            ((step.id === 'upload') ||
              (step.id === 'options' && (isGenerator || (hasFiles && !isProcessing))) ||
              (step.id === 'result' && hasResult));

          const Icon = step.icon;

          return (
            <li key={step.id} className="flex-1 flex items-center">
              <div
                className={`flex-1 flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-200 ${
                  status === 'active'
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-bold ring-1 ring-[var(--accent-border)]'
                    : status === 'completed'
                    ? 'text-[var(--tx)] font-medium'
                    : 'text-[var(--tx-3)]'
                } ${isClickable ? 'cursor-pointer hover:bg-[var(--bg-subtle)]' : 'cursor-default'}`}
                onClick={() => {
                  if (isClickable && onStepClick) {
                    onStepClick(step.id);
                  }
                }}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && onStepClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onStepClick(step.id);
                  }
                }}
              >
                {/* Step Circle Icon */}
                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 ${
                    status === 'completed'
                      ? 'bg-[var(--success)] text-white shadow-xs'
                      : status === 'active'
                      ? 'bg-[var(--accent)] text-white shadow-sm ring-2 ring-[var(--accent-soft)]'
                      : 'border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-3)]'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                </div>

                {/* Step Text */}
                <div className="min-w-0 hidden xs:block sm:block">
                  <span className="block text-[10px] uppercase tracking-wider text-[var(--tx-3)]">
                    Step {index + 1}
                  </span>
                  <span className="block text-xs truncate">
                    {step.label}
                  </span>
                </div>
              </div>

              {/* Connecting Divider line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-2 sm:w-6 mx-1 sm:mx-2 rounded-full transition-colors ${
                    status === 'completed' ? 'bg-[var(--success)]' : 'bg-[var(--border)]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
