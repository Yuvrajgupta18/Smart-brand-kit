import { Palette, Type, Image, Grid3X3, Eye } from 'lucide-react';
import type { ViolationCategory } from '@/types/brand';
import { cn } from '@/lib/utils';

interface CategoryBreakdownProps {
  categories: Record<ViolationCategory, number>;
}

const categoryConfig: Record<ViolationCategory, { icon: React.ReactNode; label: string }> = {
  color: { icon: <Palette className="h-4 w-4" />, label: 'Colors' },
  typography: { icon: <Type className="h-4 w-4" />, label: 'Typography' },
  logo: { icon: <Image className="h-4 w-4" />, label: 'Logo' },
  spacing: { icon: <Grid3X3 className="h-4 w-4" />, label: 'Spacing' },
  accessibility: { icon: <Eye className="h-4 w-4" />, label: 'A11y' },
};

export const CategoryBreakdown = ({ categories }: CategoryBreakdownProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Category Breakdown
      </h3>
      <div className="space-y-2">
        {(Object.keys(categories) as ViolationCategory[]).map((category) => {
          const score = categories[category];
          const config = categoryConfig[category];
          
          return (
            <div key={category} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {config.icon}
                  </span>
                  <span className="text-xs font-medium text-secondary-foreground">
                    {config.label}
                  </span>
                </div>
                <span className={cn(
                  "text-xs font-semibold",
                  score >= 80 && "text-success",
                  score >= 60 && score < 80 && "text-warning",
                  score < 60 && "text-destructive"
                )}>
                  {score}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    score >= 80 && "bg-success",
                    score >= 60 && score < 80 && "bg-warning",
                    score < 60 && "bg-destructive"
                  )}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
