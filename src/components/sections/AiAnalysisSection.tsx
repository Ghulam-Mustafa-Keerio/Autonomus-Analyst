
"use client";

import { useState, useTransition, useRef, type ChangeEvent } from 'react';
import { 
  Brain, Lightbulb, Search, AlertTriangle, FileText, Loader2, Presentation, BarChartHorizontalBig, NotebookText, LineChart, PieChartIcon, ScatterChart, TableIcon, UploadCloud, Cpu
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFullDataAnalysis, type FullDataAnalysisOutput } from '@/ai/flows/get-full-data-analysis-flow';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  BarChart, 
  LineChart as RechartsLineChart, // Alias to avoid conflict with Lucide icon
  XAxis, 
  YAxis, 
  Bar, 
  Line as RechartsLine, // Alias to avoid conflict with Lucide icon
  CartesianGrid, 
  Tooltip as RechartsTooltip, // Alias to avoid conflict with Lucide icon
  Legend as RechartsLegend, // Alias to avoid conflict with Lucide icon
  ResponsiveContainer
} from 'recharts';

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

// Define a simple chart config for recharts
const defaultChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
};


export function AiAnalysisSection() {
  const [analysisResult, setAnalysisResult] = useState<FullDataAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [uploadedCsvData, setUploadedCsvData] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setUploadedCsvData(text);
        setUploadedFileName(file.name);
        setAnalysisResult(null); // Clear previous results
        setError(null);
        toast({
          title: "File Ready",
          description: `${file.name} has been loaded and is ready for analysis.`,
        });
      };
      reader.readAsText(file);
    } else {
      setUploadedCsvData(null);
      setUploadedFileName(null);
    }
  };

  const handleAnalyzeData = () => {
    const dataToAnalyze = uploadedCsvData || sampleCsvString;
    const analysisType = uploadedCsvData ? "Uploaded Data" : "Sample Data";

    if (!dataToAnalyze) {
      toast({
        title: "No Data",
        description: "Please upload a CSV file or use the sample data.",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setAnalysisResult(null);
    startTransition(async () => {
      try {
        const result = await getFullDataAnalysis({ csvData: dataToAnalyze });
        setAnalysisResult(result);
        toast({
          title: `${analysisType} Analysis Complete`,
          description: "Data has been analyzed, report generated, and suggestions provided.",
        });
      } catch (err) {
        console.error(`${analysisType} analysis error:`, err);
        const errorMessage = err instanceof Error ? err.message : `An unknown error occurred during ${analysisType.toLowerCase()} analysis.`;
        setError(errorMessage);
        toast({
          title: `${analysisType} Analysis Failed`,
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <SectionWrapper title="AI-Powered Data Analysis Suite" icon={Brain}>
      <p className="mb-4 text-muted-foreground">
        Upload your own CSV data or use the sample sales data to generate insights, key metrics, visualization suggestions, ML model recommendations, and a full report.
      </p>

      <Card className="mb-6 p-4 bg-secondary/20 shadow-sm">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="csv-upload" className="text-primary font-semibold">Upload CSV File</Label>
          <Input 
            id="csv-upload" 
            type="file" 
            accept=".csv" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
        </div>
        {uploadedFileName && <p className="mt-2 text-sm text-muted-foreground">Loaded: <span className="font-medium text-accent">{uploadedFileName}</span></p>}
      </Card>
      
      <Button onClick={handleAnalyzeData} disabled={isPending} className="mb-8 bg-primary hover:bg-primary/90 text-primary-foreground">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Performing Full Analysis...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Analyze {uploadedCsvData ? uploadedFileName || "Uploaded Data" : "Sample Data"}
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
                Suggested Visualizations & Charts
              </CardTitle>
              <CardDescription>Recommendations for visualizing the data insights. Basic charts are rendered if data is provided by AI.</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult.suggestedVisualizations && analysisResult.suggestedVisualizations.length > 0 ? (
                <ul className="space-y-6">
                  {analysisResult.suggestedVisualizations.map((viz, index) => {
                    const Icon = visualizationIcons[viz.type] || BarChartHorizontalBig;
                    const canRenderChart = (viz.type === 'bar' || viz.type === 'line') && viz.data && Array.isArray(viz.data) && viz.data.length > 0;
                    
                    return (
                      <li key={index} className="p-4 border rounded-lg shadow-sm bg-background">
                        <div className="flex items-center mb-2">
                          <Icon className="h-5 w-5 mr-2 text-primary" />
                          <h4 className="font-semibold text-primary">{viz.title}</h4>
                          <Badge variant="outline" className="ml-auto capitalize">{viz.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{viz.description}</p>
                        <p className="text-xs text-foreground/70 mb-3">
                          Relevant Columns: {viz.columns.join(', ')}
                        </p>
                        {canRenderChart && (
                          <div className="mt-4 h-[300px] p-2 border rounded-md bg-secondary/10">
                            <ResponsiveContainer width="100%" height="100%">
                              {viz.type === 'bar' ? (
                                <BarChart data={viz.data}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                  <RechartsTooltip
                                    contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                                    labelStyle={{ color: "hsl(var(--foreground))" }}
                                  />
                                  <RechartsLegend />
                                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                              ) : viz.type === 'line' ? (
                                <RechartsLineChart data={viz.data}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                   <RechartsTooltip
                                    contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                                    labelStyle={{ color: "hsl(var(--foreground))" }}
                                  />
                                  <RechartsLegend />
                                  <RechartsLine type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
                                </RechartsLineChart>
                              ) : null}
                            </ResponsiveContainer>
                          </div>
                        )}
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
                <Cpu className="mr-2 h-5 w-5" />
                Suggested Machine Learning Models
              </CardTitle>
              <CardDescription>Potential ML models based on data characteristics and insights.</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult.suggestedMlModels && analysisResult.suggestedMlModels.length > 0 ? (
                <ul className="space-y-4">
                  {analysisResult.suggestedMlModels.map((model, index) => (
                    <li key={index} className="p-4 border rounded-lg shadow-sm bg-background">
                       <div className="flex items-center mb-2">
                          <Cpu className="h-5 w-5 mr-2 text-primary" />
                          <h4 className="font-semibold text-primary">{model.modelName}</h4>
                          <Badge variant="secondary" className="ml-auto capitalize">{model.modelType}</Badge>
                        </div>
                      <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground/90">Rationale:</span> {model.rationale}</p>
                      {model.potentialTargetVariable && (
                        <p className="text-xs text-foreground/70">
                          Potential Target Variable: {model.potentialTargetVariable}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No specific machine learning models were suggested.</p>
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

