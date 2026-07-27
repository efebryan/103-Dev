"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LibraryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      // Library = all templates the user has downloaded/purchased
      supabase
        .from("downloads")
        .select(`purchased_at, templates(id, title, description, category, version, thumbnail_url, file_url)`)
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false })
        .then(({ data }) => {
          setAssets((data ?? []).map(d => d.templates).filter(Boolean));
          setLoading(false);
        });
    });
  }, []);

  const categories = ["all", ...Array.from(new Set(assets.map(a => (a.category ?? "").toLowerCase()))).filter(Boolean)];
  const filteredAssets = filter === "all" ? assets : assets.filter(a => (a.category ?? "").toLowerCase() === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Engineering Library</h1>
          <p className="text-on-surface-variant text-sm mt-1">Access, update, and manage your purchased codebases and developer assets.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-white/10 gap-6">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-3 text-sm font-semibold capitalize relative cursor-pointer ${filter === tab ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
          >
            {tab}
            {filter === tab && (
              <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="glass-card rounded-2xl border border-white/5 p-16 text-center text-on-surface-variant text-xs">Loading library…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-44 relative overflow-hidden shrink-0 bg-surface-container-high">
                {product.thumbnail_url ? (
                  <img className="w-full h-full object-cover" alt={product.title} src={product.thumbnail_url} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline text-xs">No Preview</div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.category ?? "—"}</span>
                  <h3
                    onClick={() => setSelectedProject(product)}
                    className="text-base font-bold text-on-surface mt-1 hover:text-primary cursor-pointer transition-colors"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">{product.description}</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4 py-2 border-t border-b border-white/5">
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] uppercase text-outline font-bold">Version</span>
                      <span className="text-xs font-mono text-on-surface mt-0.5">{product.version ?? "—"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={product.file_url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex-1 py-2 text-center bg-primary text-on-primary rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all ${!product.file_url ? "opacity-40 pointer-events-none" : "cursor-pointer"}`}
                    >
                      Download
                    </a>
                    <button
                      onClick={() => setSelectedProject(product)}
                      className="py-2 px-3 bg-surface-container-high text-on-surface rounded-lg border border-white/10 font-bold text-xs hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredAssets.length === 0 && (
            <div className="col-span-full py-16 text-center text-on-surface-variant text-xs">
              No assets in this category yet.
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-[#010f1f]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-xl rounded-3xl p-6 md:p-8 border border-white/10 relative z-10 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{selectedProject.category}</span>
                  <h2 className="text-xl font-bold tracking-tight text-on-surface mt-1">{selectedProject.title}</h2>
                  <p className="text-xs text-on-surface-variant mt-1">{selectedProject.description}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-1 rounded-lg text-on-surface-variant hover:bg-white/5 cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              {selectedProject.thumbnail_url && (
                <div className="h-40 rounded-xl overflow-hidden border border-white/5">
                  <img className="w-full h-full object-cover" alt="Preview" src={selectedProject.thumbnail_url} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-outline">Category</p>
                  <p className="font-semibold text-on-surface mt-0.5">{selectedProject.category ?? "—"}</p>
                </div>
                <div>
                  <p className="text-outline">Version</p>
                  <p className="font-mono text-primary font-semibold mt-0.5">{selectedProject.version ?? "—"}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                <button onClick={() => setSelectedProject(null)} className="bg-surface-container-high border border-outline-variant px-4 py-2.5 rounded-xl text-xs font-semibold text-on-surface cursor-pointer">Close</button>
                <a href={selectedProject.file_url ?? "#"} target="_blank" rel="noreferrer"
                  className={`bg-primary text-on-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${!selectedProject.file_url ? "opacity-40 pointer-events-none" : "cursor-pointer hover:brightness-110"}`}>
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download {selectedProject.version}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
