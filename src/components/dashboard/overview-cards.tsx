'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Transaction } from '@/lib/types';

type OverviewCardsProps = {
  transactions: Transaction[];
};

export function OverviewCards({ transactions }: OverviewCardsProps) {
  const { totalSpent, transactionCount } = useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    return {
      totalSpent: total,
      transactionCount: transactions.length,
    };
  }, [transactions]);

  const averageTransaction =
    transactionCount > 0 ? totalSpent / transactionCount : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {formatCurrency(totalSpent)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{transactionCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Avg. Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {formatCurrency(averageTransaction)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Next Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">Spring Break</div>
          <p className="text-sm text-primary-foreground/80">
            {formatCurrency(1000 - 350)} to go!
          </p>
        </CardContent>
      </Card>
    </>
  );
}
