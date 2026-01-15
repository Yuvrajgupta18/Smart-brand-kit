export type UserRole = 'admin' | 'designer' | 'employee';

export type ViolationSeverity = 'critical' | 'major' | 'minor';

export type ViolationCategory = 'color' | 'typography' | 'logo' | 'spacing' | 'accessibility';

export interface BrandColor {
  id: string;
  name: string;
  hex: string;
  usage: string;
}

export interface BrandFont {
  id: string;
  name: string;
  weight: string;
  usage: 'heading' | 'body' | 'accent';
}

export interface LogoVariant {
  id: string;
  name: string;
  minSize: number;
  clearSpace: number;
  allowedBackgrounds: string[];
}

export interface Violation {
  id: string;
  category: ViolationCategory;
  severity: ViolationSeverity;
  title: string;
  description: string;
  location: string;
  suggestion: string;
  canAutoFix: boolean;
  fixed?: boolean;
}

export interface BrandRules {
  colors: BrandColor[];
  fonts: BrandFont[];
  logos: LogoVariant[];
  spacing: {
    minMargin: number;
    gridSize: number;
  };
  accessibility: {
    minContrastRatio: number;
    minFontSize: number;
  };
}

export interface ComplianceScore {
  overall: number;
  categories: {
    [key in ViolationCategory]: number;
  };
}

export interface AnalyticsData {
  complianceHistory: { date: string; score: number }[];
  topViolations: { type: string; count: number }[];
  fixRate: number;
  totalScans: number;
}
