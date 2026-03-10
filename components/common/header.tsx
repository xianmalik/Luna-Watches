import Link from "next/link";
import { User } from "lucide-react";

import SearchCommand from "@/components/common/navigation/SearchCommand";
import CartIcon from "@/components/common/navigation/CartIcon";
import MobileNav from "@/components/common/navigation/MobileNav";
import { NAVBAR_PRIMARY_ITEMS } from "@/lib/app.settings";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b">
            <div className="container mx-auto max-w-screen-xl">
                {/* Main Header */}
                <div className="flex items-center justify-between gap-4 px-4 py-4 md:py-5">
                    {/* Mobile Menu + Logo */}
                    <div className="flex items-center gap-3">
                        <MobileNav />
                        <Link
                            href="/"
                            className="text-xl md:text-2xl font-semibold uppercase tracking-tight hover:opacity-80 transition-opacity"
                        >
                            Luna Store
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center">
                        <ul className="flex items-center gap-1">
                            {NAVBAR_PRIMARY_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 rounded-lg transition-all"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden md:block">
                            <SearchCommand iconOnly />
                        </div>
                        <CartIcon />
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="hover:bg-neutral-100">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden px-4 pb-4">
                    <SearchCommand />
                </div>
            </div>
        </header>
    );
}