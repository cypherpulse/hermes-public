import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type MainnetChainId } from '@/config/mainnet-chains';
import { parseTokenAmount, formatTokenAmount, getEstimatedBridgeFee, getBridgeRoute } from '@/lib/bridge-utils';

interface FeeEstimatorProps {
  amount: string;
  sourceChain: MainnetChainId;
  destChain: MainnetChainId;
}

export function FeeEstimator({ amount, sourceChain, destChain }: FeeEstimatorProps) {
  const hasAmount = amount && parseFloat(amount) > 0;
  
  let bridgeFee = { fee: BigInt(0), percentage: '0%' };
  let receiveAmount = '0.00';
  
  if (hasAmount) {
    try {
      const parsedAmount = parseTokenAmount(amount);
      bridgeFee = getEstimatedBridgeFee(parsedAmount, sourceChain, destChain);
      const receive = parsedAmount - bridgeFee.fee;
      receiveAmount = formatTokenAmount(receive);
    } catch {
      // Invalid amount, use defaults
    }
  }

  const bridgeRoute = getBridgeRoute(sourceChain, destChain);
  const isMultiStep = bridgeRoute.steps.length > 1;

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Bridge Fee</span>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                Fee charged by the bridge protocol. This includes CCTP fees
                {isMultiStep && ' and xReserve protocol fees'}.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="font-medium">
          {bridgeFee.percentage}
          {hasAmount && (
            <span className="text-muted-foreground ml-1">
              (~${formatTokenAmount(bridgeFee.fee)})
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Network Gas</span>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                Estimated gas cost for the transaction on {sourceChain}.
                {isMultiStep && ' Additional gas may be required for the second step.'}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="font-medium">~$2.50</span>
      </div>

      {isMultiStep && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Route</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-background">
            {bridgeRoute.steps.map(s => s.protocol).join(' → ')}
          </span>
        </div>
      )}

      <div className="border-t border-border pt-3 flex items-center justify-between">
        <span className="text-sm font-medium">You Receive</span>
        <div className="text-right">
          <span className="text-lg font-bold">
            {hasAmount ? receiveAmount : '0.00'}
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            {destChain === 'Stacks' ? 'USDCx' : 'USDC'}
          </span>
        </div>
      </div>
    </div>
  );
}
