import {Shield, ShoppingCart, Star} from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Users",
    description: "All users verified for your safety",
    color: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "High-quality items from trusted lenders",
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: ShoppingCart,
    title: "Easy Booking",
    description: "Simple and secure rental process",
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
]

export function TrustSection() {
  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
