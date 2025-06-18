import {useState} from "react"

interface CategoryTile {
  title: string
  subtitle: string
  color: string
}

interface CategoryTilesProps {
  tiles: CategoryTile[]
}

export function CategoryTiles({ tiles }: CategoryTilesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleTileClick = (title: string) => {
    // Handle tile click - could navigate to specific sections or trigger actions
    switch (title) {
      case "Tools for Everyone":
        window.location.href = "/category/tools-equipment"
        break
      case "Best Price Guarantee":
        // Could show a modal with price guarantee info
        alert("Best Price Guarantee: We'll match any competitor's price!")
        break
      case "Weekend Specials":
        // Could filter products by weekend deals
        alert("Weekend Specials: Check out our special weekend pricing!")
        break
      case "Popular Items":
        // Could scroll to popular items section or filter by popularity
        document.getElementById("popular-items")?.scrollIntoView({ behavior: "smooth" })
        break
      default:
        break
    }
  }

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`${tile.color} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform ${
                hoveredIndex === index ? "scale-105" : "hover:scale-102"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleTileClick(tile.title)}
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm md:text-base">{tile.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{tile.subtitle}</p>

              {/* Add visual indicators for different tile types */}
              <div className="mt-3 flex justify-center">
                {tile.title === "Tools for Everyone" && <span className="text-2xl">🔧</span>}
                {tile.title === "Best Price Guarantee" && <span className="text-2xl">💰</span>}
                {tile.title === "Weekend Specials" && <span className="text-2xl">🎉</span>}
                {tile.title === "Popular Items" && <span className="text-2xl">⭐</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
