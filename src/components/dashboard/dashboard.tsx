'use client';

import { useState, useMemo } from 'react';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { GoalTracker } from '@/components/dashboard/goal-tracker';
import { BudgetStatus } from '@/components/dashboard/budget-status';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { PredictiveSpending } from '@/components/dashboard/predictive-spending';
import {
  initialTransactions,
  initialCategories,
  initialGoals,
  initialBudgets,
} from '@/lib/data';
import type { Transaction, Category, Goal, Budget } from '@/lib/types';

export function Dashboard() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [categories] = useState<Category[]>(initialCategories);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [
      { ...newTransaction, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const budgets: Budget[] = useMemo(() => {
    const spendingByCategory = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return initialBudgets.map((b) => ({
      ...b,
      spent: spendingByCategory[b.category] || 0,
    }));
  }, [transactions]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader
          categories={categories}
          onAddTransaction={handleAddTransaction}
        />
        <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewCards transactions={transactions} />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="col-span-1 lg:col-span-4">
              <PredictiveSpending transactions={transactions} />
            </div>
            <div className="col-span-1 lg:col-span-3">
              <SpendingChart transactions={transactions} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <BudgetStatus budgets={budgets} />
            <GoalTracker goals={goals} setGoals={setGoals} />
          </div>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
