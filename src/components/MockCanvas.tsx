import { AlertTriangle, MousePointer2 } from 'lucide-react';

export const MockCanvas = () => {
  return (
    <div className="flex-1 bg-[#2a2a2e] flex items-center justify-center relative overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Mock design canvas */}
      <div className="relative w-[600px] h-[400px] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Mock header with violation */}
        <div 
          className="h-16 flex items-center justify-between px-6 relative"
          style={{ backgroundColor: '#FF5733' }}
        >
          {/* Violation indicator */}
          <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-full shadow-lg animate-pulse">
            <AlertTriangle className="h-3 w-3" />
            Non-brand color
          </div>
          
          <div className="h-8 w-24 bg-white/20 rounded" />
          <div className="flex gap-3">
            <div className="h-4 w-16 bg-white/30 rounded" />
            <div className="h-4 w-16 bg-white/30 rounded" />
            <div className="h-4 w-16 bg-white/30 rounded" />
          </div>
        </div>

        {/* Mock content area */}
        <div className="p-8">
          {/* Hero text with font violation */}
          <div className="relative inline-block mb-4">
            <div 
              className="text-3xl font-bold text-gray-800"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Welcome to Our Platform
            </div>
            <div className="absolute -top-1 -right-8 flex items-center gap-1 bg-major text-major-foreground text-[10px] font-medium px-1.5 py-0.5 rounded shadow">
              Arial
            </div>
          </div>

          {/* Subtitle with contrast issue */}
          <div className="relative inline-block mb-6">
            <p className="text-sm" style={{ color: '#999' }}>
              Build something amazing with our tools
            </p>
            <div className="absolute -bottom-3 left-0 flex items-center gap-1 bg-major text-major-foreground text-[10px] font-medium px-1.5 py-0.5 rounded shadow">
              Low contrast
            </div>
          </div>

          {/* Mock content blocks */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4">
                <div className="h-20 bg-gray-200 rounded mb-3" />
                <div className="h-3 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Mock footer with logo issue */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-100 flex items-center justify-between px-6">
          <div className="relative">
            <div className="h-6 w-6 bg-gray-400 rounded" />
            <div className="absolute -top-3 -left-2 flex items-center gap-1 bg-critical text-critical-foreground text-[10px] font-medium px-1.5 py-0.5 rounded shadow">
              Too small
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-3 w-12 bg-gray-300 rounded" />
            <div className="h-3 w-12 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      {/* Cursor indicator */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/60">
        <MousePointer2 className="h-5 w-5" />
        <span className="text-sm">Adobe Express Canvas</span>
      </div>
    </div>
  );
};
