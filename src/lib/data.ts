import type { Transaction, Goal, Category, Budget } from '@/lib/types';
import { Icons } from '@/components/icons';

export const initialCategories: Category[] = [
  { id: 'food', name: 'Food & Dining', icon: 'food' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping' },
  { id: 'housing', name: 'Housing', icon: 'housing' },
  { id: 'transport', name: 'Transportation', icon: 'transport' },
  { id: 'entertainment', name: 'Entertainment', icon: 'entertainment' },
  { id: 'utilities', name: 'Utilities', icon: 'utilities' },
  { id: 'other', name: 'Other', icon: 'other' },
];

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    description: 'Coffee with friends',
    amount: 12.5,
    category: 'Food & Dining',
  },
  {
    id: '2',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    description: 'New headphones',
    amount: 150,
    category: 'Shopping',
  },
  {
    id: '3',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    description: 'Monthly bus pass',
    amount: 65,
    category: 'Transportation',
  },
  {
    id: '4',
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    description: 'Movie night',
    amount: 35.75,
    category: 'Entertainment',
  },
  {
    id: '5',
    date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    description: 'Groceries',
    amount: 88.2,
    category: 'Food & Dining',
  },
  {
    id: '6',
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    description: 'Electricity Bill',
    amount: 75,
    category: 'Utilities',
  },
  {
    id: '7',
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    description: 'Rent',
    amount: 800,
    category: 'Housing',
  },
];

export const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'Spring Break Trip',
    targetAmount: 1000,
    currentAmount: 350,
  },
  { id: '2', name: 'New Laptop', targetAmount: 1200, currentAmount: 800 },
];

export const initialBudgets: Omit<Budget, 'spent'>[] = [
  { category: 'Food & Dining', limit: 400 },
  { category: 'Shopping', limit: 200 },
  { category: 'Entertainment', limit: 150 },
  { category: 'Transportation', limit: 100 },
  { category: 'Other', limit: 50 },
];
