import { BrandKitSidePanel } from '@/components/BrandKitSidePanel';
import { MockCanvas } from '@/components/MockCanvas';

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mock Adobe Express Canvas Area */}
      <MockCanvas />
      
      {/* Smart Brand Kit Side Panel */}
      <BrandKitSidePanel />
    </div>
  );
};

export default Index;
