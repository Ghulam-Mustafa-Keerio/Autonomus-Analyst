// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Generates a natural language report summarizing the results of a data analysis.
 *
 * - generateDataAnalysisReport - A function that generates the data analysis report.
 * - GenerateDataAnalysisReportInput - The input type for the generateDataAnalysisReport function.
 * - GenerateDataAnalysisReportOutput - The return type for the generateDataAnalysisReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDataAnalysisReportInputSchema = z.object({
  analysisResults: z
    .string()
    .describe('The results of the data analysis to summarize.'),
  reportFormatInstructions: z
    .string()
    .optional()
    .describe('Specific instructions for the format of the report.'),
});
export type GenerateDataAnalysisReportInput = z.infer<
  typeof GenerateDataAnalysisReportInputSchema
>;

const GenerateDataAnalysisReportOutputSchema = z.object({
  report: z.string().describe('The generated natural language report.'),
});
export type GenerateDataAnalysisReportOutput = z.infer<
  typeof GenerateDataAnalysisReportOutputSchema
>;

export async function generateDataAnalysisReport(
  input: GenerateDataAnalysisReportInput
): Promise<GenerateDataAnalysisReportOutput> {
  return generateDataAnalysisReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDataAnalysisReportPrompt',
  input: {schema: GenerateDataAnalysisReportInputSchema},
  output: {schema: GenerateDataAnalysisReportOutputSchema},
  prompt: `You are an AI assistant that specializes in creating reports.

  You will receive the results of a data analysis, and your job is to create a natural language report summarizing the findings for stakeholders.

  Data Analysis Results: {{{analysisResults}}}

  {{#if reportFormatInstructions}}
  Report Format Instructions: {{{reportFormatInstructions}}}
  {{/if}}`,
});

const generateDataAnalysisReportFlow = ai.defineFlow(
  {
    name: 'generateDataAnalysisReportFlow',
    inputSchema: GenerateDataAnalysisReportInputSchema,
    outputSchema: GenerateDataAnalysisReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
