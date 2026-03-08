import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, Wallet, Info, Clock, Fuel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChainSelector } from '@/components/mainnet/ChainSelector';
import { TransactionProgress } from '@/components/mainnet/TransactionProgress';
import { FeeEstimator } from '@/components/mainnet/FeeEstimator';
import { 
  getMainnetSourceChains, 
  getMainnetDestinationChains,
  type MainnetChainId 
} from '@/config/mainnet-chains';
import { getBridgeRoute, getEstimatedBridgeTime } from '@/lib/bridge-utils';

export default function MainnetBridge() {
  const [sourceChain, setSourceChain] = useState<MainnetChainId>('Ethereum');
  const [destChain, setDestChain] = useState<MainnetChainId>('Base');
  const [amount, setAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isBridging, setIsBridging] = useState(false);

  const sourceChains = getMainnetSourceChains();
  const destChains = getMainnetDestinationChains().filter(c => c.id !== sourceChain);
  
  const bridgeRoute = getBridgeRoute(sourceChain, destChain);
  const estimatedTime = getEstimatedBridgeTime(sourceChain, destChain);

  const handleSwapChains = () => {
    if (destChain !== 'Stacks') {
      const temp = sourceChain;
      setSourceChain(destChain);
      setDestChain(temp);
    }
  };

  const handleConnect = () => {
    // TODO: Integrate Reown AppKit
    setIsConnected(true);
  };

  const handleBridge = () => {
    // TODO: Execute bridge transaction
    setIsBridging(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">Hermes Bridge</h1>
              <Badge className="gradient-mainnet text-[hsl(var(--mainnet-gold-foreground))] text-xs">
                Mainnet
              </Badge>
            </div>
          </div>

          <Button
            variant={isConnected ? "outline" : "default"}
            onClick={handleConnect}
            className={isConnected ? '' : 'gradient-mainnet text-[hsl(var(--mainnet-gold-foreground))]'}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnected ? '0x1234...5678' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Bridge Card */}
          <Card className="border-mainnet">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Bridge USDC
                <Badge variant="outline" className="font-normal text-xs">
                  {bridgeRoute.type.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">From</label>
                  {isConnected && (
                    <span className="text-xs text-muted-foreground">
                      Balance: 1,234.56 USDC
                    </span>
                  )}
                </div>
                <ChainSelector
                  chains={sourceChains}
                  selectedChain={sourceChain}
                  onSelect={setSourceChain}
                />
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg pr-20 h-14"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-[hsl(var(--mainnet-gold))]"
                      onClick={() => setAmount('1234.56')}
                    >
                      MAX
                    </Button>
                    <span className="text-sm font-medium">USDC</span>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-2"
                  onClick={handleSwapChains}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>

              {/* To Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <ChainSelector
                  chains={destChains}
                  selectedChain={destChain}
                  onSelect={setDestChain}
                />
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold">
                      {amount || '0.00'}
                    </span>
                    <span className="text-sm font-medium">
                      {destChain === 'Stacks' ? 'USDCx' : 'USDC'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimated receive amount (fees deducted)
                  </p>
                </div>
              </div>

              {/* Fee Estimator */}
              <FeeEstimator
                amount={amount}
                sourceChain={sourceChain}
                destChain={destChain}
              />

              {/* Bridge Info */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{estimatedTime.min}-{estimatedTime.max} {estimatedTime.unit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="w-3 h-3" />
                  <span>Gas: ~$2.50</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>{bridgeRoute.steps.length} step{bridgeRoute.steps.length > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Bridge Button */}
              <Button
                className="w-full h-12 text-lg gradient-mainnet text-[hsl(var(--mainnet-gold-foreground))]"
                disabled={!isConnected || !amount || isBridging}
                onClick={handleBridge}
              >
                {!isConnected
                  ? 'Connect Wallet'
                  : !amount
                  ? 'Enter Amount'
                  : isBridging
                  ? 'Bridging...'
                  : 'Bridge USDC'}
              </Button>
            </CardContent>
          </Card>

          {/* Transaction Progress */}
          {isBridging && (
            <TransactionProgress
              steps={bridgeRoute.steps}
              currentStep={0}
              status="in-progress"
            />
          )}

          {/* Warning */}
          <div className="bg-[hsl(var(--warning)/0.1)] border border-[hsl(var(--warning)/0.3)] rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-[hsl(var(--warning))] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-[hsl(var(--warning))]">
                  Mainnet Transaction
                </p>
                <p className="text-xs text-muted-foreground">
                  You are bridging real USDC. Double-check all addresses and amounts before confirming.
                  Transactions cannot be reversed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
