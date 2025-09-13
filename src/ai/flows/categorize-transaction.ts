'use server';

/**
 * @fileOverview Automatically categorizes transactions using an LLM.
 *
 * - categorizeTransaction - A function that categorizes a transaction.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  description: z.string().describe('The description of the transaction.'),
  amount: z.number().describe('The amount of the transaction.'),
  date: z.string().describe('The date of the transaction.'),
});

const CategorizeTransactionInputSchema = z.object({
  transaction: TransactionSchema.describe('The transaction to categorize.'),
  categories: z
    .string()
    .array()
    .describe('The list of available categories.'),
});
export type CategorizeTransactionInput = z.infer<
  typeof CategorizeTransactionInputSchema
>;

const CategorizeTransactionOutputSchema = z.object({
  category: z.string().describe('The category of the transaction.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the categorization.'),
});
export type CategorizeTransactionOutput = z.infer<
  typeof CategorizeTransactionOutputSchema
>;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const categorizeTransactionPrompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a personal finance expert. Your job is to categorize transactions into predefined categories.

Transaction Description: {{{transaction.description}}}
Transaction Amount: {{{transaction.amount}}}
Transaction Date: {{{transaction.date}}}

Available Categories: {{#each categories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the transaction description, amount, and date, choose the most appropriate category from the available categories. Also, provide a confidence level (0 to 1) for your categorization.

Ensure that the category you pick is from the list of available categories, and respond only with JSON.
`,
});

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await categorizeTransactionPrompt(input);
    return output!;
  }
);
