import { Database, Cloud, FunctionSquare, ShieldAlert, Settings2 } from 'lucide-react';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Eye, Brain, Zap, RefreshCw } from 'lucide-react'; // Icons for layers

const serviceDesignData = [
  {
    layer: 'Perception Layer',
    icon: Eye,
    integrations: [
      { name: 'Firebase Cloud Storage', serviceIcon: Cloud, purpose: 'Securely store raw and processed data files (CSVs, JSON, images, etc.). Enables versioning and access control.' },
      { name: 'Cloud Functions for Firebase', serviceIcon: FunctionSquare, purpose: 'Trigger data ingestion pipelines upon new data arrival in Storage. Handle initial data validation and routing.' },
      { name: 'Firebase Realtime Database / Firestore', serviceIcon: Database, purpose: 'Store metadata about ingested data sources, schemas, and ingestion status.' },
    ],
  },
  {
    layer: 'Reasoning Layer',
    icon: Brain,
    integrations: [
      { name: 'Cloud Functions for Firebase', serviceIcon: FunctionSquare, purpose: 'Host AI models and analytical scripts. Perform complex computations and derive insights from data.' },
      { name: 'Firebase Firestore', serviceIcon: Database, purpose: 'Store intermediate analytical results, agent state, and model parameters. Facilitate complex queries on processed data.' },
      { name: 'Vertex AI (via Cloud Functions)', serviceIcon: Settings2, purpose: 'Leverage advanced Google Cloud AI/ML services for model training and inference, orchestrated by Firebase.' },
    ],
  },
  {
    layer: 'Action Layer',
    icon: Zap,
    integrations: [
      { name: 'Cloud Functions for Firebase', serviceIcon: FunctionSquare, purpose: 'Execute actions based on reasoning outcomes, such as sending notifications, updating dashboards, or generating reports.' },
      { name: 'Firebase Firestore', serviceIcon: Database, purpose: 'Log agent actions and decisions for auditability. Store generated reports and user-facing insights.' },
      { name: 'Firebase Cloud Messaging', serviceIcon: Cloud, purpose: 'Send real-time alerts and notifications to users or other systems based on analytical findings.' },
    ],
  },
  {
    layer: 'Learning Layer',
    icon: RefreshCw,
    integrations: [
      { name: 'Firebase Firestore', serviceIcon: Database, purpose: 'Store user feedback, model performance metrics, and learning parameters. Track adaptation history.' },
      { name: 'Cloud Functions for Firebase', serviceIcon: FunctionSquare, purpose: 'Implement retraining pipelines and update agent behavior based on feedback and new data. Manage A/B testing of models.' },
      { name: 'Firebase Remote Config', serviceIcon: Settings2, purpose: 'Dynamically adjust agent parameters and analysis priorities without deploying new code.' },
    ],
  },
];

export function ServiceDesignSection() {
  return (
    <SectionWrapper title="Service-Specific Design: Firebase Integration" icon={Settings2}>
      <p className="mb-6 text-muted-foreground">
        Each architectural layer is supported by a tailored set of Firebase services to ensure efficient, scalable, and secure operations. Below is a breakdown of how Firebase integrates with each layer.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {serviceDesignData.map((item) => (
          <AccordionItem value={item.layer} key={item.layer} className="border-b border-border last:border-b-0">
            <AccordionTrigger className="text-lg font-headline hover:no-underline py-4 text-primary">
              <div className="flex items-center">
                <item.icon className="h-6 w-6 mr-3 text-accent" />
                {item.layer}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 px-2">
              <ul className="space-y-4">
                {item.integrations.map((integration) => (
                  <li key={integration.name} className="flex items-start p-3 bg-background rounded-md border border-border/50 shadow-sm">
                    <integration.serviceIcon className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.purpose}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
