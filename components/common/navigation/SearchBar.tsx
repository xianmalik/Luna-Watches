import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export default function SearchBar() {
    return (
    <div className="flex w-full max-w-xs items-center relative">
      <Input
        className="rounded-none pl-8"
        placeholder="Search through our catalogue" />

      <span className="absolute left-1 top-1/2 -translate-y-1/2 size-7 grid place-items-center">
        <SearchIcon className="h-4 w-4" />
      </span>
    </div>
  )
}
