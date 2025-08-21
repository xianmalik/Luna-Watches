'use client'

import { useState, useDeferredValue } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const deferredQuery = useDeferredValue(query)

    return (
    <div className="flex w-full max-w-xs items-center relative">
      <Input
        className="rounded-none pl-8 placeholder:text-xs"
        placeholder="Search Products"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />

      <span className="absolute left-1 top-1/2 -translate-y-1/2 size-7 grid place-items-center">
        <SearchIcon className="h-4 w-4" />
      </span>
    </div>
  )
}
