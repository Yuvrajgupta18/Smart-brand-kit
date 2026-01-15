import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ComplianceScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export const ComplianceScore = ({ 
  score, 
  size = 'md', 
  showLabel = true,
  animated = true 
}: ComplianceScoreProps) => {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  
  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }
    
    const duration = 1000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [score, animated]);

  const sizeConfig = {
    sm: { container: 80, stroke: 6, fontSize: 'text-xl', labelSize: 'text-[10px]' },
    md: { container: 140, stroke: 8, fontSize: 'text-4xl', labelSize: 'text-xs' },
    lg: { container: 180, stroke: 10, fontSize: 'text-5xl', labelSize: 'text-sm' },
  };

  const config = sizeConfig[size];
  const radius = (config.container - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  const getScoreColor = () => {
    if (displayScore >= 80) return 'stroke-success';
    if (displayScore >= 60) return 'stroke-warning';
    return 'stroke-destructive';
  };

  const getGlowClass = () => {
    if (displayScore >= 80) return 'shadow-glow-success';
    if (displayScore >= 60) return 'shadow-glow-warning';
    return 'shadow-glow-error';
  };

  const getStatus = () => {
    if (displayScore >= 80) return 'Compliant';
    if (displayScore >= 60) return 'Needs Work';
    return 'Non-Compliant';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "relative rounded-full",
          animated && "animate-score-pulse",
          getGlowClass()
        )}
        style={{ width: config.container, height: config.container }}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
        
        <svg
          className="transform -rotate-90"
          width={config.container}
          height={config.container}
        >
          {/* Background circle */}
          <circle
            cx={config.container / 2}
            cy={config.container / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="none"
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx={config.container / 2}
            cy={config.container / 2}
            r={radius}
            strokeWidth={config.stroke}
            fill="none"
            strokeLinecap="round"
            className={cn("transition-all duration-1000 ease-out", getScoreColor())}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-foreground", config.fontSize)}>
            {displayScore}
          </span>
          {showLabel && (
            <span className={cn("text-muted-foreground font-medium uppercase tracking-wider", config.labelSize)}>
              {getStatus()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
