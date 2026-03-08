import { Check, Loader2, Circle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { MainnetChainId } from '@/config/mainnet-chains';

interface Step {
  from: MainnetChainId;
  to: MainnetChainId;
  protocol: string;
}

interface TransactionProgressProps {
  steps: Step[];
  currentStep: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  txHash?: string;
  explorerUrl?: string;
}

export function TransactionProgress({
  steps,
  currentStep,
  status,
  txHash,
  explorerUrl,
}: TransactionProgressProps) {
  return (
    <Card className="border-[hsl(var(--mainnet-gold)/0.3)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          Transaction Progress
          {status === 'in-progress' && (
            <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--mainnet-gold))]" />
          )}
          {status === 'completed' && (
            <Check className="w-4 h-4 text-[hsl(var(--success))]" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-start gap-4">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors',
                      isCompleted && 'bg-[hsl(var(--success))] border-[hsl(var(--success))]',
                      isCurrent && 'border-[hsl(var(--mainnet-gold))] bg-[hsl(var(--mainnet-gold)/0.1)]',
                      isPending && 'border-muted bg-muted'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--mainnet-gold))]" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-0.5 h-8 mt-1',
                        isCompleted ? 'bg-[hsl(var(--success))]' : 'bg-muted'
                      )}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {step.from} → {step.to}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {step.protocol}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isCompleted
                      ? 'Completed'
                      : isCurrent
                      ? 'Processing...'
                      : 'Waiting'}
                  </p>
                  {isCurrent && txHash && explorerUrl && (
                    <a
                      href={explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[hsl(var(--mainnet-gold))] hover:underline flex items-center gap-1 mt-1"
                    >
                      View transaction
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
