import {useState} from "react"
import {ChevronLeft, ChevronRight} from "lucide-react"
import { PlaceholderImage } from "~/assets"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden">
        <img
          src={images[selectedImage] || PlaceholderImage}
          alt="Product"
          className="w-full h-64 sm:h-80 lg:h-96 object-cover"
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-100" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-100" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative rounded-md sm:rounded-lg overflow-hidden ${
              selectedImage === index ? "ring-2 ring-purple-600 dark:ring-purple-400" : ""
            }`}
          >
            <img
              src={image || PlaceholderImage}
              alt={`Product ${index + 1}`}
              className="w-full h-16 sm:h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
