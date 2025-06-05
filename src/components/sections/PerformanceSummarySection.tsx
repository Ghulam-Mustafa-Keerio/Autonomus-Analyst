import { TrendingUp, Gauge, ServerCog, Zap } from 'lucide-react';
import { SectionWrapper } from '@/components/common/SectionWrapper';

export function PerformanceSummarySection() {
  return (
    <SectionWrapper title="Scalability & Performance Plan" icon={TrendingUp}>
      <p className="mb-6 text-muted-foreground">
        The Autonomous Analyst platform is designed for high scalability and optimal performance, leveraging Firebase's robust infrastructure and best-practice architectural patterns.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <ServerCog className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Leveraging Firebase Infrastructure</h3>
            <p className="text-sm text-foreground/80">
              Firebase services like Firestore, Cloud Functions, and Cloud Storage are inherently scalable, designed to handle large volumes of data and high request loads. This allows the platform to grow seamlessly with increasing analytical demands and user base.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Gauge className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Efficient Data Management</h3>
            <p className="text-sm text-foreground/80">
              Optimized data structures in Firestore and efficient querying patterns are employed to ensure rapid data retrieval and processing. Data indexing strategies are carefully planned to support complex analytical queries without performance degradation.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Zap className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Optimized Cloud Functions</h3>
            <p className="text-sm text-foreground/80">
              Cloud Functions are designed to be stateless and idempotent where possible, allowing for efficient scaling. Cold start times are minimized through appropriate memory allocation and by keeping function dependencies lean. Background tasks and long-running processes are managed to avoid impacting real-time interactions.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <TrendingUp className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Continuous Monitoring & Optimization</h3>
            <p className="text-sm text-foreground/80">
              Firebase Performance Monitoring and Google Cloud's operations suite (formerly Stackdriver) will be utilized for real-time performance tracking, identifying bottlenecks, and understanding usage patterns. Regular performance audits and load testing will ensure the platform maintains high responsiveness and reliability.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
