import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionWrapper({ title, icon: Icon, children, className, contentClassName }: SectionWrapperProps) {
  return (
    <Card className={cn("w-full shadow-lg rounded-xl overflow-hidden", className)}>
      <CardHeader className="bg-secondary/50">
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          {Icon && <Icon className="h-7 w-7 mr-3" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("p-6 text-foreground/90", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
