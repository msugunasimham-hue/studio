'use client';

import type { Budget, Category } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { initialCategories } from '@/lib/data';

type BudgetStatusProps = {
  budgets: Budget[];
};

export function BudgetStatus({ budgets }: BudgetStatusProps) {
  const BudgetsIcon = getIcon('budgets');

  const categoryMap = new Map(initialCategories.map(c => [c.name, c]));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BudgetsIcon className="size-5 text-muted-foreground" />
          <CardTitle>Budget Status</CardTitle>
        </div>
        <CardDescription>Your spending vs. your budget limits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.limit) * 100;
          const category = categoryMap.get(budget.category);
          const Icon = category ? getIcon(category.icon) : getIcon('other');
          
          return (
            <div key={budget.category}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Icon className="size-4 text-muted-foreground" />
                   <span className="font-medium">{budget.category}</span>
                </div>
                <span className={cn(
                    "text-sm",
                    progress > 100 ? "text-destructive font-semibold" : "text-muted-foreground"
                )}>
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                </span>
              </div>
              <Progress
                value={Math.min(progress, 100)}
                className={cn(
                    progress > 90 && progress <= 100 && "[&>div]:bg-yellow-500",
                    progress > 100 && "[&>div]:bg-destructive"
                )}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
