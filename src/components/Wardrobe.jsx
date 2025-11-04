import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Filter, Edit2, Trash2, Eye } from 'lucide-react';

const initialItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=800&auto=format&fit=crop',
    type: 'Kurta',
    color: 'Cream',
    occasion: 'Festive',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1695740633675-d060b607f5c4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjIxNzI2NDR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    type: 'Jeans',
    color: 'Blue',
    occasion: 'Casual',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    type: 'Saree',
    color: 'Black',
    occasion: 'Wedding',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    type: 'Shirt',
    color: 'Beige',
    occasion: 'Office',
  },
];

export default function Wardrobe() {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [color, setColor] = useState('All');
  const [occasion, setOccasion] = useState('All');
  const fileRef = useRef(null);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchesQuery = query ? it.type.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = category === 'All' || it.type === category;
      const matchesColor = color === 'All' || it.color === color;
      const matchesOcc = occasion === 'All' || it.occasion === occasion;
      return matchesQuery && matchesCategory && matchesColor && matchesOcc;
    });
  }, [items, query, category, color, occasion]);

  const addFromFiles = (files) => {
    const newOnes = Array.from(files).map((file, idx) => ({
      id: `${Date.now()}_${idx}`,
      image: URL.createObjectURL(file),
      type: 'Detected Type',
      color: 'Unknown',
      occasion: 'Casual',
    }));
    setItems((prev) => [...newOnes, ...prev]);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const shuffleOutfits = () => {
    const ethnic = items.filter((i) => ['Saree', 'Kurta', 'Lehenga', 'Sherwani'].includes(i.type));
    const westernTop = items.filter((i) => ['T-Shirt', 'Shirt', 'Dress', 'Blouse'].includes(i.type));
    const bottoms = items.filter((i) => ['Jeans', 'Pants', 'Skirt', 'Palazzo'].includes(i.type));
    const pick = (arr) => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null);
    const combo = [pick(ethnic) || pick(westernTop), pick(bottoms)];
    return combo.filter(Boolean);
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      addFromFiles(e.dataTransfer.files);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-2xl font-semibold text-neutral-900">Virtual Wardrobe</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-amber-900/10 shadow-sm hover:shadow transition"
          >
            <Upload className="w-4 h-4 text-amber-700" /> <span className="text-neutral-900">Upload</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && addFromFiles(e.target.files)}
            className="hidden"
          />
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-black/10 text-sm text-neutral-700">
            <Filter className="w-4 h-4 text-amber-700" /> Refine
          </div>
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="mt-6 rounded-2xl border border-dashed border-amber-900/20 bg-white/70 p-6 text-center"
      >
        <p className="text-neutral-700">Drag & drop images here, or click Upload.</p>
        <p className="text-xs text-amber-800/80 mt-1">Supports Saree, Kurta, Lehenga, Western wear and more.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by type..."
          className="col-span-2 md:col-span-2 px-3 py-2 rounded-xl border border-black/10 bg-white"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-xl border border-black/10 bg-white">
          {['All', 'T-Shirt', 'Shirt', 'Dress', 'Jeans', 'Pants', 'Skirt', 'Blouse', 'Saree', 'Kurta', 'Lehenga', 'Sherwani', 'Palazzo'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={color} onChange={(e) => setColor(e.target.value)} className="px-3 py-2 rounded-xl border border-black/10 bg-white">
          {['All', 'White', 'Black', 'Blue', 'Beige', 'Red', 'Green', 'Cream', 'Gold'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="px-3 py-2 rounded-xl border border-black/10 bg-white">
          {['All', 'Casual', 'Office', 'Party', 'Wedding', 'Date', 'Festive'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((it) => (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden bg-white border border-amber-900/10 shadow-sm"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={it.image} alt={it.type} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide text-amber-800/80">{it.occasion}</div>
                  <div className="font-semibold text-neutral-900">{it.type} <span className="text-neutral-500">· {it.color}</span></div>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <button className="p-2 rounded-lg hover:bg-amber-50"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-amber-50"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => removeItem(it.id)} className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10">
        <button
          onClick={() => {
            const picks = shuffleOutfits();
            if (!picks.length) return;
            const names = picks.map((p) => p.type).join(' + ');
            alert(`Shuffled Outfit: ${names}`);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white shadow-lg hover:shadow-xl transition"
          style={{ backgroundImage: 'linear-gradient(135deg,#e76f00,#f2b880)' }}
        >
          Shuffle Outfit
        </button>
      </div>
    </section>
  );
}
