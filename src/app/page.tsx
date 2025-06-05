import { AppHeader } from '@/components/common/AppHeader';
import { AiAnalysisSection } from '@/components/sections/AiAnalysisSection';
import { ArchitectureVisualizationSection } from '@/components/sections/ArchitectureVisualizationSection';
import { ServiceDesignSection } from '@/components/sections/ServiceDesignSection';
import { PerformanceSummarySection } from '@/components/sections/PerformanceSummarySection';
import { SecurityOverviewSection } from '@/components/sections/SecurityOverviewSection';
import { WorkflowSimulationSection } from '@/components/sections/WorkflowSimulationSection';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 w-full max-w-5xl space-y-12">
        <AiAnalysisSection />
        <ArchitectureVisualizationSection />
        <ServiceDesignSection />
        <WorkflowSimulationSection />
        <PerformanceSummarySection />
        <SecurityOverviewSection />
      </main>
      <footer className="w-full py-8 mt-12 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          Autonomous Analyst &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
