import { Github } from 'lucide-react';

import { Button } from '@/components/ui/button';

import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <div></div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <a href="https://github.com/frshaad/food-delivery">
            <Github />
          </a>
        </Button>
        <ThemeSwitch />
      </div>
    </header>
  );
}
