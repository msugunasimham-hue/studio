'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import type { Transaction } from '@/lib/types';
import { getIcon } from '@/components/icons';

type PredictiveSpendingProps = {
  transactions: Transaction[];
};

const chartConfig = {
  spending: {
    label: 'Spending',
    color: 'hsl(var(--chart-1))',
  },
  predicted: {
    label: 'Predicted',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function PredictiveSpending({ transactions }: PredictiveSpendingProps) {
  const PredictiveIcon = getIcon('predictive');
  const chartData = useMemo(() => {
    const dailySpending: Record<string, number> = {};
    transactions.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      dailySpending[date] = (dailySpending[date] || 0) + t.amount;
    });

    const data = Object.entries(dailySpending)
      .map(([date, spending]) => ({
        date,
        spending,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Simple prediction: project next 3 days based on average
    if (data.length > 1) {
      const avgSpending =
        data.reduce((sum, d) => sum + d.spending, 0) / data.length;
      let lastDate = new Date(data[data.length - 1].date);
      for (let i = 1; i <= 3; i++) {
        lastDate.setDate(lastDate.getDate() + 1);
        data.push({
          date: lastDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          spending: 0,
          predicted: avgSpending * (1 + (Math.random() - 0.5) * 0.2), // add some noise
        });
      }
    }

    return data;
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <PredictiveIcon className="size-5 text-muted-foreground" />
          <CardTitle>Predictive Spending Analysis</CardTitle>
        </div>
        <CardDescription>
          Your spending trend based on historical data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="spending"
              type="monotone"
              stroke="var(--color-spending)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="predicted"
              type="monotone"
              stroke="var(--color-predicted)"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
