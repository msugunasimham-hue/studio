'use client';

import type { Goal } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getIcon } from '@/components/icons';

type GoalTrackerProps = {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
};

export function GoalTracker({ goals, setGoals }: GoalTrackerProps) {
  const GoalsIcon = getIcon('goals');
  const AddIcon = getIcon('add');

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
          <GoalsIcon className="size-5 text-muted-foreground" />
          <CardTitle>Financial Goals</CardTitle>
        </div>
        <CardDescription>Track your progress towards your goals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium">{goal.name}</span>
                <span className="text-muted-foreground">
                  {formatCurrency(goal.currentAmount)} /{' '}
                  {formatCurrency(goal.targetAmount)}
                </span>
              </div>
              <Progress value={progress} />
            </div>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" disabled>
          <AddIcon />
          Add New Goal
        </Button>
      </CardFooter>
    </Card>
  );
}
