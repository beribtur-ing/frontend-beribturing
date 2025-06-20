import {HeroBanner} from "../components/hero-banner"
import {CategoryTiles} from "../components/category-tiles"
import {PopularItems} from "../components/popular-items"
import {TrustSection} from "../components/trust-section"
import {mockProductVariants} from "../data/mock-data"

const categoryTiles = [
  {
    title: "Tools for Everyone",
    subtitle: "Professional grade equipment",
    color: "bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800",
  },
  {
    title: "Best Price Guarantee",
    subtitle: "Competitive rental rates",
    color: "bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800",
  },
  {
    title: "Weekend Specials",
    subtitle: "Special weekend pricing",
    color: "bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800",
  },
  {
    title: "Popular Items",
    subtitle: "Most rented this week",
    color: "bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroBanner />
      <CategoryTiles tiles={categoryTiles} />
      <PopularItems variants={mockProductVariants} />
      <TrustSection />
    </div>
  )
}