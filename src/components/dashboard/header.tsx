import { SidebarTrigger } from '@/components/ui/sidebar';
import { AddTransactionDialog } from '@/components/dashboard/add-transaction-dialog';
import type { Category, Transaction } from '@/lib/types';

type DashboardHeaderProps = {
  categories: Category[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
};

export function DashboardHeader({
  categories,
  onAddTransaction,
}: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
      <div className="ml-auto">
        <AddTransactionDialog
          categories={categories}
          onAddTransaction={onAddTransaction}
        />
      </div>
    </header>
  );
}
