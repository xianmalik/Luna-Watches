import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export default function SearchBar() {
    return (
    <div className="flex w-full max-w-xs items-center relative">
      <Input placeholder="Search through our catalogue" />

      <Button 
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        // onClick={() => {}}
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
