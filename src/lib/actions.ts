'use server';

import {
  categorizeTransaction as categorize,
  type CategorizeTransactionInput,
} from '@/ai/flows/categorize-transaction';
import { z } from 'zod';

const CategorizeTransactionActionInput = z.object({
  description: z.string(),
  amount: z.number(),
  categories: z.array(z.string()),
});

export async function categorizeTransactionAction(
  input: z.infer<typeof CategorizeTransactionActionInput>
): Promise<{ category: string } | { error: string }> {
  const parsedInput = CategorizeTransactionActionInput.safeParse(input);
  if (!parsedInput.success) {
    return { error: 'Invalid input' };
  }

  const aiInput: CategorizeTransactionInput = {
    transaction: {
      description: parsedInput.data.description,
      amount: parsedInput.data.amount,
      date: new Date().toISOString(),
    },
    categories: parsedInput.data.categories,
  };

  try {
    const result = await categorize(aiInput);
    if (!result || !result.category) {
      throw new Error('AI categorization failed');
    }
    return { category: result.category };
  } catch (error) {
    console.error('Error categorizing transaction:', error);
    return {
      error: 'Failed to categorize transaction. Please select a category manually.',
    };
  }
}
