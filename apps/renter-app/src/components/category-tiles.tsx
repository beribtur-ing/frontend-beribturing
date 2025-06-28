import { useCallback } from 'react';

interface CategoryTile {
  title: string;
  subtitle: string;
  color: string;
}

interface CategoryTilesProps {
  tiles: CategoryTile[];
}

const iconMap: Record<string, string> = {
  'Tools for Everyone': '🔧',
  'Best Price Guarantee': '💰',
  'Weekend Specials': '🎉',
  'Popular Items': '⭐',
};

export function CategoryTiles({ tiles }: CategoryTilesProps) {
  const handleTileClick = useCallback((title: string) => {
    switch (title) {
      case 'Tools for Everyone':
        window.location.href = '/category/tools-equipment';
        break;
      case 'Best Price Guarantee':
        alert("Best Price Guarantee: We'll match any competitor's price!");
        break;
      case 'Weekend Specials':
        alert('Weekend Specials: Check out our special weekend pricing!');
        break;
      case 'Popular Items':
        document.getElementById('popular-items')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  }, []);

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.title}
              className={`${tile.color} rounded-xl p-6 text-center cursor-pointer transition hover:shadow-lg`}
              onClick={() => handleTileClick(tile.title)}
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm md:text-base">{tile.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{tile.subtitle}</p>

              {iconMap[tile.title] && <div className="mt-3 flex justify-center text-2xl">{iconMap[tile.title]}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
