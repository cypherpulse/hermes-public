import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/components/landing/HeroSection';
import { NetworkCard } from '@/components/landing/NetworkCard';
import { ChainLogos } from '@/components/landing/ChainLogos';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--mainnet-gold)/0.05)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[hsl(var(--testnet-blue)/0.05)] rounded-full blur-3xl" />
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Network Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <NetworkCard
              type="mainnet"
              title="Mainnet"
              description="Bridge real USDC across production networks with live funds and instant finality."
              chains={10}
              warning="Uses real funds. Double-check all transactions."
              onClick={() => navigate('/mainnet')}
            />
            <NetworkCard
              type="testnet"
              title="Testnet"
              description="Test your integration with free testnet tokens. Perfect for development and learning."
              chains={10}
              warning="Test tokens only. No real value."
              onClick={() => navigate('/testnet')}
            />
          </div>

          {/* Chain Logos */}
          <ChainLogos />

          {/* Footer info */}
          <div className="text-center space-y-4 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Powered by{' '}
              <a
                href="https://developers.circle.com/stablecoins/docs/cctp-getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                Circle CCTP
              </a>
              {' '}and{' '}
              <a
                href="https://www.xlink.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                xReserve
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 Hermes Bridge. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
