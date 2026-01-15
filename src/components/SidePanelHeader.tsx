import { Shield, Settings, HelpCircle, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { UserRole } from '@/types/brand';

interface SidePanelHeaderProps {
  role: UserRole;
  hasNotifications?: boolean;
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Brand Admin',
  designer: 'Designer',
  employee: 'Employee',
};

export const SidePanelHeader = ({ role, hasNotifications = false }: SidePanelHeaderProps) => {
  return (
    <div className="border-b border-border pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-glow">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">Smart Brand Kit</h1>
            <p className="text-[10px] text-muted-foreground">Real-time Compliance</p>
          </div>
        </div>
        <Badge variant="role" className="text-[10px]">
          {roleLabels[role]}
        </Badge>
      </div>

      <div className="flex items-center justify-end gap-1 mt-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          )}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4" />
        </Button>
        {role === 'admin' && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
