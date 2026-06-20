"use client";

import React, { useState, useMemo } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface UIComponentItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  code: string;
  preview: React.ReactNode;
}

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<{ [key: string]: "preview" | "code" }>({});

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const COMPONENTS_DATA: UIComponentItem[] = [
    {
      id: "glass-card",
      title: "Glassmorphic Premium Card",
      category: "Cards",
      tags: ["Tailwind", "CSS v4", "Glassmorphism"],
      code: `<div className="relative overflow-hidden bg-[#111827]/60 backdrop-blur-xl border border-white/8 p-8 rounded-3xl transition-all duration-300 hover:border-[#42e5b0]/30 hover:shadow-[0_0_30px_rgba(0,200,150,0.15)] hover:-translate-y-1">
  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#42e5b0]/20 to-transparent" />
  <h3 className="text-lg font-bold text-[#dde2f8] mb-2">Glassmorphic Title</h3>
  <p className="text-sm text-[#bbcac1] leading-relaxed">
    Copy-paste this premium glass effect card into your project. Features border glows and smooth vertical translations.
  </p>
</div>`,
      preview: (
        <div className="relative overflow-hidden bg-surface-container/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,200,150,0.15)] hover:-translate-y-1 w-full max-w-sm mx-auto text-left">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <h3 className="text-lg font-bold text-on-surface mb-2">Glassmorphic Title</h3>
          <p className="text-sm text-on-surface-variant/80 leading-relaxed">
            Copy-paste this premium glass effect card into your project. Features border glows and smooth vertical translations.
          </p>
        </div>
      ),
    },
    {
      id: "neon-btn",
      title: "Neon Gradient Glow Button",
      category: "Buttons",
      tags: ["Tailwind", "Hover Animation", "Button"],
      code: `<button className="relative bg-[#42e5b0] text-[#003828] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(66,229,176,0.55)] active:scale-95 cursor-pointer">
  Explore Marketplace
</button>`,
      preview: (
        <div className="flex items-center justify-center py-6">
          <button className="bg-primary text-on-primary font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(66,229,176,0.55)] active:scale-95 cursor-pointer text-sm">
            Explore Marketplace
          </button>
        </div>
      ),
    },
    {
      id: "cyber-input",
      title: "Cyberpunk Floating Label Input",
      category: "Inputs",
      tags: ["React", "Floating Label", "Form"],
      code: `<div className="relative w-full">
  <input
    type="text"
    placeholder=" "
    className="peer w-full bg-[#080e1d]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dde2f8] placeholder-transparent focus:border-[#42e5b0] focus:ring-2 focus:ring-[#42e5b0]/20 focus:outline-none transition-all"
  />
  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#bbcac1]/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#42e5b0] bg-[#0d1322] px-1 pointer-events-none">
    Developer API Key
  </label>
</div>`,
      preview: (
        <div className="w-full max-w-sm mx-auto py-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder=" "
              className="peer w-full bg-surface-container-lowest/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-on-surface placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary bg-background px-1.5 pointer-events-none">
              Developer API Key
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "navbar",
      title: "Glassmorphic Minimal Navigation",
      category: "Navbars",
      tags: ["Tailwind", "Responsive", "Navbar"],
      code: `<nav className="w-full bg-[#0d1322]/60 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-between items-center rounded-xl">
  <span className="font-extrabold text-sm text-[#dde2f8] tracking-tight">103<span className="text-[#42e5b0]">.Dev</span></span>
  <div className="flex gap-4 text-xs font-semibold text-[#bbcac1]">
    <a href="#" className="text-[#42e5b0]">Home</a>
    <a href="#" className="hover:text-[#42e5b0] transition-colors">Pricing</a>
    <a href="#" className="hover:text-[#42e5b0] transition-colors">Docs</a>
  </div>
</nav>`,
      preview: (
        <div className="py-2 w-full max-w-md mx-auto">
          <nav className="w-full bg-surface-container/60 backdrop-blur-md border border-white/5 py-3.5 px-6 flex justify-between items-center rounded-2xl">
            <span className="font-extrabold text-sm text-on-surface tracking-tight">103<span className="text-primary">.Dev</span></span>
            <div className="flex gap-4 text-xs font-semibold text-on-surface-variant/80">
              <span className="text-primary">Home</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Pricing</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Docs</span>
            </div>
          </nav>
        </div>
      ),
    },
    {
      id: "stat-card",
      title: "Analytical Stat Card",
      category: "Cards",
      tags: ["Charts", "Widget", "Tailwind"],
      code: `<div className="bg-[#191f2f] border border-white/5 rounded-2xl p-6 flex items-center justify-between shadow-md">
  <div>
    <p className="text-xs font-semibold text-[#bbcac1] uppercase tracking-wider">Weekly Downloads</p>
    <h3 className="text-2xl font-black text-[#dde2f8] mt-1">14,286</h3>
  </div>
  <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
    <span className="material-symbols-outlined text-xs font-bold">trending_up</span>
    +12.4%
  </div>
</div>`,
      preview: (
        <div className="bg-surface-container border border-white/5 rounded-2xl p-6 flex items-center justify-between shadow-md w-full max-w-sm mx-auto text-left">
          <div>
            <p className="text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider">Weekly Downloads</p>
            <h3 className="text-2xl font-black text-on-surface mt-1">14,286</h3>
          </div>
          <div className="bg-emerald-500/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] font-bold">trending_up</span>
            +12.4%
          </div>
        </div>
      ),
    },
  ];

  const CATEGORIES = ["All", "Buttons", "Cards", "Inputs", "Navbars"];

  // Filtering Logic
  const filteredComponents = useMemo(() => {
    let result = [...COMPONENTS_DATA];

    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <TopNavBar />

      <main className="pt-[72px] flex-1 flex flex-col bg-background relative overflow-hidden selection:bg-primary/30 selection:text-primary">
        {/* Glowing gradients */}
        <div className="absolute top-[-10%] right-[-15%] w-[600px] h-[600px] bg-primary/5 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Section Header */}
        <section className="relative z-10 py-16 px-8 max-w-[1280px] mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              Reusable Code Modules & Widgets
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight"
            >
              Premium Copy-Paste <span className="text-primary">Components</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Accelerate your workflow with responsive UI elements built with modern CSS and Tailwind. Hover, copy the code, and drop it straight in.
            </motion.p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="relative z-10 px-8 max-w-[1280px] mx-auto w-full mb-12">
          <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-center border border-white/5 shadow-lg">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search components (e.g. glassmorphism, input)..."
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
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
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
          </div>
        </section>

        {/* Display Grid */}
        <section className="relative z-10 px-8 max-w-[1280px] mx-auto w-full pb-24 flex-1">
          {filteredComponents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass-card rounded-3xl border border-white/5"
            >
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40 mb-4">
                search_off
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">No components found</h3>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                We couldn't find any components matching "{searchQuery}" under category "{selectedCategory}".
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredComponents.map((component, idx) => {
                  const currentTab = activeTab[component.id] || "preview";
                  return (
                    <motion.div
                      key={component.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="glass-card rounded-3xl overflow-hidden border border-white/5 flex flex-col hover:border-primary/20 relative"
                    >
                      {/* Card Header & Controls */}
                      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-surface-container/40">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-on-surface">
                            {component.title}
                          </h3>
                          <div className="flex gap-2">
                            {component.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[9px] font-mono text-on-surface-variant/70">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tabs Selector & Copy Action */}
                        <div className="flex items-center gap-3">
                          <div className="flex bg-surface-container-high rounded-lg p-1 border border-white/5">
                            <button
                              onClick={() => setActiveTab({ ...activeTab, [component.id]: "preview" })}
                              className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                                currentTab === "preview"
                                  ? "bg-surface-bright text-on-surface"
                                  : "text-on-surface-variant/70 hover:text-on-surface"
                              }`}
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => setActiveTab({ ...activeTab, [component.id]: "code" })}
                              className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                                currentTab === "code"
                                  ? "bg-surface-bright text-on-surface"
                                  : "text-on-surface-variant/70 hover:text-on-surface"
                              }`}
                            >
                              Code
                            </button>
                          </div>

                          <button
                            onClick={() => handleCopy(component.id, component.code)}
                            className={`p-2.5 rounded-lg border border-white/5 hover:border-primary/20 transition-all flex items-center justify-center relative group cursor-pointer ${
                              copiedId === component.id
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface"
                            }`}
                            title="Copy code"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {copiedId === component.id ? "done" : "content_copy"}
                            </span>
                            {copiedId === component.id && (
                              <span className="absolute -top-8 bg-primary text-on-primary text-[9px] font-bold px-2 py-1 rounded shadow-md pointer-events-none select-none">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Display Area (Preview or Code) */}
                      <div className="p-8 flex-1 flex items-center justify-center min-h-64 relative bg-surface-container-lowest/30">
                        {currentTab === "preview" ? (
                          <div className="w-full flex justify-center items-center">
                            {component.preview}
                          </div>
                        ) : (
                          <pre className="w-full h-full max-h-72 overflow-y-auto text-left font-mono text-[11px] leading-relaxed text-on-surface-variant/90 p-5 rounded-2xl bg-surface-container-lowest/80 border border-white/5 shadow-inner">
                            <code>{component.code}</code>
                          </pre>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
