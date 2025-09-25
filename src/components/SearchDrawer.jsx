// components/SearchDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

export default function SearchDrawer({
  isSearchOpen,
  toggleSearch,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  results,
  loading,
}) 




{
  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.4,
          }}
          className="fixed right-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full sm:max-w-md bg-secondary shadow-xl z-modal border-l border-border"
          style={{
            borderBottomLeftRadius: window.innerWidth >= 640 ? "4rem" : "0",
          }}
        >
          <div className="p-4 sm:p-6 h-full flex flex-col">
            {/* Close button (mobile only) */}
            <div className="flex justify-end mb-4 sm:hidden">
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-hover rounded-lg transition-colors"
                aria-label="Close search"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>

            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents, departments, or content..."
                  className="w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent bg-secondary text-primary placeholder-neutral-400 text-sm sm:text-base"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 bg-accent text-secondary rounded-full hover:bg-accent/90 transition-colors font-medium text-sm sm:text-base"
              >
                Search
              </button>
            </form>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="text-sm text-neutral-500">Searching...</div>
              )}

              {!loading && results?.length > 0 && (
                <ul className="space-y-3">
                  {results.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-lg border border-border bg-secondary hover:bg-hover cursor-pointer"
                    >
                      <h3 className="font-medium text-primary text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 text-xs sm:text-sm">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {!loading && searchQuery && results?.length === 0 && (
                <div className="text-sm text-neutral-500">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
