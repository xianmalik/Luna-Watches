"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 h-10 bg-neutral-50 border-neutral-200 focus:bg-white transition-colors"
      />
    </div>
  );
}
