import Link from "next/link";
import { MenuIcon, ShoppingCart, User } from "lucide-react";

// sub components
import SearchBar from "@/components/common/navigation/SearchBar";

// Contents
import nav from "@/content/nav-primary.json";

export default function Header() {
    return (
        <header className="text-black shadow-md p-4">
            {/* Primary Header */}
            <div className="container mx-auto grid grid-cols-5 md:grid-cols-2 items-center px-2">
                {/* Left Icons */}
                <div className="flex md:hidden items-center gap-4">
                    <MenuIcon />
                </div>

                {/* Logo */}
                <Link href="/" className="text-2xl font-medium uppercase flex items-center justify-center md:justify-start gap-2 col-span-3 md:col-span-1">
                    {"Luna Watches"}
                </Link>

                {/* Right Icons */}
                <div className="flex items-center justify-end gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <SearchBar />
                        <Link href="/cart"><ShoppingCart /></Link>
                    </div>
                    <Link href="/login"><User /></Link>
                </div>
            </div>
        
            {/* Navigation Menu */}
            <nav className="container mx-auto hidden md:block mt-4">
                <ul className="flex space-x-4">
                    {nav.map((item) => (
                        <li className="le-navbar--item" key={item.href}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}