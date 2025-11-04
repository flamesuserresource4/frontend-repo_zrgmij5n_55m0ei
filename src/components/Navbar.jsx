import React from 'react';
import { Home, Shirt, Sun, ShoppingBag, User } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'wardrobe', label: 'Wardrobe', icon: Shirt },
  { key: 'suggestions', label: 'Suggestions', icon: Sun },
  { key: 'market', label: 'Buy & Sell', icon: ShoppingBag },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function Navbar({ current, onChange }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-200 to-amber-300 border border-black/10" />
          <span className="font-semibold tracking-tight text-neutral-900">VogueAI</span>
        </div>
        <ul className="hidden md:flex items-center gap-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <li key={key}>
              <button
                onClick={() => onChange(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 hover:bg-neutral-900/5 ${
                  current === key ? 'bg-neutral-900 text-white hover:bg-neutral-900' : 'text-neutral-800'
                }`}
                style={current === key ? { boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } : {}}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <select
            value={current}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-black/10 bg-white text-neutral-900"
          >
            {tabs.map(t => (
              <option value={t.key} key={t.key}>{t.label}</option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  );
}
