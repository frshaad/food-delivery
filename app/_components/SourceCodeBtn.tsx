import { Github } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function SourceCodeBtn() {
  return (
    <Button variant="outline">
      <a
        href="https://github.com/frshaad/food-delivery"
        target="_blank"
        className="flex items-center gap-4"
      >
        <span className="hidden md:block">Give it a star</span>
        <Github />
      </a>
    </Button>
  );
}
