import { useTranslation } from 'react-i18next';

export function HeroBanner() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 mt-2">
      <div className="relative overflow-hidden rounded-2xl">
        <section
          className="relative flex items-center justify-center py-24 md:py-48 bg-[center_-90px] bg-cover"
          style={{
            backgroundImage: `url('/src/assets/stock-photo.jpg')`,
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>

          {/* Animated blobs */}
          <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-500 rounded-full opacity-20 mix-blend-multiply blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-500 rounded-full opacity-20 mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-xl">
              {t('Rent Everything You Need')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              {t('From tools to electronics, find everything you need for your projects')}
            </p>
            <a
              href="/catalog"
              className="inline-block px-8 py-3 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-100 transition duration-300 shadow-lg hover:shadow-2xl"
            >
              {t('Explore')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
