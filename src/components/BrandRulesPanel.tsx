import { ChevronDown, Palette, Type, Image, Ruler, Eye } from 'lucide-react';
import { useState } from 'react';
import type { BrandRules } from '@/types/brand';
import { cn } from '@/lib/utils';

interface BrandRulesPanelProps {
  rules: BrandRules;
}

interface AccordionItemProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem = ({ icon, title, count, children, defaultOpen = false }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-left hover:bg-accent/50 transition-colors px-1 rounded-md"
      >
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">({count})</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-3" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const BrandRulesPanel = ({ rules }: BrandRulesPanelProps) => {
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Brand Rules
      </h3>

      <AccordionItem
        icon={<Palette className="h-4 w-4" />}
        title="Colors"
        count={rules.colors.length}
        defaultOpen
      >
        <div className="grid grid-cols-3 gap-2 px-1">
          {rules.colors.map((color) => (
            <div key={color.id} className="group relative">
              <div
                className="h-8 w-full rounded-md border border-border shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              <div className="mt-1">
                <p className="text-[10px] font-medium text-foreground truncate">
                  {color.name}
                </p>
                <p className="text-[9px] text-muted-foreground font-mono">
                  {color.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        icon={<Type className="h-4 w-4" />}
        title="Typography"
        count={rules.fonts.length}
      >
        <div className="space-y-2 px-1">
          {rules.fonts.map((font) => (
            <div
              key={font.id}
              className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{font.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {font.usage} • {font.weight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        icon={<Image className="h-4 w-4" />}
        title="Logos"
        count={rules.logos.length}
      >
        <div className="space-y-2 px-1">
          {rules.logos.map((logo) => (
            <div
              key={logo.id}
              className="rounded-md bg-secondary/50 px-3 py-2"
            >
              <p className="text-sm font-medium text-foreground">{logo.name}</p>
              <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                <span>Min: {logo.minSize}px</span>
                <span>Clear: {logo.clearSpace}px</span>
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        icon={<Ruler className="h-4 w-4" />}
        title="Spacing"
        count={2}
      >
        <div className="space-y-2 px-1">
          <div className="flex justify-between rounded-md bg-secondary/50 px-3 py-2">
            <span className="text-sm text-foreground">Minimum Margin</span>
            <span className="text-sm font-mono text-primary">{rules.spacing.minMargin}px</span>
          </div>
          <div className="flex justify-between rounded-md bg-secondary/50 px-3 py-2">
            <span className="text-sm text-foreground">Grid Size</span>
            <span className="text-sm font-mono text-primary">{rules.spacing.gridSize}px</span>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        icon={<Eye className="h-4 w-4" />}
        title="Accessibility"
        count={2}
      >
        <div className="space-y-2 px-1">
          <div className="flex justify-between rounded-md bg-secondary/50 px-3 py-2">
            <span className="text-sm text-foreground">Min Contrast</span>
            <span className="text-sm font-mono text-primary">{rules.accessibility.minContrastRatio}:1</span>
          </div>
          <div className="flex justify-between rounded-md bg-secondary/50 px-3 py-2">
            <span className="text-sm text-foreground">Min Font Size</span>
            <span className="text-sm font-mono text-primary">{rules.accessibility.minFontSize}px</span>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
};
