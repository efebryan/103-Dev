"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      supabase
        .from("wishlists")
        .select(`created_at, template_id, templates(id, title, description, price, thumbnail_url)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          setWishlist(data ?? []);
          setLoading(false);
        });
    });
  }, []);

  const handleRemove = async (templateId: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("wishlists").delete().eq("user_id", user.id).eq("template_id", templateId);
    setWishlist(prev => prev.filter(item => item.template_id !== templateId));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Saved Assets</h1>
        <p className="text-on-surface-variant text-sm mt-1">Keep track of waitlisted codebases, upcoming drops, and saved developer kits.</p>
      </div>

      {loading ? (
        <div className="glass-card rounded-2xl border border-white/5 p-16 text-center text-on-surface-variant text-xs">Loading saved items…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item, idx) => {
            const t = item.templates;
            return (
              <motion.div
                key={item.template_id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/30 transition-all duration-300 relative group"
              >
                <div className="h-40 relative overflow-hidden bg-surface-container-high">
                  {t?.thumbnail_url ? (
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={t.title} src={t.thumbnail_url} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline text-xs">No Preview</div>
                  )}
                  <button
                    onClick={() => handleRemove(item.template_id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-[#051424]/80 text-tertiary border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[18px] fill-current">favorite</span>
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-on-surface">{t?.title ?? "—"}</h3>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">{t?.description ?? ""}</p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <span className="text-base font-extrabold text-on-surface">${Number(t?.price ?? 0).toFixed(2)}</span>
                    <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {wishlist.length === 0 && (
            <div className="col-span-full py-16 text-center text-on-surface-variant text-xs">
              Your saved list is empty.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
