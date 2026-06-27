"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LibraryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const assets = [
    {
      id: "1",
      name: "Horizon AI SaaS Boilerplate",
      description: "Next.js 14, Tailwind, Prisma, Stripe",
      category: "Templates",
      installed: "v2.1.0",
      latest: "v2.2.4",
      tag: "NEW VERSION",
      hasUpdate: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB86kGpSg0O7911-LjUVmB9kUiTlhH4uUsTS5aK_YPvyP-SVT7Kyo1HaBF_QOYoqKI9voUE4hTiszqEqhVJ8T80avH9uXmru0vLRNR6BTyfXb42FKZ9tZwG8V3PP1EuBTxwsPE_BXmaFekcqFlyJy7koB7ULP-CRIYLBVIjY7lIlhyEuAmr1ZzazpUKx6gWxHZ0QweIedovksOGGWpkqFSZpVkGZGf5Iz_ARGVFtMHVcuc2i4hMLVeGbGkSOuR3ykq0DRB8b7VQvxgG",
      prerequisites: [
        "Node.js 18.0.0 or higher",
        "PostgreSQL or MongoDB Database connection",
        "Stripe Developer Account (for webhooks & billing)",
        "Resend Account (for transactional email scripts)",
      ],
      screenshots: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB86kGpSg0O7911-LjUVmB9kUiTlhH4uUsTS5aK_YPvyP-SVT7Kyo1HaBF_QOYoqKI9voUE4hTiszqEqhVJ8T80avH9uXmru0vLRNR6BTyfXb42FKZ9tZwG8V3PP1EuBTxwsPE_BXmaFekcqFlyJy7koB7ULP-CRIYLBVIjY7lIlhyEuAmr1ZzazpUKx6gWxHZ0QweIedovksOGGWpkqFSZpVkGZGf5Iz_ARGVFtMHVcuc2i4hMLVeGbGkSOuR3ykq0DRB8b7VQvxgG",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRD3LP1pVDCvd1WIybIMiKO-O-imHFxr6Fy_KMTuk8seis64MYf8s129rtIPelzmgBQHl5QCdstonMhZu_4_fxYo4KqoNG_YHPUudvnrl1H80axYmpvo15gpGaq85xrHhY7-LlwFzduRNb8cFR5nyjTxTL9nF9GvKfyHeDpVR4mzISe1LcYzFlorpaMNuszJJmU-W2DW_MZe5OiCWbjV5g74OQfC-C37WbBTlO8vxe_qzK8rSyfQ5rgB-5L2QMkawchgBzeCqyc8W",
      ],
      changelog: [
        { version: "v2.2.4", date: "June 20, 2026", notes: "Upgraded Next.js to latest stable version. Integrated Turbopack compatibility." },
        { version: "v2.1.0", date: "May 15, 2026", notes: "Implemented database synchronization and Stripe webhooks." },
      ]
    },
    {
      id: "2",
      name: "Nexus Admin Dashboard",
      description: "React, TypeScript, Framer Motion",
      category: "Components",
      installed: "v4.0.0",
      latest: "v4.0.0",
      tag: null,
      hasUpdate: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRD3LP1pVDCvd1WIybIMiKO-O-imHFxr6Fy_KMTuk8seis64MYf8s129rtIPelzmgBQHl5QCdstonMhZu_4_fxYo4KqoNG_YHPUudvnrl1H80axYmpvo15gpGaq85xrHhY7-LlwFzduRNb8cFR5nyjTxTL9nF9GvKfyHeDpVR4mzISe1LcYzFlorpaMNuszJJmU-W2DW_MZe5OiCWbjV5g74OQfC-C37WbBTlO8vxe_qzK8rSyfQ5rgB-5L2QMkawchgBzeCqyc8W",
      prerequisites: [
        "React 18.2.0 or higher",
        "Tailwind CSS v3.0 or higher configured",
        "Framer Motion for dashboard card animations",
      ],
      screenshots: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRD3LP1pVDCvd1WIybIMiKO-O-imHFxr6Fy_KMTuk8seis64MYf8s129rtIPelzmgBQHl5QCdstonMhZu_4_fxYo4KqoNG_YHPUudvnrl1H80axYmpvo15gpGaq85xrHhY7-LlwFzduRNb8cFR5nyjTxTL9nF9GvKfyHeDpVR4mzISe1LcYzFlorpaMNuszJJmU-W2DW_MZe5OiCWbjV5g74OQfC-C37WbBTlO8vxe_qzK8rSyfQ5rgB-5L2QMkawchgBzeCqyc8W"
      ],
      changelog: [
        { version: "v4.0.0", date: "June 12, 2026", notes: "Initial production stable release. Support for responsive sidebar and grid bento statistics layout." }
      ]
    },
    {
      id: "3",
      name: "Rust High-Performance Web Server",
      description: "Actix-web, SQLx, PostgreSQL boilerplate",
      category: "Backend",
      installed: "v1.0.0",
      latest: "v1.0.2",
      tag: "UPDATE",
      hasUpdate: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb8751M7Je9GuK00dv3abmE33PICtxzphg15jR2qJqdFrp0osb6_V9qVuOd_j59NtiD0wNTApv2OXhPfjG_xnz7fTAEUeVTpaJe_pOXXvFSsOluMJ1JotRgzajiud4wrm9idXGaw8hBxgUAKLTP_H88WpNljKccUgy-shcdNvaJlRLmeHA06PXOp4pr5H55meYXYdiZibSnXUnumMS3mvZrHuOFYsiTz09VZ5PicNiCxH9dbvdN7xEUs5fgGWjevTPljaBqaJW44tG",
      prerequisites: [
        "Rust compiler edition 2021 or higher",
        "PostgreSQL instance with SQLx offline setup config",
        "Docker (optional for PostgreSQL container startup)",
      ],
      screenshots: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBb8751M7Je9GuK00dv3abmE33PICtxzphg15jR2qJqdFrp0osb6_V9qVuOd_j59NtiD0wNTApv2OXhPfjG_xnz7fTAEUeVTpaJe_pOXXvFSsOluMJ1JotRgzajiud4wrm9idXGaw8hBxgUAKLTP_H88WpNljKccUgy-shcdNvaJlRLmeHA06PXOp4pr5H55meYXYdiZibSnXUnumMS3mvZrHuOFYsiTz09VZ5PicNiCxH9dbvdN7xEUs5fgGWjevTPljaBqaJW44tG"
      ],
      changelog: [
        { version: "v1.0.2", date: "May 30, 2026", notes: "Fixed JWT token decryption buffer size error." },
        { version: "v1.0.0", date: "April 15, 2026", notes: "Initial release containing CRUD endpoint structures and Actix core routing." }
      ]
    },
  ];

  const filteredAssets = filter === "all" ? assets : assets.filter(a => a.category.toLowerCase() === filter);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Engineering Library</h1>
          <p className="text-on-surface-variant text-sm mt-1">Access, update, and manage your purchased codebases and developer assets.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-white/10 gap-6">
        {["all", "templates", "components", "backend"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-3 text-sm font-semibold capitalize relative cursor-pointer ${
              filter === tab ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab}
            {filter === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid of Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/30 transition-all duration-300"
          >
            <div className="h-44 relative overflow-hidden shrink-0">
              <img className="w-full h-full object-cover" alt={product.name} src={product.image} />
              {product.tag && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-on-primary text-[9px] rounded uppercase font-bold tracking-widest shadow-lg">
                  {product.tag}
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</span>
                <h3 
                  onClick={() => setSelectedProject(product)}
                  className="text-base font-bold text-on-surface mt-1 hover:text-primary cursor-pointer transition-colors"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 py-2 border-t border-b border-white/5">
                  <div className="flex flex-col flex-1">
                    <span className="text-[9px] uppercase text-outline font-bold">Installed</span>
                    <span className="text-xs font-mono text-on-surface mt-0.5">{product.installed}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[9px] uppercase text-outline font-bold">Latest</span>
                    <span className={`text-xs font-mono mt-0.5 ${product.hasUpdate ? "text-primary font-bold" : "text-on-surface"}`}>{product.latest}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    {product.hasUpdate ? "Update" : "Download"}
                  </button>
                  <button className="py-2 px-3 bg-surface-container-high text-on-surface rounded-lg border border-white/10 font-bold text-xs hover:bg-white/10 transition-all cursor-pointer">
                    Docs
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#010f1f]/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-3xl rounded-3xl p-6 md:p-8 border border-white/10 relative z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{selectedProject?.category}</span>
                  <h2 className="text-xl font-bold tracking-tight text-on-surface mt-1">{selectedProject?.name}</h2>
                  <p className="text-xs text-on-surface-variant mt-1">{selectedProject?.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Screenshots Gallery */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Template Preview Screenshots</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject?.screenshots?.map((src: string, i: number) => (
                    <div key={i} className="h-40 rounded-xl overflow-hidden border border-white/5">
                      <img className="w-full h-full object-cover" alt="Preview" src={src} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites & Changelogs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                {/* Prerequisites */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Deployment Prerequisites</span>
                  <ul className="space-y-2 text-xs text-on-surface-variant">
                    {selectedProject?.prerequisites?.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-sm shrink-0">check_circle</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Changelog */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Changelogs & History</span>
                  <div className="space-y-3">
                    {selectedProject?.changelog?.map((log: any, i: number) => (
                      <div key={i} className="text-xs space-y-1 p-3 rounded-xl bg-surface-container-high/30 border border-white/5">
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-primary">{log.version}</span>
                          <span className="text-[10px] text-outline">{log.date}</span>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed mt-1">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Action buttons */}
              <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-surface-container-high border border-outline-variant px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer"
                >
                  Close
                </button>
                <button 
                  onClick={() => alert(`Downloading latest files for ${selectedProject?.name}...`)}
                  className="bg-primary text-on-primary px-4 py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download {selectedProject?.latest}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

