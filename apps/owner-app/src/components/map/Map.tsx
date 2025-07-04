import { useEffect, useRef } from 'react';

interface Props {
  coords: string;
  width?: string;
  height?: string;
  onLocationClick?: (ll: string) => void;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export const Map = ({ coords = '', width = '100%', height = '400', onLocationClick }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const coordsRef = useRef(coords);

  useEffect(() => {
    const [lat, long] = coords.split(',').map(Number);

    const initMap = () => {
      window.ymaps.ready(() => {
        if (!mapInstance.current) {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [lat, long],
            zoom: 17,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
          });

          map.events.add('click', (e: any) => {
            const coords = e.get('coords');
            onLocationClick?.(`${coords[0]},${coords[1]}`);
          });

          mapInstance.current = map;
        }

        updatePlacemark([lat, long]);
      });
    };

    const updatePlacemark = (newCoords: number[]) => {
      const map = mapInstance.current;
      if (map) {
        map.panTo(newCoords, { flying: true, delay: 300 });

        if (placemarkRef.current) {
          map.geoObjects.remove(placemarkRef.current);
        }

        placemarkRef.current = new window.ymaps.Placemark(
          newCoords,
          {},
          { preset: 'islands#redDotIcon' }
        );
        map.geoObjects.add(placemarkRef.current);
      }
    };

    if (!window.ymaps) {
      if (!document.getElementById('yandex-map-script')) {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.com/2.1/?lang=en_US';
        script.type = 'text/javascript';
        script.id = 'yandex-map-script';
        script.onload = initMap;
        document.head.appendChild(script);
      }
    } else {
      initMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
      placemarkRef.current = null;
    };
  }, []);

  useEffect(() => {
    const [lat, long] = coords.split(',').map(Number);
    const map = mapInstance.current;

    if (map && coords !== coordsRef.current) {
      coordsRef.current = coords;

      map.panTo([lat, long], { flying: true, delay: 300 });

      if (placemarkRef.current) {
        map.geoObjects.remove(placemarkRef.current);
      }

      placemarkRef.current = new window.ymaps.Placemark(
        [lat, long],
        {},
        { preset: 'islands#redDotIcon' }
      );
      map.geoObjects.add(placemarkRef.current);
    }
  }, [coords]);

  return <div ref={mapRef} style={{ width, height: `${height}px` }} />;
};