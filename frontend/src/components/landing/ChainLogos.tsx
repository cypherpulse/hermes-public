import { cn } from '@/lib/utils';

interface Chain {
  name: string;
  icon: string;
  color: string;
}

const mainnetChains: Chain[] = [
  { name: 'Ethereum', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900941/download_6_b0zu0z.png', color: '#627EEA' },
  { name: 'Base', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_hfl3h3.png', color: '#0052FF' },
  { name: 'Arbitrum', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900371/download_1_a5572s.png', color: '#28A0F0' },
  { name: 'Avalanche', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/avalanche-avax-logo_nkju6o.png', color: '#E84142' },
  { name: 'Polygon', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_3_pnzwd3.png', color: '#8247E5' },
  { name: 'Optimism', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900371/download_2_sv0thd.png', color: '#FF0420' },
  { name: 'Linea', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_5_fwekae.png', color: '#61DFFF' },
  { name: 'Unichain', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_ppknwm.jpg', color: '#FF007A' },
  { name: 'World Chain', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1769169925/worldcoin_mvuyxj.jpg', color: '#000000' },
  { name: 'Stacks', icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1769170000/stacks_logo_ddkhwc.png', color: '#5546FF' },
];

interface ChainLogosProps {
  className?: string;
}

export function ChainLogos({ className }: ChainLogosProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <p className="text-sm text-muted-foreground text-center">
        Supported Networks
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {mainnetChains.map((chain) => (
          <div
            key={chain.name}
            className="group relative"
          >
            <div
              className="w-10 h-10 rounded-full bg-card border-2 border-border overflow-hidden 
                         transition-transform duration-200 hover:scale-110 hover:shadow-lg"
              style={{ 
                boxShadow: `0 0 0 0 ${chain.color}20`,
              }}
            >
              <img
                src={chain.icon}
                alt={chain.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 
                          bg-popover border border-border rounded text-xs font-medium 
                          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                          whitespace-nowrap z-10 shadow-md">
              {chain.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
