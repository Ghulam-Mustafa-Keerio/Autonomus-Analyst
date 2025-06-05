import { Eye, Brain, Zap, RefreshCw, Layers } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const architectureLayers = [
  {
    name: 'Perception Layer',
    icon: Eye,
    description: 'Responsible for ingesting and interpreting raw data from various sources. This layer forms the sensory input for the AI agent.',
    diagramHint: 'perception layer diagram'
  },
  {
    name: 'Reasoning Layer',
    icon: Brain,
    description: 'The cognitive core of the agent. It processes information from the Perception layer, applies analytical models, and makes decisions.',
    diagramHint: 'reasoning layer diagram'
  },
  {
    name: 'Action Layer',
    icon: Zap,
    description: 'Executes actions based on the decisions from the Reasoning layer. This can include generating reports, adjusting models, or alerting users.',
    diagramHint: 'action layer diagram'
  },
  {
    name: 'Learning Layer',
    icon: RefreshCw,
    description: 'Enables the agent to adapt and improve over time. It incorporates feedback, updates models, and refines strategies based on outcomes.',
    diagramHint: 'learning layer diagram'
  },
];

export function ArchitectureVisualizationSection() {
  return (
    <SectionWrapper title="Foundational Architecture" icon={Layers}>
      <p className="mb-6 text-muted-foreground">
        The Autonomous AI Agent Analyst is built upon a layered architecture designed for robust data processing, intelligent decision-making, and continuous improvement. Each layer fulfills a distinct role in the agent's overall functionality.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {architectureLayers.map((layer) => (
          <Card key={layer.name} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary flex items-center">
                <layer.icon className="h-6 w-6 mr-2 text-accent" />
                {layer.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-sm text-foreground/80 mb-4 flex-grow">{layer.description}</p>
              <div className="mt-auto rounded-lg overflow-hidden border border-border">
                <Image
                  src={`https://placehold.co/600x300.png`}
                  alt={`${layer.name} Diagram`}
                  width={600}
                  height={300}
                  className="object-cover w-full h-auto"
                  data-ai-hint={layer.diagramHint}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-8 p-4 border border-dashed border-accent/50 rounded-lg bg-accent/10">
          <h3 className="text-lg font-semibold text-accent mb-2 flex items-center">
            <Layers className="h-5 w-5 mr-2"/>
            Overall Architecture Diagram
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            A comprehensive view of how these layers interact to form the autonomous analysis system.
          </p>
          <div className="rounded-lg overflow-hidden border border-border shadow-sm">
             <Image
                src={`https://placehold.co/800x400.png`}
                alt="Overall Architecture Diagram"
                width={800}
                height={400}
                className="object-cover w-full h-auto"
                data-ai-hint="overall architecture diagram"
              />
          </div>
      </div>
    </SectionWrapper>
  );
}
