'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Icons, getIcon } from '@/components/icons';
import { categorizeTransactionAction } from '@/lib/actions';
import type { Category, Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
  category: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

type AddTransactionDialogProps = {
  categories: Category[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
};

export function AddTransactionDialog({
  categories,
  onAddTransaction,
}: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isCategorizing, setIsCategorizing] = useState(false);
  const { toast } = useToast();
  const AddIcon = getIcon('add');
  const AiIcon = getIcon('ai');

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      amount: 0,
    },
  });

  const handleDescriptionBlur = async () => {
    const description = form.getValues('description');
    const amount = form.getValues('amount');
    if (description && amount > 0) {
      setIsCategorizing(true);
      const result = await categorizeTransactionAction({
        description,
        amount,
        categories: categories.map((c) => c.name),
      });
      if ('category' in result && result.category) {
        form.setValue('category', result.category);
      }
      setIsCategorizing(false);
    }
  };

  const onSubmit = (values: TransactionFormValues) => {
    if (!values.category) {
      form.setError('category', {
        type: 'manual',
        message: 'Please select a category.',
      });
      return;
    }

    startTransition(() => {
      onAddTransaction({
        date: new Date().toISOString(),
        description: values.description,
        amount: values.amount,
        category: values.category as string,
      });

      toast({
        title: 'Transaction Added',
        description: `${values.description} has been successfully added.`,
      });

      form.reset();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your transaction. The category will be
            auto-suggested.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Coffee with friends"
                      {...field}
                      onBlur={handleDescriptionBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onBlur={handleDescriptionBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="relative">
                    <AiIcon
                      className={cn(
                        'pointer-events-none absolute left-2.5 top-2.5 z-10 size-5 text-muted-foreground',
                        isCategorizing && 'animate-spin'
                      )}
                    />
                    {isCategorizing && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isCategorizing}
                    >
                      <FormControl>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending || isCategorizing}>
                {isPending ? 'Adding...' : 'Add Transaction'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
