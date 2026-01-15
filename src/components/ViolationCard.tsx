import { AlertTriangle, CheckCircle2, Palette, Type, Image, Grid3X3, Eye, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Violation, ViolationCategory, ViolationSeverity } from '@/types/brand';
import { cn } from '@/lib/utils';

interface ViolationCardProps {
  violation: Violation;
  onAutoFix: (id: string) => void;
}

const categoryIcons: Record<ViolationCategory, React.ReactNode> = {
  color: <Palette className="h-4 w-4" />,
  typography: <Type className="h-4 w-4" />,
  logo: <Image className="h-4 w-4" />,
  spacing: <Grid3X3 className="h-4 w-4" />,
  accessibility: <Eye className="h-4 w-4" />,
};

const severityVariants: Record<ViolationSeverity, 'critical' | 'major' | 'minor'> = {
  critical: 'critical',
  major: 'major',
  minor: 'minor',
};

export const ViolationCard = ({ violation, onAutoFix }: ViolationCardProps) => {
  const { id, category, severity, title, description, location, suggestion, canAutoFix, fixed } = violation;

  if (fixed) {
    return (
      <div className="glass-panel rounded-lg p-4 opacity-60 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20">
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-success line-through">{title}</p>
            <p className="text-xs text-muted-foreground">Fixed</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "glass-panel rounded-lg p-4 transition-all duration-300 hover:border-primary/30 animate-fade-in-up",
      severity === 'critical' && "border-l-2 border-l-critical",
      severity === 'major' && "border-l-2 border-l-major",
      severity === 'minor' && "border-l-2 border-l-minor"
    )}>
      <div className="flex items-start gap-3">
        {/* Category icon */}
        <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          severity === 'critical' && "bg-critical/20 text-critical",
          severity === 'major' && "bg-major/20 text-major",
          severity === 'minor' && "bg-minor/20 text-minor"
        )}>
          {categoryIcons[category]}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
            </div>
            <Badge variant={severityVariants[severity]} className="shrink-0 capitalize">
              {severity}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Suggestion */}
          <div className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2">
            <AlertTriangle className="h-3 w-3 text-warning shrink-0" />
            <p className="text-xs text-secondary-foreground">{suggestion}</p>
          </div>

          {/* Auto-fix button */}
          {canAutoFix && (
            <Button
              variant="fix"
              size="xs"
              onClick={() => onAutoFix(id)}
              className="mt-2"
            >
              <Wand2 className="h-3 w-3" />
              Auto-fix
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
