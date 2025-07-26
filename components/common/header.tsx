import Link from "next/link";
import { MoonIcon, ShoppingCart, User } from "lucide-react";

// sub components
import SearchBar from "@/components/common/navigation/SearchBar";

import { NAVBAR_PRIMARY_ITEMS } from "@/lib/app.settings";

export default function Header() {
    return (
        <header className="text-black shadow-md p-4">
            {/* Primary Header */}
            <div className="container mx-auto grid md:grid-cols-2 items-center px-2">
                {/* Logo */}
                <Link href="/" className="text-2xl font-light uppercase flex items-center gap-2">
                    <MoonIcon />
                    {"Luna Watches"}
                </Link>

                {/* Right Icons */}
                <div className="flex items-center justify-end gap-4">
                    <SearchBar />
                    <Link href="/login"><User /></Link>
                    <Link href="/cart"><ShoppingCart /></Link>
                </div>
            </div>
        
            {/* Navigation Menu */}
            <nav className="container mx-auto mt-4">
                <ul className="flex space-x-4">
                    {NAVBAR_PRIMARY_ITEMS.map((item) => (
                        <li className="le-navbar--item" key={item.href}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}