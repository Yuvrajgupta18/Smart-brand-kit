import { TrendingUp, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { AnalyticsData } from '@/types/brand';
import { cn } from '@/lib/utils';

interface AnalyticsPanelProps {
  data: AnalyticsData;
}

export const AnalyticsPanel = ({ data }: AnalyticsPanelProps) => {
  const trend = data.complianceHistory.length >= 2
    ? data.complianceHistory[data.complianceHistory.length - 1].score - 
      data.complianceHistory[data.complianceHistory.length - 2].score
    : 0;

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Brand Health Analytics
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <BarChart3 className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase tracking-wider">Total Scans</span>
          </div>
          <p className="text-xl font-bold text-foreground">{data.totalScans.toLocaleString()}</p>
        </div>

        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase tracking-wider">Fix Rate</span>
          </div>
          <p className="text-xl font-bold text-success">{data.fixRate}%</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="glass-panel rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-foreground">Compliance Trend</span>
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend >= 0 ? "text-success" : "text-destructive"
          )}>
            <TrendingUp className={cn("h-3 w-3", trend < 0 && "rotate-180")} />
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        </div>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.complianceHistory}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(187 80% 48%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(187 80% 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                hide 
              />
              <YAxis 
                domain={[50, 100]} 
                hide 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 10%)',
                  border: '1px solid hsl(222 30% 18%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(210 40% 96%)' }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(187 80% 48%)"
                strokeWidth={2}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Violations */}
      <div className="glass-panel rounded-lg p-3">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="h-3.5 w-3.5 text-warning" />
          <span className="text-xs font-medium text-foreground">Top Violations</span>
        </div>
        <div className="space-y-2">
          {data.topViolations.slice(0, 4).map((violation, index) => (
            <div key={violation.type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-4">{index + 1}.</span>
                <span className="text-xs text-secondary-foreground">{violation.type}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {violation.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
