"use client";

import React, { useState, useMemo } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface TemplateItem {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  downloads: number;
  category: string;
  tags: string[];
  image: string;
  isNew: boolean;
  isPopular: boolean;
}

const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: "horizon-ai",
    title: "Horizon AI SaaS Boilerplate",
    description: "Next.js 15, React 19, OpenAI SDK, Stripe billing, Tailwind v4, Supabase auth.",
    price: 79,
    rating: 4.9,
    reviews: 142,
    downloads: 1200,
    category: "SaaS",
    tags: ["Next.js", "OpenAI", "Stripe", "Supabase"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP92Qw4RDwmhRP0GKVZyDFIf1KicpwECV8URf12FWqze4eyOBDi11ZshC67Umjn1OgRuZFRtn42QiG13zquSvqiTLRzYLbskPLWVIXKLf-LrOGJBiu7OpwLUEviKD0chhCmbs5EVrsWXA2ahkHtvR42SShin-FHpeLYU7UpGgcFYX0WT3kIGpdtXVT-neTXQOXUkYaYhnaOQVToOXcMhjJVBPEqobzFSmZfWgAQkh7Fm43tu7wfaScQ1N3NiJ-WrhmzQy95sFSb5XF",
    isNew: true,
    isPopular: true,
  },
  {
    id: "nexus-admin",
    title: "Nexus Admin Dashboard Template",
    description: "Tailwind CSS v4, React 19, Recharts dashboard, dark mode optimization, user access management.",
    price: 49,
    rating: 4.8,
    reviews: 86,
    downloads: 850,
    category: "Admin",
    tags: ["React", "Tailwind", "Recharts"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuKeG_Tq6ChLi8_5fEgm-w4DZJdvRT-YohV8UgvOpS4pRhfheDOv7vXAqOGHrODDZGY8fxcy8RLh6Rx9g6-hT9qmkYlomEaTr5ub4N5cekib5sXpXa8jeTajGcMY7pytI5UuxrTP4NeV1i-USt52_mrZOtnegxKRi0Zk45x9LaGcVuI3wyZkvKTrKZ1dzhQ0Pa4RlQkpnfK4FrwgednDasXDaVWTqoBUKLXiYiF43Kss7_yS0CikOYbTmCPZGAuMb-HelMjpeBh36Ym",
    isNew: false,
    isPopular: true,
  },
  {
    id: "quantum-api",
    title: "Quantum PHP API Boilerplate",
    description: "Laravel 11, Redis cache, rate limiting, OAuth 2.0 integration, Swagger auto-documentation.",
    price: 39,
    rating: 4.7,
    reviews: 34,
    downloads: 410,
    category: "API",
    tags: ["Laravel", "PHP 8.2", "Redis"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPqKhLs7t6D0yLmXLC5Q9oBbMCRVcN4dOQVz6JLKCDidJLxqlH1ojzNCkf7FylgX8lCFPU5GgZdmw4VbVJnfbYQjXk5GH3JuV0LMZApLFAYNC4a0CFrYELb9oXVCjaD1sE9AeBxgGwl9lPwnvgNHVq36tW_suUugEOqUolreFRYaGo328npizgkhJYkCieCfZEjmefwEo50SvUnZIE5KAcK9dwBbL298Ymbt5hmkzCD62bwPvUhi07Pm9UceP6nh1Z8xYv1w8ZoLOd",
    isNew: false,
    isPopular: false,
  },
  {
    id: "apex-landing",
    title: "Apex Landing Page Kit",
    description: "Framer Motion animations, 12 sections, newsletter form, pricing tables, light/dark modes.",
    price: 29,
    rating: 4.9,
    reviews: 58,
    downloads: 980,
    category: "Landing",
    tags: ["HTML", "Tailwind", "Framer Motion"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb8751M7Je9GuK00dv3abmE33PICtxzphg15jR2qJqdFrp0osb6_V9qVuOd_j59NtiD0wNTApv2OXhPfjG_xnz7fTAEUeVTpaJe_pOXXvFSsOluMJ1JotRgzajiud4wrm9idXGaw8hBxgUAKLTP_H88WpNljKccUgy-shcdNvaJlRLmeHA06PXOp4pr5H55meYXYdiZibSnXUnumMS3mvZrHuOFYsiTz09VZ5PicNiCxH9dbvdN7xEUs5fgGWjevTPljaBqaJW44tG",
    isNew: true,
    isPopular: false,
  },
  {
    id: "stellar-ecom",
    title: "Stellar E-commerce Template",
    description: "Next.js app, Stripe checkout, CMS-backed product management, fully customizable theme.",
    price: 69,
    rating: 4.6,
    reviews: 29,
    downloads: 240,
    category: "SaaS",
    tags: ["Next.js", "Stripe", "Tailwind"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP92Qw4RDwmhRP0GKVZyDFIf1KicpwECV8URf12FWqze4eyOBDi11ZshC67Umjn1OgRuZFRtn42QiG13zquSvqiTLRzYLbskPLWVIXKLf-LrOGJBiu7OpwLUEviKD0chhCmbs5EVrsWXA2ahkHtvR42SShin-FHpeLYU7UpGgcFYX0WT3kIGpdtXVT-neTXQOXUkYaYhnaOQVToOXcMhjJVBPEqobzFSmZfWgAQkh7Fm43tu7wfaScQ1N3NiJ-WrhmzQy95sFSb5XF",
    isNew: false,
    isPopular: false,
  },
  {
    id: "orbit-mobile",
    title: "Orbit Mobile App Boilerplate",
    description: "React Native, Expo, Tailwind CSS (NativeWind), push notifications, state manager setup.",
    price: 89,
    rating: 4.8,
    reviews: 67,
    downloads: 520,
    category: "Mobile",
    tags: ["React Native", "Expo", "Tailwind"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuKeG_Tq6ChLi8_5fEgm-w4DZJdvRT-YohV8UgvOpS4pRhfheDOv7vXAqOGHrODDZGY8fxcy8RLh6Rx9g6-hT9qmkYlomEaTr5ub4N5cekib5sXpXa8jeTajGcMY7pytI5UuxrTP4NeV1i-USt52_mrZOtnegxKRi0Zk45x9LaGcVuI3wyZkvKTrKZ1dzhQ0Pa4RlQkpnfK4FrwgednDasXDaVWTqoBUKLXiYiF43Kss7_yS0CikOYbTmCPZGAuMb-HelMjpeBh36Ym",
    isNew: true,
    isPopular: true,
  }
];

const CATEGORIES = ["All", "SaaS", "Admin", "Landing", "Mobile", "API"];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Filtering & Sorting Logic
  const filteredTemplates = useMemo(() => {
    let result = [...TEMPLATES_DATA];

    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (sortBy === "popular") {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <TopNavBar />
      
      <main className="pt-[72px] flex-1 flex flex-col bg-background relative overflow-hidden selection:bg-primary/30 selection:text-primary">
        {/* Background glow meshes */}
        <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-primary/5 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Section Header */}
        <section className="relative z-10 py-16 px-8 max-w-[1280px] mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              Developer Boilerplates & Layouts
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight"
            >
              Premium Website <span className="text-primary">Templates</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Kickstart your projects with production-grade templates. Save weeks of setup on databases, styling, auth, and payment infrastructure.
            </motion.p>
          </div>
        </section>

        {/* Search, Filter, Sort Controls */}
        <section className="relative z-10 px-8 max-w-[1280px] mx-auto w-full mb-12">
          <div className="glass-card rounded-2xl p-6 flex flex-col lg:flex-row gap-6 justify-between items-center border border-white/5 shadow-lg">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search templates (e.g., Next.js, Stripe)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest/60 border border-white/10 focus:border-primary focus:ring-primary/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface text-[18px] focus:outline-none"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 w-full lg:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(66,229,176,0.3)]"
                      : "bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block shrink-0">
                Sort By
              </span>
              <div className="relative w-44">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-surface-container-lowest/60 border border-white/10 focus:border-primary focus:ring-primary/20 rounded-xl px-4 py-2 text-xs text-on-surface font-semibold focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                  keyboard_arrow_down
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Display Grid */}
        <section className="relative z-10 px-8 max-w-[1280px] mx-auto w-full pb-24 flex-1">
          {filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass-card rounded-3xl border border-white/5"
            >
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40 mb-4">
                search_off
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">No templates found</h3>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                We couldn't find any templates matching "{searchQuery}" in category "{selectedCategory}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 px-6 py-2.5 bg-primary text-on-primary text-xs font-bold rounded-xl hover:scale-95 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((template, idx) => (
                  <motion.div
                    key={template.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full border border-white/5 hover:border-primary/30 relative"
                  >
                    {/* Image Preview */}
                    <div className="h-48 overflow-hidden relative bg-surface-container-low/50">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={template.image}
                        alt={template.title}
                      />
                      {template.isNew && (
                        <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider neon-glow-emerald">
                          NEW
                        </div>
                      )}
                      {!template.isNew && template.isPopular && (
                        <div className="absolute top-4 right-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider">
                          POPULAR
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-[11px] font-bold text-on-surface/90 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-amber-400 fill-current">star</span>
                        {template.rating} <span className="text-on-surface-variant/70">({template.reviews})</span>
                      </div>
                    </div>

                    {/* Template Details */}
                    <div className="p-6 flex flex-col flex-1 justify-between bg-surface-container/20">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                            {template.title}
                          </h3>
                          <span className="text-primary font-bold text-lg shrink-0">${template.price}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant/80 line-clamp-2 leading-relaxed">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {template.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] text-on-surface-variant border border-outline-variant font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats & Actions */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-4">
                        <div className="flex justify-between items-center text-[11px] text-on-surface-variant/60">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">download</span>
                            {template.downloads} downloads
                          </span>
                          <span className="capitalize px-2 py-0.5 bg-white/5 rounded-md font-semibold text-[10px]">
                            {template.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <Link
                            href="/signup"
                            className="py-2.5 bg-surface-bright/50 hover:bg-surface-bright text-on-surface rounded-xl text-xs font-bold border border-white/5 hover:border-white/10 transition-all text-center flex justify-center items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Live Demo
                          </Link>
                          <Link
                            href="/signup"
                            className="py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:shadow-[0_0_15px_rgba(66,229,176,0.3)] hover:bg-primary/95 active:scale-95 transition-all text-center flex justify-center items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
