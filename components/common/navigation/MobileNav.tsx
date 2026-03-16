'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import SearchCommand from '@/components/common/navigation/SearchCommand'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NAVBAR_PRIMARY_ITEMS } from '@/lib/app.settings'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-medium uppercase tracking-wide">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-6">
          <div className="w-full">
            <SearchCommand />
          </div>

          <nav>
            <ul className="flex flex-col space-y-1">
              {NAVBAR_PRIMARY_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
