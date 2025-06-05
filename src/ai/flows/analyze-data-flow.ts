'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing data files and providing AI-powered summaries.
 *
 * - analyzeData - A function that takes CSV data as a string and returns an AI-powered analysis.
 * - AnalyzeDataInput - The input type for the analyzeData function.
 * - AnalyzeDataOutput - The return type for the analyzeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDataInputSchema = z.object({
  csvData: z.string().describe('The CSV data content as a string.'),
});
export type AnalyzeDataInput = z.infer<typeof AnalyzeDataInputSchema>;

const AnalyzeDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the key insights from the data file.'),
  potentialAreasOfInterest: z
    .string()
    .describe('Potential areas of interest for deeper investigation.'),
});
export type AnalyzeDataOutput = z.infer<typeof AnalyzeDataOutputSchema>;

export async function analyzeData(input: AnalyzeDataInput): Promise<AnalyzeDataOutput> {
  return analyzeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDataPrompt',
  input: {schema: AnalyzeDataInputSchema},
  output: {schema: AnalyzeDataOutputSchema},
  prompt: `You are an expert data analyst. You will analyze the data provided and summarize key insights and potential areas of interest for deeper investigation.

Data Content:
\`\`\`csv
{{{csvData}}}
\`\`\``,
});

const analyzeDataFlow = ai.defineFlow(
  {
    name: 'analyzeDataFlow',
    inputSchema: AnalyzeDataInputSchema,
    outputSchema: AnalyzeDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
