import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Wardrobe from './components/Wardrobe';
import Suggestions from './components/Suggestions';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div style={{ backgroundColor: '#faf7f2' }} className="min-h-screen text-neutral-900">
      <Navbar current={page} onChange={setPage} />
      {page === 'home' && <Home onGetStarted={() => setPage('wardrobe')} />}
      {page === 'wardrobe' && <Wardrobe />}
      {page === 'suggestions' && <Suggestions />}
      {page === 'market' && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-2xl font-semibold">Buy & Sell</h2>
          <p className="mt-2 text-neutral-600">Marketplace UI will appear here. Add listings, filter by price and category, and contact sellers.</p>
        </div>
      )}
      {page === 'profile' && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="rounded-2xl bg-white border border-black/10 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400&auto=format&fit=crop" alt="avatar" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold">Alex Morgan</h3>
                <p className="text-sm text-neutral-600">Total items: 24 · Favorites: 6</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-black/10">
                <div className="text-sm text-neutral-500">Preferred Style</div>
                <div className="font-medium">Trendy, Casual</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-black/10">
                <div className="text-sm text-neutral-500">Favorite Colors</div>
                <div className="font-medium">Beige, White, Black</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-black/10">
                <div className="text-sm text-neutral-500">Sizes</div>
                <div className="font-medium">M · 32W</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Logout</button>
            </div>
          </div>
        </div>
      )}
      <footer className="mt-16 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} VogueAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
