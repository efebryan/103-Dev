"use client";

import Link from "next/link";
import { useState } from "react";

export default function TopNavBar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-lg border-b border-white/5 shadow-sm h-[72px] transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-8 h-full flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-on-surface tracking-tight hover:text-primary transition-colors">
            103 Dev
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link href="#" className="text-primary border-b-2 border-primary pb-1 hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              Templates
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              Components
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              Documentation
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-64 focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full text-on-surface placeholder:text-on-surface-variant/50"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors">
              Login
            </button>
            <button className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-sm font-semibold hover:scale-95 hover:bg-primary-container/90 transition-all duration-150">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
