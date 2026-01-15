import { Download, Lock, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExportGateProps {
  score: number;
  violations: number;
  onRequestApproval: () => void;
}

export const ExportGate = ({ score, violations, onRequestApproval }: ExportGateProps) => {
  const isCompliant = score >= 80 && violations === 0;
  const canExportWithWarning = score >= 60;

  return (
    <div className="glass-panel rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Export Status
        </h3>
        {isCompliant ? (
          <div className="flex items-center gap-1.5 text-success">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-medium">Ready</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-warning">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-medium">Gated</span>
          </div>
        )}
      </div>

      {isCompliant ? (
        <>
          <p className="text-xs text-muted-foreground">
            Design is fully compliant and ready for export.
          </p>
          <Button variant="success" size="sm" className="w-full">
            <Download className="h-4 w-4" />
            Export Design
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-start gap-2 rounded-md bg-warning/10 border border-warning/20 p-3">
            <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <div className="text-xs text-warning">
              <p className="font-medium">Export blocked</p>
              <p className="text-warning/80 mt-0.5">
                {violations} unresolved violation{violations !== 1 ? 's' : ''} detected. 
                Fix issues or request approval.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!canExportWithWarning}
              className={cn(!canExportWithWarning && "opacity-50")}
            >
              <Download className="h-4 w-4" />
              Draft
            </Button>
            <Button 
              variant="glow" 
              size="sm"
              onClick={onRequestApproval}
            >
              <Send className="h-4 w-4" />
              Approval
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
