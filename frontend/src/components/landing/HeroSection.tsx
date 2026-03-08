import { Zap, ArrowLeftRight, Shield, Globe } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="text-center space-y-6">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl gradient-mainnet flex items-center justify-center shadow-lg">
            <ArrowLeftRight className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[hsl(var(--success))] flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Hermes Bridge
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Cross-Chain Made Simple
        </p>
      </div>

      {/* Tagline */}
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Bridge USDC seamlessly across 10 blockchains and Stacks. Powered by Circle's CCTP 
        and xReserve for secure, fast, and reliable cross-chain transfers.
      </p>

      {/* Features row */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-[hsl(var(--success))]" />
          <span>Audited & Secure</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-[hsl(var(--mainnet-gold))]" />
          <span>Fast Settlement</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="w-4 h-4 text-[hsl(var(--testnet-blue))]" />
          <span>Multichain Support</span>
        </div>
      </div>
    </div>
  );
}
