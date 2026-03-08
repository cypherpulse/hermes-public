import { ArrowRight, Shield, Beaker, Coins, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NetworkCardProps {
  type: 'mainnet' | 'testnet';
  title: string;
  description: string;
  chains: number;
  warning?: string;
  onClick: () => void;
}

export function NetworkCard({
  type,
  title,
  description,
  chains,
  warning,
  onClick,
}: NetworkCardProps) {
  const isMainnet = type === 'mainnet';

  return (
    <Card
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group',
        isMainnet 
          ? 'border-mainnet glow-mainnet hover:border-[hsl(var(--mainnet-gold)/0.5)]' 
          : 'border-testnet glow-testnet hover:border-[hsl(var(--testnet-blue)/0.5)]'
      )}
      onClick={onClick}
    >
      {/* Gradient background overlay */}
      <div
        className={cn(
          'absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity',
          isMainnet ? 'gradient-mainnet' : 'gradient-testnet'
        )}
      />

      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-semibold',
              isMainnet
                ? 'border-[hsl(var(--mainnet-gold))] text-[hsl(var(--mainnet-gold))]'
                : 'border-[hsl(var(--testnet-blue))] text-[hsl(var(--testnet-blue))]'
            )}
          >
            {isMainnet ? (
              <>
                <Coins className="w-3 h-3 mr-1" />
                Real Funds
              </>
            ) : (
              <>
                <Beaker className="w-3 h-3 mr-1" />
                Test Tokens
              </>
            )}
          </Badge>
          <div
            className={cn(
              'p-2 rounded-full',
              isMainnet 
                ? 'bg-[hsl(var(--mainnet-gold)/0.1)]' 
                : 'bg-[hsl(var(--testnet-blue)/0.1)]'
            )}
          >
            {isMainnet ? (
              <Shield className="w-5 h-5 text-[hsl(var(--mainnet-gold))]" />
            ) : (
              <Beaker className="w-5 h-5 text-[hsl(var(--testnet-blue))]" />
            )}
          </div>
        </div>

        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Chain count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {[...Array(Math.min(chains, 4))].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-6 h-6 rounded-full border-2 border-background',
                  isMainnet
                    ? 'bg-gradient-to-br from-[hsl(var(--mainnet-gold))] to-[hsl(var(--mainnet-amber))]'
                    : 'bg-gradient-to-br from-[hsl(var(--testnet-blue))] to-[hsl(var(--testnet-purple))]'
                )}
              />
            ))}
            {chains > 4 && (
              <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                +{chains - 4}
              </div>
            )}
          </div>
          <span>{chains} chains supported</span>
        </div>

        {/* Warning badge */}
        {warning && (
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
              isMainnet
                ? 'bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]'
                : 'bg-[hsl(var(--info)/0.1)] text-[hsl(var(--info))]'
            )}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{warning}</span>
          </div>
        )}

        {/* CTA Button */}
        <Button
          className={cn(
            'w-full group/btn',
            isMainnet
              ? 'gradient-mainnet text-[hsl(var(--mainnet-gold-foreground))] hover:opacity-90'
              : 'gradient-testnet text-white hover:opacity-90'
          )}
        >
          Enter {title}
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
