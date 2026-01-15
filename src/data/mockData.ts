import type { BrandRules, Violation, ComplianceScore, AnalyticsData, UserRole } from '@/types/brand';

export const currentUserRole: UserRole = 'designer';

export const brandRules: BrandRules = {
  colors: [
    { id: '1', name: 'Primary Blue', hex: '#0066CC', usage: 'Headers, CTAs' },
    { id: '2', name: 'Secondary Teal', hex: '#00A3A3', usage: 'Accents, Links' },
    { id: '3', name: 'Neutral Dark', hex: '#1A1A2E', usage: 'Body text' },
    { id: '4', name: 'Neutral Light', hex: '#F5F5F7', usage: 'Backgrounds' },
    { id: '5', name: 'Success Green', hex: '#34C759', usage: 'Success states' },
    { id: '6', name: 'Warning Orange', hex: '#FF9500', usage: 'Warnings' },
  ],
  fonts: [
    { id: '1', name: 'Inter', weight: '600-700', usage: 'heading' },
    { id: '2', name: 'Inter', weight: '400-500', usage: 'body' },
    { id: '3', name: 'SF Mono', weight: '400', usage: 'accent' },
  ],
  logos: [
    { id: '1', name: 'Primary Logo', minSize: 48, clearSpace: 24, allowedBackgrounds: ['#FFFFFF', '#F5F5F7', '#1A1A2E'] },
    { id: '2', name: 'Icon Only', minSize: 32, clearSpace: 16, allowedBackgrounds: ['#FFFFFF', '#F5F5F7'] },
    { id: '3', name: 'Wordmark', minSize: 64, clearSpace: 32, allowedBackgrounds: ['#FFFFFF', '#F5F5F7', '#1A1A2E'] },
  ],
  spacing: {
    minMargin: 16,
    gridSize: 8,
  },
  accessibility: {
    minContrastRatio: 4.5,
    minFontSize: 14,
  },
};

export const initialViolations: Violation[] = [
  {
    id: '1',
    category: 'color',
    severity: 'critical',
    title: 'Non-brand color detected',
    description: 'The color #FF5733 is not in the approved brand palette',
    location: 'Header background',
    suggestion: 'Replace with Primary Blue (#0066CC)',
    canAutoFix: true,
  },
  {
    id: '2',
    category: 'typography',
    severity: 'major',
    title: 'Unapproved font family',
    description: 'Arial is not an approved brand font',
    location: 'Body text section',
    suggestion: 'Replace with Inter (400)',
    canAutoFix: true,
  },
  {
    id: '3',
    category: 'logo',
    severity: 'critical',
    title: 'Logo size below minimum',
    description: 'Logo is 36px, minimum required is 48px',
    location: 'Footer area',
    suggestion: 'Increase logo size to 48px minimum',
    canAutoFix: true,
  },
  {
    id: '4',
    category: 'accessibility',
    severity: 'major',
    title: 'Insufficient contrast ratio',
    description: 'Text contrast ratio is 2.8:1, minimum required is 4.5:1',
    location: 'Hero section subtitle',
    suggestion: 'Darken text or lighten background',
    canAutoFix: true,
  },
  {
    id: '5',
    category: 'spacing',
    severity: 'minor',
    title: 'Off-grid spacing',
    description: 'Element margin is 14px, not aligned to 8px grid',
    location: 'Card component',
    suggestion: 'Adjust to 16px (2 × grid)',
    canAutoFix: true,
  },
  {
    id: '6',
    category: 'logo',
    severity: 'major',
    title: 'Insufficient clear space',
    description: 'Logo clear space is 16px, minimum required is 24px',
    location: 'Header area',
    suggestion: 'Increase clear space around logo',
    canAutoFix: true,
  },
];

export const complianceScore: ComplianceScore = {
  overall: 72,
  categories: {
    color: 85,
    typography: 70,
    logo: 55,
    spacing: 90,
    accessibility: 65,
  },
};

export const analyticsData: AnalyticsData = {
  complianceHistory: [
    { date: '2024-01-08', score: 58 },
    { date: '2024-01-09', score: 62 },
    { date: '2024-01-10', score: 65 },
    { date: '2024-01-11', score: 68 },
    { date: '2024-01-12', score: 70 },
    { date: '2024-01-13', score: 69 },
    { date: '2024-01-14', score: 72 },
  ],
  topViolations: [
    { type: 'Non-brand colors', count: 234 },
    { type: 'Font violations', count: 187 },
    { type: 'Logo sizing', count: 89 },
    { type: 'Contrast issues', count: 76 },
    { type: 'Spacing errors', count: 45 },
  ],
  fixRate: 78,
  totalScans: 1247,
};
