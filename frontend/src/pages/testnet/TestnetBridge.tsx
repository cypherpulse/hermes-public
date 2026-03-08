import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestnetBridge() {
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
              <Badge className="gradient-testnet text-white text-xs">
                Testnet
              </Badge>
            </div>
          </div>

          <Button className="gradient-testnet text-white">
            Connect Wallet
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <Card className="border-testnet text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--testnet-blue)/0.1)] flex items-center justify-center mb-4">
                <Construction className="w-8 h-8 text-[hsl(var(--testnet-blue))]" />
              </div>
              <CardTitle className="text-2xl">Testnet Bridge</CardTitle>
              <CardDescription className="text-base">
                Import your existing testnet bridge code here. This placeholder 
                preserves the route for your testnet implementation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[hsl(var(--testnet-blue)/0.1)] border border-[hsl(var(--testnet-blue)/0.3)] rounded-lg p-4 text-left">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-[hsl(var(--testnet-blue))]">Note:</strong> This is a placeholder 
                  for your existing testnet bridge implementation. Copy your testnet components 
                  and logic here to complete the integration.
                </p>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>Supported testnet chains:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Sepolia', 'Base Sepolia', 'Arbitrum Sepolia', 'Avalanche Fuji', 'OP Sepolia', 'Polygon Amoy'].map((chain) => (
                    <Badge key={chain} variant="outline" className="text-xs">
                      {chain}
                    </Badge>
                  ))}
                </div>
              </div>

              <Link to="/">
                <Button variant="outline" className="w-full">
                  Return to Network Selection
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
