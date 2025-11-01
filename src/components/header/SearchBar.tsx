import { FilmsAPI } from "@/api/films.api";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const SearchBar = () => {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    if (!q) {
      setResults([])
      return
    }
    const id = setTimeout(async () => {
      setResults(await FilmsAPI.search(q))
    }, 250)
    return () => clearTimeout(id)
  }, [q])

  return (
    <div className="relative">
      <label htmlFor="global-search" className="sr-only">
        Search films
      </label>
      <div className="flex items-center bg-surface rounded-lg px-3 py-2 border border-surface/60">
        <SearchIcon className="w-4 h-4 text-text-secondary" />
        <input
          id="global-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Searching films..."
          className="ml-2 w-full bg-transparent outline-none text-text-primary placeholder:text-text-secondary"
          autoComplete="off"
        />
      </div>

      {open && q && results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-surface rounded-lg shadow-lg overflow-hidden z-50">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                to={`/movies/${r.id}`}
                className="block px-4 py-3 text-sm text-text-primary hover:bg-bg-dark/40"
              >
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar