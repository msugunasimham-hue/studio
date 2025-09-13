import {
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
  Ticket,
  Bus,
  Tv,
  Home,
  FileText,
  HelpCircle,
  PiggyBank,
  type LucideIcon,
  Bot,
  BarChart,
  Settings,
  PlusCircle,
  User,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  MoreHorizontal,
} from 'lucide-react';

export const Icons = {
  logo: Wallet,
  dashboard: LayoutDashboard,
  transactions: FileText,
  goals: PiggyBank,
  budgets: Landmark,
  reports: BarChart,
  predictive: TrendingUp,
  settings: Settings,
  user: User,
  add: PlusCircle,
  ai: Bot,
  more: MoreHorizontal,
  food: UtensilsCrossed,
  shopping: ShoppingBag,
  entertainment: Ticket,
  transport: Bus,
  housing: Home,
  utilities: Tv,
  other: HelpCircle,
};

export type Icon = keyof typeof Icons;

// Helper to get an icon component by its name
export const getIcon = (name: Icon): LucideIcon => {
  return Icons[name] || HelpCircle;
};
