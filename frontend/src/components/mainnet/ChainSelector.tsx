import { useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type MainnetChainConfig, type MainnetChainId } from '@/config/mainnet-chains';

interface ChainSelectorProps {
  chains: MainnetChainConfig[];
  selectedChain: MainnetChainId;
  onSelect: (chainId: MainnetChainId) => void;
  disabled?: boolean;
}

export function ChainSelector({
  chains,
  selectedChain,
  onSelect,
  disabled = false,
}: ChainSelectorProps) {
  const [open, setOpen] = useState(false);
  
  const selected = chains.find((c) => c.id === selectedChain);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between h-12 px-3"
        >
          <div className="flex items-center gap-3">
            {selected && (
              <>
                <div 
                  className="w-8 h-8 rounded-full overflow-hidden border-2"
                  style={{ borderColor: selected.color }}
                >
                  <img
                    src={selected.icon}
                    alt={selected.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium">{selected.displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.isEVM ? 'EVM' : 'Stacks'}
                  </p>
                </div>
              </>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search chain..." />
          <CommandList>
            <CommandEmpty>No chain found.</CommandEmpty>
            <CommandGroup>
              {chains.map((chain) => (
                <CommandItem
                  key={chain.id}
                  value={chain.displayName}
                  onSelect={() => {
                    onSelect(chain.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-3"
                >
                  <div 
                    className="w-8 h-8 rounded-full overflow-hidden border-2 flex-shrink-0"
                    style={{ borderColor: chain.color }}
                  >
                    <img
                      src={chain.icon}
                      alt={chain.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{chain.displayName}</p>
                    <p className="text-xs text-muted-foreground">{chain.name}</p>
                  </div>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedChain === chain.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
