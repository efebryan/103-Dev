"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavBar() {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-lg border-b border-white/5 shadow-sm min-h-[72px] transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-8 h-[72px] flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-on-surface tracking-tight hover:text-primary transition-colors">
            103 Dev
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link 
              href="/" 
              className={pathname === "/" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Marketplace
            </Link>
            <Link 
              href="/templates" 
              className={pathname === "/templates" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Templates
            </Link>
            <Link 
              href="/components" 
              className={pathname === "/components" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Components
            </Link>
            <Link 
              href="/docs" 
              className={pathname === "/docs" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Documentation
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Search Bar (hidden on mobile/tablet) */}
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

          {/* Auth buttons (hidden on mobile/tablet) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-sm font-semibold hover:scale-95 hover:bg-primary-container/90 transition-all duration-150">
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger menu toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer flex items-center"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/5 bg-surface/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-8 py-6 space-y-6 flex flex-col">
              {/* Search bar (visible only on mobile screen widths) */}
              <div className="flex md:hidden items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-4 text-sm font-medium">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={pathname === "/" ? "text-primary font-bold pl-2 border-l-2 border-primary" : "text-on-surface-variant hover:text-primary pl-2 transition-colors"}
                >
                  Marketplace
                </Link>
                <Link 
                  href="/templates" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={pathname === "/templates" ? "text-primary font-bold pl-2 border-l-2 border-primary" : "text-on-surface-variant hover:text-primary pl-2 transition-colors"}
                >
                  Templates
                </Link>
                <Link 
                  href="/components" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={pathname === "/components" ? "text-primary font-bold pl-2 border-l-2 border-primary" : "text-on-surface-variant hover:text-primary pl-2 transition-colors"}
                >
                  Components
                </Link>
                <Link 
                  href="/docs" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={pathname === "/docs" ? "text-primary font-bold pl-2 border-l-2 border-primary" : "text-on-surface-variant hover:text-primary pl-2 transition-colors"}
                >
                  Documentation
                </Link>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center text-on-surface-variant text-sm font-medium hover:text-primary py-2.5 transition-colors border border-white/5 rounded-lg bg-surface-container/30"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center bg-primary-container text-on-primary-container py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-container/90 transition-all duration-150"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

