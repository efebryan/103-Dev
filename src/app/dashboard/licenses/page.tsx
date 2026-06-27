"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LicensesPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const licenses = [
    {
      id: "LIC-11",
      productName: "Horizon AI SaaS Boilerplate",
      key: "103_DEV_LIC_HAISB_8829_9918",
      type: "Commercial Pro License",
      activations: "2 of 5 domains",
      status: "Active",
      datePurchased: "June 25, 2026",
    },
    {
      id: "LIC-12",
      productName: "Nexus Admin Dashboard",
      key: "103_DEV_LIC_NXDB_1102_5546",
      type: "Personal Developer License",
      activations: "1 of 1 domain",
      status: "Active",
      datePurchased: "June 12, 2026",
    },
    {
      id: "LIC-13",
      productName: "Rust High-Performance Web Server",
      key: "103_DEV_LIC_RWS_4492_1209",
      type: "Unlimited Enterprise License",
      activations: "15 of Unlimited",
      status: "Active",
      datePurchased: "May 30, 2026",
    },
  ];

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Software Licenses</h1>
        <p className="text-on-surface-variant text-sm mt-1">Manage activation limits, copy developer keys, and track deployments.</p>
      </div>

      {/* Licenses List */}
      <div className="grid grid-cols-1 gap-6">
        {licenses.map((lic, idx) => (
          <motion.div
            key={lic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{lic.type}</span>
              <h3 className="text-lg font-bold text-on-surface">{lic.productName}</h3>
              <p className="text-xs text-on-surface-variant">Purchased on {lic.datePurchased} • Activations: <span className="font-semibold text-on-surface">{lic.activations}</span></p>
            </div>
            
            <div className="flex flex-col sm:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2 p-2 bg-[#010f1f] rounded-lg border border-white/5">
                <code className="text-xs font-mono text-on-surface-variant">{lic.key}</code>
                <button 
                  onClick={() => handleCopy(lic.key)}
                  className="p-1 rounded text-primary hover:bg-white/5 transition-colors cursor-pointer"
                  title="Copy Key"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedKey === lic.key ? "check" : "content_copy"}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  {lic.status}
                </span>
                <button className="bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer">
                  Manage Domains
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
