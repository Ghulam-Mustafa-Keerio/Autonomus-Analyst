'use server';
/**
 * @fileOverview Orchestrates a full data analysis, including insights, metrics, visualization suggestions, and a report.
 * - getFullDataAnalysis - Main function to call.
 * - FullDataAnalysisInput - Input type for this flow.
 * - FullDataAnalysisOutput - Output type for this flow.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateDataAnalysisReport, type GenerateDataAnalysisReportInput } from './generate-data-analysis-report';

// Input for the orchestrating flow is just the CSV data
const FullDataAnalysisInputSchema = z.object({
  csvData: z.string().describe('The CSV data content as a string.'),
});
export type FullDataAnalysisInput = z.infer<typeof FullDataAnalysisInputSchema>;

// Schema for the initial analysis part (metrics, viz suggestions, summary, PoI)
const InitialAnalysisOutputSchema = z.object({
    summary: z.string().describe('A summary of the key insights from the data file.'),
    potentialAreasOfInterest: z
      .string()
      .describe('Potential areas of interest for deeper investigation.'),
    keyMetrics: z.array(z.object({
      name: z.string().describe("Name of the key metric (e.g., 'Total Sales', 'Average Quantity')."),
      value: z.string().describe("Calculated value of the metric."),
      insight: z.string().optional().describe("Brief insight or context for the metric."),
    })).describe("Key metrics derived from the data, suitable for a dashboard overview. Calculate at least 3-4 diverse metrics. Ensure values are calculated correctly from the data."),
    suggestedVisualizations: z.array(z.object({
      title: z.string().describe("A descriptive title for the suggested visualization (e.g., 'Sales per Product')."),
      type: z.enum(['bar', 'line', 'pie', 'scatter', 'table']).describe("The type of chart or visualization suggested. Choose the most appropriate type for the data relationship from 'bar', 'line', 'pie', 'scatter', 'table'."),
      description: z.string().describe("A brief explanation of what this visualization would show (e.g., 'This bar chart shows total sales for each product.') and why it's useful."),
      columns: z.array(z.string()).describe("The names of the CSV columns that are directly relevant for creating this visualization (e.g., ['Product', 'Sales'] for sales per product)."),
    })).describe("Suggest 2-3 diverse visualizations appropriate for the data. For each, specify title, type, description, and relevant columns."),
});


// Combined Output Schema for the main exported function
const FullDataAnalysisOutputSchema = InitialAnalysisOutputSchema.extend({
  generatedReport: z.string().describe('A detailed natural language report based on the analysis summary and areas of interest.'),
});
export type FullDataAnalysisOutput = z.infer<typeof FullDataAnalysisOutputSchema>;


const initialAnalysisPrompt = ai.definePrompt({
    name: 'initialAnalysisDataPrompt',
    input: {schema: FullDataAnalysisInputSchema },
    output: {schema: InitialAnalysisOutputSchema },
    prompt: `You are an expert data analyst. You will analyze the CSV data provided and perform the following tasks:
1.  Summarize key insights from the data.
2.  Identify potential areas of interest for deeper investigation.
3.  Extract key performance indicators (KPIs) or metrics that would be suitable for a dashboard. Provide at least 3-4 diverse metrics, including their name, calculated value, and a brief insight if applicable. Ensure values are calculated correctly from the data.
4.  Suggest 2-3 diverse and meaningful visualizations (e.g., bar chart, line graph, pie chart, scatter plot, or a summary table). For each suggestion, provide:
    a.  A clear title (e.g., "Total Sales by Region", "Sales Trend Over Time").
    b.  The type of visualization (choose from 'bar', 'line', 'pie', 'scatter', 'table').
    c.  A concise description of what the visualization would show and its purpose.
    d.  The specific column names from the CSV that would be used to create this visualization.

Data Content:
\`\`\`csv
{{{csvData}}}
\`\`\`
`,
});

// Main exported function for the UI to call
export async function getFullDataAnalysis(input: FullDataAnalysisInput): Promise<FullDataAnalysisOutput> {
    return getFullDataAnalysisFlow(input);
}

const getFullDataAnalysisFlow = ai.defineFlow(
  {
    name: 'getFullDataAnalysisFlow',
    inputSchema: FullDataAnalysisInputSchema,
    outputSchema: FullDataAnalysisOutputSchema,
  },
  async (input) => {
    // Step 1: Get initial analysis (summary, interests, metrics, viz suggestions)
    const { output: initialAnalysis } = await initialAnalysisPrompt(input);
    if (!initialAnalysis) {
        throw new Error('Initial analysis failed to produce output.');
    }

    // Step 2: Generate a detailed report based on summary and areas of interest from initial analysis
    const reportInput: GenerateDataAnalysisReportInput = {
      analysisResults: `Summary: ${initialAnalysis.summary}\nPotential Areas of Interest: ${initialAnalysis.potentialAreasOfInterest}`,
      reportFormatInstructions: "Generate a comprehensive natural language report based on the provided analysis summary and areas of interest. Elaborate on the findings and structure it as a professional data analysis report. Ensure the report is well-structured and provides actionable insights.",
    };
    const reportOutput = await generateDataAnalysisReport(reportInput);

    // Step 3: Combine all results
    return {
      ...initialAnalysis,
      generatedReport: reportOutput.report,
    };
  }
);
