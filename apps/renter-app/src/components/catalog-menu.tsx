import {useRef, useState} from "react"
import {ChevronDown, ChevronRight} from "lucide-react"

interface CatalogItem {
  id: string
  name: string
  icon?: string
  subcategories?: CatalogItem[]
}

interface CatalogMenuProps {
  onClose: () => void
  isMobile?: boolean
}

const catalogData: CatalogItem[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    subcategories: [
      {
        id: "cameras",
        name: "Cameras & Photography",
        subcategories: [
          { id: "dslr", name: "DSLR Cameras" },
          { id: "mirrorless", name: "Mirrorless Cameras" },
          { id: "lenses", name: "Camera Lenses" },
          { id: "tripods", name: "Tripods & Stabilizers" },
          { id: "lighting", name: "Photography Lighting" },
        ],
      },
      {
        id: "audio",
        name: "Audio Equipment",
        subcategories: [
          { id: "microphones", name: "Microphones" },
          { id: "speakers", name: "Speakers & Sound Systems" },
          { id: "headphones", name: "Professional Headphones" },
          { id: "mixers", name: "Audio Mixers" },
        ],
      },
      {
        id: "computers",
        name: "Computers & Laptops",
        subcategories: [
          { id: "laptops", name: "Laptops" },
          { id: "tablets", name: "Tablets" },
          { id: "monitors", name: "Monitors" },
          { id: "accessories", name: "Computer Accessories" },
        ],
      },
    ],
  },
  {
    id: "tools",
    name: "Tools & Equipment",
    icon: "🔧",
    subcategories: [
      {
        id: "power-tools",
        name: "Power Tools",
        subcategories: [
          { id: "drills", name: "Drills & Drivers" },
          { id: "saws", name: "Saws & Cutting Tools" },
          { id: "sanders", name: "Sanders & Grinders" },
          { id: "nail-guns", name: "Nail Guns & Staplers" },
        ],
      },
      {
        id: "hand-tools",
        name: "Hand Tools",
        subcategories: [
          { id: "wrenches", name: "Wrenches & Spanners" },
          { id: "screwdrivers", name: "Screwdrivers" },
          { id: "hammers", name: "Hammers & Mallets" },
          { id: "measuring", name: "Measuring Tools" },
        ],
      },
      {
        id: "garden-tools",
        name: "Garden & Outdoor Tools",
        subcategories: [
          { id: "lawn-mowers", name: "Lawn Mowers" },
          { id: "trimmers", name: "Hedge Trimmers" },
          { id: "pressure-washers", name: "Pressure Washers" },
          { id: "chainsaws", name: "Chainsaws" },
        ],
      },
    ],
  },
  {
    id: "sports",
    name: "Sports & Outdoor",
    icon: "⚽",
    subcategories: [
      {
        id: "camping",
        name: "Camping & Hiking",
        subcategories: [
          { id: "tents", name: "Tents" },
          { id: "sleeping-bags", name: "Sleeping Bags" },
          { id: "backpacks", name: "Hiking Backpacks" },
          { id: "camping-gear", name: "Camping Equipment" },
        ],
      },
      {
        id: "water-sports",
        name: "Water Sports",
        subcategories: [
          { id: "kayaks", name: "Kayaks & Canoes" },
          { id: "surfboards", name: "Surfboards" },
          { id: "paddleboards", name: "Paddleboards" },
          { id: "snorkeling", name: "Snorkeling Gear" },
        ],
      },
      {
        id: "bikes",
        name: "Bikes & Cycling",
        subcategories: [
          { id: "mountain-bikes", name: "Mountain Bikes" },
          { id: "road-bikes", name: "Road Bikes" },
          { id: "electric-bikes", name: "Electric Bikes" },
          { id: "bike-accessories", name: "Bike Accessories" },
        ],
      },
    ],
  },
  {
    id: "vehicles",
    name: "Vehicles",
    icon: "🚗",
    subcategories: [
      {
        id: "cars",
        name: "Cars",
        subcategories: [
          { id: "economy", name: "Economy Cars" },
          { id: "luxury", name: "Luxury Cars" },
          { id: "suv", name: "SUVs" },
          { id: "electric", name: "Electric Vehicles" },
        ],
      },
      {
        id: "motorcycles",
        name: "Motorcycles & Scooters",
        subcategories: [
          { id: "sport-bikes", name: "Sport Bikes" },
          { id: "cruisers", name: "Cruiser Motorcycles" },
          { id: "scooters", name: "Scooters" },
          { id: "electric-bikes", name: "Electric Motorcycles" },
        ],
      },
    ],
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: "🏠",
    subcategories: [
      {
        id: "appliances",
        name: "Home Appliances",
        subcategories: [
          { id: "kitchen", name: "Kitchen Appliances" },
          { id: "cleaning", name: "Cleaning Equipment" },
          { id: "laundry", name: "Laundry Equipment" },
        ],
      },
      {
        id: "furniture",
        name: "Furniture",
        subcategories: [
          { id: "tables", name: "Tables & Chairs" },
          { id: "storage", name: "Storage Solutions" },
          { id: "outdoor-furniture", name: "Outdoor Furniture" },
        ],
      },
    ],
  },
]

