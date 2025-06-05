
"use client";

import { useState, useTransition } from 'react';
import { 
  Brain, Lightbulb, Search, AlertTriangle, FileText, Loader2, Presentation, BarChartHorizontalBig, NotebookText, LineChart, PieChartIcon, ScatterChart, TableIcon 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFullDataAnalysis, type FullDataAnalysisOutput } from '@/ai/flows/get-full-data-analysis-flow';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const sampleCsvString = `Date,Product,Sales,Region
2024-01-01,A,100,North
2024-01-02,B,150,North
2024-01-03,A,120,South
2024-01-04,C,200,East
2024-01-05,B,130,West
2024-01-06,A,110,North
2024-01-07,C,220,South`;

const visualizationIcons: Record<string, LucideIcon> = {
  bar: BarChartHorizontalBig,
  line: LineChart,
  pie: PieChartIcon,
  scatter: ScatterChart,
  table: TableIcon,
};


export function AiAnalysisSection() {
  const [analysisResult, setAnalysisResult] = useState<FullDataAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalyzeData = () => {
    setError(null);
    setAnalysisResult(null);
    startTransition(async () => {
      try {
        const result = await getFullDataAnalysis({ csvData: sampleCsvString });
        setAnalysisResult(result);
        toast({
          title: "Full Analysis Complete",
          description: "Sample data has been analyzed, report generated, and suggestions provided.",
        });
      } catch (err) {
        console.error("Full analysis error:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during full analysis.";
        setError(errorMessage);
        toast({
          title: "Full Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <SectionWrapper title="AI-Powered Data Analysis Suite" icon={Brain}>
      <p className="mb-6 text-muted-foreground">
        This section demonstrates the AI agent's comprehensive analysis capabilities.
        Click below to analyze sample sales data, generating insights, key metrics, visualization suggestions, and a full report.
      </p>
      
      <Button onClick={handleAnalyzeData} disabled={isPending} className="mb-8 bg-primary hover:bg-primary/90 text-primary-foreground">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Performing Full Analysis...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Analyze Sample Data & Generate Report
          </>
        )}
      </Button>

      {error && (
        <Card className="border-destructive bg-destructive/10 animate-fade-in mb-6">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Analysis Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="space-y-8 animate-fade-in">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{analysisResult.summary}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Potential Areas of Interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{analysisResult.potentialAreasOfInterest}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent flex items-center">
                <Presentation className="mr-2 h-5 w-5" />
                Key Metrics
              </CardTitle>
              <CardDescription>Key performance indicators derived from the data.</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult.keyMetrics && analysisResult.keyMetrics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResult.keyMetrics.map((metric, index) => (
                    <Card key={index} className="bg-secondary/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary">{metric.name}</h4>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      {metric.insight && <p className="text-xs text-muted-foreground mt-1">{metric.insight}</p>}
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No key metrics were identified.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent flex items-center">
                <BarChartHorizontalBig className="mr-2 h-5 w-5" />
                Suggested Visualizations
              </CardTitle>
              <CardDescription>Recommendations for visualizing the data insights.</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult.suggestedVisualizations && analysisResult.suggestedVisualizations.length > 0 ? (
                <ul className="space-y-4">
                  {analysisResult.suggestedVisualizations.map((viz, index) => {
                    const Icon = visualizationIcons[viz.type] || BarChartHorizontalBig;
                    return (
                      <li key={index} className="p-4 border rounded-lg shadow-sm bg-background">
                        <div className="flex items-center mb-2">
                          <Icon className="h-5 w-5 mr-2 text-primary" />
                          <h4 className="font-semibold text-primary">{viz.title}</h4>
                          <Badge variant="outline" className="ml-auto capitalize">{viz.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{viz.description}</p>
                        <p className="text-xs text-foreground/70">
                          Relevant Columns: {viz.columns.join(', ')}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No specific visualizations were suggested.</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent flex items-center">
                <NotebookText className="mr-2 h-5 w-5" />
                Generated Data Analysis Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{analysisResult.generatedReport}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </SectionWrapper>
  );
}
