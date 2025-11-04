import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home({ onGetStarted }) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/60 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/10 text-xs text-neutral-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI-Powered Fashion Stylist
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">
            Your AI-Powered Fashion Stylist
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-700">
            Smart outfit suggestions from your wardrobe, tailored to weather and occasions. Organize, discover, and elevate your style.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ backgroundImage: 'linear-gradient(135deg,#1a1a1a,#2a2a2a)' }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Virtual Wardrobe',
              desc: 'Upload, organize, and filter your clothes in one elegant dashboard.',
            },
            {
              title: 'Weather & Occasion',
              desc: 'Get context-aware outfit suggestions powered by AI.',
            },
            {
              title: 'Buy & Sell',
              desc: 'List your pieces or discover pre-loved gems from the community.',
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm"
            >
              <div className="text-sm text-amber-700/90 font-medium">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">{card.title}</h3>
              <p className="mt-2 text-neutral-600 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
