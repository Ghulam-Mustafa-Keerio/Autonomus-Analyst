import { Bot } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="w-full py-6 mb-8">
      <div className="container mx-auto flex items-center justify-center">
        <Bot className="h-10 w-10 mr-3 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-foreground">
          Autonomous Analyst
        </h1>
      </div>
    </header>
  );
}
