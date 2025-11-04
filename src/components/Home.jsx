import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const floatVariant = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function Home({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      {/* Festive motif background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 -right-10 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-orange-100 via-amber-100 to-rose-100 blur-3xl opacity-80" />
        <div className="absolute -bottom-24 -left-10 w-[26rem] h-[26rem] rounded-full bg-gradient-to-tr from-rose-100 via-amber-100 to-yellow-100 blur-3xl opacity-80" />
        {/* Subtle paisley/mandala grid */}
        <svg className="absolute inset-0 opacity-[0.08]" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="paisley" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#1a1a1a" strokeWidth="0.6">
                <path d="M20 40c8-12 24-12 32 0s8 28-8 36-36-12-24-28z" />
                <circle cx="72" cy="60" r="16" />
                <path d="M90 12l8 8-8 8-8-8z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paisley)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/10 text-xs text-neutral-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> AI-Powered Fashion Stylist
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">
            Your AI-Powered Fashion Stylist
          </h1>
          <p className="mt-3 text-lg text-amber-800/90 font-medium">आपकी स्टाइल, आपका अंदाज़ — अब और भी स्मार्ट</p>
          <p className="mt-3 max-w-2xl mx-auto text-neutral-700">
            Smart outfit suggestions from your wardrobe, tailored to weather and occasions. Organize, discover, and elevate your style.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ backgroundImage: 'linear-gradient(135deg,#ff8a00,#e1b382)' }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Floating visuals inspired by Indian palettes */}
        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Virtual Wardrobe',
              desc: 'Upload, organize, and filter your outfits including Saree, Kurta, Denim and more.',
              color: 'from-amber-50 to-orange-50',
            },
            {
              title: 'Weather & Occasion',
              desc: 'From monsoon drizzles to festive nights — get context-aware looks.',
              color: 'from-rose-50 to-amber-50',
            },
            {
              title: 'Buy & Sell',
              desc: 'List preloved pieces or discover boutique-style finds from the community.',
              color: 'from-yellow-50 to-rose-50',
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              variants={floatVariant}
              initial="initial"
              animate="animate"
              className={`rounded-2xl bg-gradient-to-br ${card.color} border border-amber-900/10 p-6 shadow-sm relative overflow-hidden`}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-orange-200/50 to-amber-200/30" />
              <div className="text-sm text-amber-800/90 font-medium">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">{card.title}</h3>
              <p className="mt-2 text-neutral-700 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
