import type { Icon } from '@/components/icons';

export type Transaction = {
  id: string;
  date: string; // ISO string
  description: string;
  amount: number;
  category: string;
};

export type Category = {
  id: string;
  name: string;
  icon: Icon;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
};

export type Budget = {
  category: string;
  limit: number;
  spent: number;
};
