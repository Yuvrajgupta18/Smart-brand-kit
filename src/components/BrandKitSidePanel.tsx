import { useState, useMemo } from 'react';
import { Wand2, RefreshCw, ChevronDown, Sparkles } from 'lucide-react';
import { ComplianceScore } from './ComplianceScore';
import { ViolationCard } from './ViolationCard';
import { CategoryBreakdown } from './CategoryBreakdown';
import { BrandRulesPanel } from './BrandRulesPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { ExportGate } from './ExportGate';
import { SidePanelHeader } from './SidePanelHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  brandRules, 
  initialViolations, 
  complianceScore as initialScore, 
  analyticsData,
  currentUserRole 
} from '@/data/mockData';
import type { Violation, ComplianceScore as ScoreType } from '@/types/brand';
import { cn } from '@/lib/utils';

export const BrandKitSidePanel = () => {
  const [violations, setViolations] = useState<Violation[]>(initialViolations);
  const [score, setScore] = useState<ScoreType>(initialScore);
  const [isScanning, setIsScanning] = useState(false);
  const [showAllViolations, setShowAllViolations] = useState(false);

  const activeViolations = useMemo(() => 
    violations.filter(v => !v.fixed), 
    [violations]
  );

  const displayedViolations = showAllViolations 
    ? activeViolations 
    : activeViolations.slice(0, 3);

  const handleAutoFix = (id: string) => {
    setViolations(prev => prev.map(v => 
      v.id === id ? { ...v, fixed: true } : v
    ));
    
    // Recalculate score
    const newActiveCount = activeViolations.length - 1;
    const newScore = Math.min(100, score.overall + Math.floor(100 / initialViolations.length));
    setScore(prev => ({ ...prev, overall: newScore }));
    
    toast.success('Issue fixed automatically', {
      description: 'The design has been updated to match brand guidelines.',
    });
  };

  const handleFixAll = () => {
    setViolations(prev => prev.map(v => 
      v.canAutoFix ? { ...v, fixed: true } : v
    ));
    setScore(prev => ({ ...prev, overall: 100 }));
    
    toast.success('All issues fixed!', {
      description: 'Your design is now fully brand-compliant.',
    });
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.info('Scan complete', {
        description: `Found ${activeViolations.length} issue${activeViolations.length !== 1 ? 's' : ''}.`,
      });
    }, 1500);
  };

  const handleRequestApproval = () => {
    toast.info('Approval request sent', {
      description: 'A brand admin will review your design shortly.',
    });
  };

  return (
    <div className="flex h-full w-[360px] flex-col bg-sidebar border-l border-sidebar-border animate-slide-in-right">
      {/* Header */}
      <div className="px-4 pt-4">
        <SidePanelHeader role={currentUserRole} hasNotifications={activeViolations.length > 0} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Compliance Score */}
        <div className="flex flex-col items-center gap-4 glass-panel rounded-xl p-4">
          <ComplianceScore score={score.overall} />
          
          <div className="flex items-center gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleRescan}
              disabled={isScanning}
            >
              <RefreshCw className={cn("h-4 w-4", isScanning && "animate-spin")} />
              {isScanning ? 'Scanning...' : 'Re-scan'}
            </Button>
            {activeViolations.filter(v => v.canAutoFix).length > 0 && (
              <Button 
                variant="fixAll" 
                size="sm" 
                className="flex-1"
                onClick={handleFixAll}
              >
                <Sparkles className="h-4 w-4" />
                Fix All ({activeViolations.filter(v => v.canAutoFix).length})
              </Button>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-panel rounded-xl p-4">
          <CategoryBreakdown categories={score.categories} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="issues" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-secondary">
            <TabsTrigger value="issues" className="text-xs">
              Issues
              {activeViolations.length > 0 && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {activeViolations.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-xs">Rules</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="mt-4 space-y-3">
            {activeViolations.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                  <Wand2 className="h-6 w-6 text-success" />
                </div>
                <p className="text-sm font-medium text-foreground">All clear!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  No brand violations detected.
                </p>
              </div>
            ) : (
              <>
                {displayedViolations.map((violation) => (
                  <ViolationCard
                    key={violation.id}
                    violation={violation}
                    onAutoFix={handleAutoFix}
                  />
                ))}
                
                {activeViolations.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAllViolations(!showAllViolations)}
                  >
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      showAllViolations && "rotate-180"
                    )} />
                    {showAllViolations 
                      ? 'Show less' 
                      : `Show ${activeViolations.length - 3} more`
                    }
                  </Button>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="rules" className="mt-4">
            <BrandRulesPanel rules={brandRules} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <AnalyticsPanel data={analyticsData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Export Gate Footer */}
      <div className="border-t border-border p-4">
        <ExportGate 
          score={score.overall} 
          violations={activeViolations.length}
          onRequestApproval={handleRequestApproval}
        />
      </div>
    </div>
  );
};
