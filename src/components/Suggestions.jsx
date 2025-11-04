import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, CloudRain, Heart, Search } from 'lucide-react';

const sampleOutfits = [
  {
    id: 'o1',
    title: 'Crisp Casual',
    tempRange: [18, 30],
    occasion: 'Casual',
    items: ['White Tee', 'Blue Jeans', 'White Sneakers'],
    image: 'https://images.unsplash.com/photo-1748765968997-ba9bae9cfd7b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDcmlzcCUyMENhc3VhbHxlbnwwfDB8fHwxNzYyMjU3Nzc1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'o2',
    title: 'Office Sharp',
    tempRange: [10, 25],
    occasion: 'Office',
    items: ['Beige Shirt', 'Navy Trousers', 'Loafers'],
    image: 'https://images.unsplash.com/photo-1627050535736-e68172f62a27?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPZmZpY2UlMjBTaGFycHxlbnwwfDB8fHwxNzYyMjU3Nzc1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'o3',
    title: 'Evening Glam',
    tempRange: [15, 35],
    occasion: 'Party',
    items: ['Black Dress', 'Heels', 'Clutch'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  },
];

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case 'Rain':
      return <CloudRain className="w-4 h-4" />;
    case 'Clouds':
      return <Cloud className="w-4 h-4" />;
    default:
      return <Sun className="w-4 h-4" />;
  }
};

export default function Suggestions() {
  const [city, setCity] = useState('New York');
  const [occasion, setOccasion] = useState('Casual');
  const [weather, setWeather] = useState({ condition: 'Sunny', temp: 24, humidity: 60 });
  const [favs, setFavs] = useState({});

  const filtered = useMemo(() => {
    return sampleOutfits.filter((o) => {
      const okOcc = occasion ? o.occasion === occasion : true;
      const okTemp = weather?.temp >= o.tempRange[0] && weather?.temp <= o.tempRange[1];
      return okOcc && okTemp;
    });
  }, [occasion, weather]);

  return (
    <section className="bg-white/60 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-neutral-900">Suggestions</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-black/10">
              <Search className="w-4 h-4 text-neutral-500" />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none bg-transparent text-sm"
                placeholder="Your city"
              />
            </div>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="px-3 py-2 rounded-xl border border-black/10 bg-white"
            >
              {['Casual', 'Office', 'Party', 'Wedding', 'Date'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="px-3 py-2 rounded-xl bg-white border border-black/10 text-sm flex items-center gap-2 text-neutral-700">
              <WeatherIcon condition={weather.condition} />
              <span>{weather.temp}°C</span>
              <span className="text-neutral-400">/ {weather.humidity}%</span>
            </div>
            <button
              onClick={() => {
                // Simulate weather refresh
                const temps = [16, 20, 24, 28, 32];
                const conds = ['Sunny', 'Clouds', 'Rain'];
                setWeather({ temp: temps[Math.floor(Math.random() * temps.length)], humidity: 50 + Math.floor(Math.random() * 50), condition: conds[Math.floor(Math.random() * conds.length)] });
              }}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white"
            >
              Refresh
            </button>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((o, idx) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={o.image} alt={o.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{o.title}</h3>
                      <p className="text-sm text-neutral-500">{o.items.join(' · ')}</p>
                    </div>
                    <button
                      onClick={() => setFavs((f) => ({ ...f, [o.id]: !f[o.id] }))}
                      className={`p-2 rounded-xl border ${favs[o.id] ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-neutral-700 border-black/10'}`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
