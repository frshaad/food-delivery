import { FishSymbol } from 'lucide-react';
import Link from 'next/link';

import { logoFont } from '@/fonts';
import { cn } from '@/lib/utils';

import CartTrigger from './CartTrigger';
import SourceCodeBtn from './SourceCodeBtn';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-4 sm:text-2xl font-bold text-primary',
            logoFont.className,
          )}
        >
          <FishSymbol size={40} />
          <span className="relative top-[1px]">Fin & Flavor</span>
        </Link>
        <div className="flex items-center gap-6 sm:gap-12">
          <CartTrigger />
          <div className="flex items-center gap-3">
            <SourceCodeBtn />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