export function CatalogMenu({ onClose, isMobile = false }: CatalogMenuProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 })
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to category page
    console.log(`Navigate to category: ${categoryId}`)
    onClose()
  }

  const handleMouseEnter = (categoryId: string) => {
    setHoveredCategory(categoryId)

    // Calculate submenu position
    const categoryElement = categoryRefs.current[categoryId]
    if (categoryElement) {
      const rect = categoryElement.getBoundingClientRect()
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 8,
      })
    }
  }

  if (isMobile) {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 mb-3">Browse Categories</h3>
        {catalogData.map((category) => (
          <div key={category.id} className="space-y-2">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between w-full text-left py-2 hover:text-purple-600 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expandedCategories.includes(category.id) ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedCategories.includes(category.id) && category.subcategories && (
              <div className="ml-6 space-y-2">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(subcategory.id)}
                      className="flex items-center justify-between w-full text-left py-1 text-sm hover:text-purple-600 transition-colors"
                    >
                      <span>{subcategory.name}</span>
                      {subcategory.subcategories && (
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${
                            expandedCategories.includes(subcategory.id) ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {expandedCategories.includes(subcategory.id) && subcategory.subcategories && (
                      <div className="ml-4 space-y-1">
                        {subcategory.subcategories.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleCategoryClick(subItem.id)}
                            className="block w-full text-left py-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Desktop version with improved submenu positioning
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-64">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Browse Categories</h3>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {catalogData.map((category) => (
              <div
                key={category.id}
                className="relative"
                ref={(el) => (categoryRefs.current[category.id] = el)}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                  {category.subcategories && <ChevronRight className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submenu Portal - Positioned absolutely to viewport */}
      {hoveredCategory && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-xl z-[70] w-72"
          style={{
            top: submenuPosition.top,
            left: submenuPosition.left,
            maxHeight: "60vh",
            overflowY: "auto",
          }}
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className="p-4">
            <div className="space-y-4">
              {catalogData
                .find((cat) => cat.id === hoveredCategory)
                ?.subcategories?.map((subcategory) => (
                  <div key={subcategory.id} className="space-y-2">
                    <button
                      onClick={() => handleCategoryClick(subcategory.id)}
                      className="font-medium text-gray-900 hover:text-purple-600 transition-colors text-sm block w-full text-left"
                    >
                      {subcategory.name}
                    </button>
                    {subcategory.subcategories && (
                      <div className="space-y-1 ml-2">
                        {subcategory.subcategories.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleCategoryClick(subItem.id)}
                            className="text-xs text-gray-600 hover:text-purple-600 transition-colors py-1 block w-full text-left"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
