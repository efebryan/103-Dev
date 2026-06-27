"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: "1",
      name: "Quantum UI Kit",
      description: "Glassmorphic Web Components for SaaS",
      price: "$79.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRD3LP1pVDCvd1WIybIMiKO-O-imHFxr6Fy_KMTuk8seis64MYf8s129rtIPelzmgBQHl5QCdstonMhZu_4_fxYo4KqoNG_YHPUudvnrl1H80axYmpvo15gpGaq85xrHhY7-LlwFzduRNb8cFR5nyjTxTL9nF9GvKfyHeDpVR4mzISe1LcYzFlorpaMNuszJJmU-W2DW_MZe5OiCWbjV5g74OQfC-C37WbBTlO8vxe_qzK8rSyfQ5rgB-5L2QMkawchgBzeCqyc8W",
    },
    {
      id: "2",
      name: "Cyberpunk React template",
      description: "Neon aesthetic dashboard wrapper",
      price: "$39.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB86kGpSg0O7911-LjUVmB9kUiTlhH4uUsTS5aK_YPvyP-SVT7Kyo1HaBF_QOYoqKI9voUE4hTiszqEqhVJ8T80avH9uXmru0vLRNR6BTyfXb42FKZ9tZwG8V3PP1EuBTxwsPE_BXmaFekcqFlyJy7koB7ULP-CRIYLBVIjY7lIlhyEuAmr1ZzazpUKx6gWxHZ0QweIedovksOGGWpkqFSZpVkGZGf5Iz_ARGVFtMHVcuc2i4hMLVeGbGkSOuR3ykq0DRB8b7VQvxgG",
    },
  ]);

  const handleRemove = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Saved Assets</h1>
        <p className="text-on-surface-variant text-sm mt-1">Keep track of waitlisted codebases, upcoming drops, and saved developer kits.</p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/30 transition-all duration-300 relative group"
          >
            <div className="h-40 relative overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.name} src={item.image} />
              <button 
                onClick={() => handleRemove(item.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-[#051424]/80 text-tertiary border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                title="Remove from saved"
              >
                <span className="material-symbols-outlined text-[18px] fill-current">favorite</span>
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-on-surface">{item.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-base font-extrabold text-on-surface">{item.price}</span>
                <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {wishlist.length === 0 && (
          <div className="col-span-full py-16 text-center text-on-surface-variant text-xs">
            Your saved list is empty.
          </div>
        )}
      </div>
    </div>
  );
}
