import { FileText, UploadCloud, Zap, Wand2, Cpu, DatabaseZap, ClipboardList, Workflow } from 'lucide-react';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const workflowSteps = [
  { 
    title: 'Data Source', 
    icon: FileText, 
    description: 'Process begins with data from various external sources like CSV files, APIs, or databases.' 
  },
  { 
    title: 'Ingestion to Firebase Storage', 
    icon: UploadCloud, 
    description: 'Raw data is securely ingested and stored in Firebase Cloud Storage, enabling versioning and access control.' 
  },
  { 
    title: 'Trigger Cloud Function', 
    icon: Zap, 
    description: 'A Cloud Function is automatically triggered upon new data arrival in Storage, initiating the analysis pipeline.' 
  },
  { 
    title: 'Data Cleaning & Preprocessing (Simulated)', 
    icon: Wand2, 
    description: 'The Cloud Function performs (or orchestrates) data cleaning, transformation, and validation to prepare it for analysis.' 
  },
  { 
    title: 'AI-Powered Analysis', 
    icon: Cpu, 
    description: 'The core AI engine analyzes the preprocessed data, identifies patterns, and derives insights. (Refer to AI Analysis section for a live demo).' 
  },
  { 
    title: 'Store Results in Firestore', 
    icon: DatabaseZap, 
    description: 'Analytical results, summaries, and key findings are stored structuredly in Firebase Firestore for easy retrieval and further use.' 
  },
  { 
    title: 'Natural Language Reporting (Conceptual)', 
    icon: ClipboardList, 
    description: 'The system generates natural language reports summarizing the analysis for stakeholders, making insights accessible.' 
  },
];

export function WorkflowSimulationSection() {
  return (
    <SectionWrapper title="Proof-of-Concept: Data Workflow" icon={Workflow}>
      <p className="mb-8 text-muted-foreground">
        This section illustrates a typical end-to-end data ingestion and analysis workflow within the Autonomous Analyst platform, leveraging various Firebase services for a seamless and automated process.
      </p>
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[calc(1rem_-_1px)] top-0 bottom-0 w-0.5 bg-border rounded-full" aria-hidden="true"></div>
        
        {workflowSteps.map((step, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            {/* Icon Circle */}
            <div className="absolute left-[-2rem] top-[2px] w-8 h-8 bg-primary rounded-full flex items-center justify-center ring-4 ring-background">
              <step.icon className="h-4 w-4 text-primary-foreground" />
            </div>
            <Card className="ml-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-headline text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80">{step.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
