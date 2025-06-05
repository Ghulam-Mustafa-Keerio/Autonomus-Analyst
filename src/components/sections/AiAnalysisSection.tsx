"use client";

import { useState, useTransition } from 'react';
import { Brain, Lightbulb, Search, AlertTriangle, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyzeData, type AnalyzeDataOutput } from '@/ai/flows/analyze-data-flow';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const sampleCsvString = `Date,Product,Sales,Region
2024-01-01,A,100,North
2024-01-02,B,150,North
2024-01-03,A,120,South
2024-01-04,C,200,East
2024-01-05,B,130,West
2024-01-06,A,110,North
2024-01-07,C,220,South`;

export function AiAnalysisSection() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeDataOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalyzeData = () => {
    setError(null);
    setAnalysisResult(null);
    startTransition(async () => {
      try {
        const result = await analyzeData({ csvData: sampleCsvString });
        setAnalysisResult(result);
        toast({
          title: "Analysis Complete",
          description: "Sample data has been successfully analyzed.",
        });
      } catch (err) {
        console.error("Analysis error:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({
          title: "Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <SectionWrapper title="AI-Powered Data Analysis" icon={Brain}>
      <p className="mb-6 text-muted-foreground">
        This section demonstrates the autonomous AI agent's capability to analyze data and provide insights.
        Click the button below to analyze a pre-defined sample dataset of sales figures.
      </p>
      
      <Button onClick={handleAnalyzeData} disabled={isPending} className="mb-6 bg-primary hover:bg-primary/90 text-primary-foreground">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Analyze Sample Sales Data
          </>
        )}
      </Button>

      {error && (
        <Card className="border-destructive bg-destructive/10 animate-fade-in">
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
        <div className="space-y-6 animate-fade-in">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                Summary
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
        </div>
      )}
    </SectionWrapper>
  );
}
