"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const downloadHistory = [
    {
      id: "DL-1092",
      fileName: "horizon-ai-boilerplate-v2.1.0.zip",
      productName: "Horizon AI SaaS Boilerplate",
      version: "v2.1.0",
      date: "June 25, 2026",
      size: "142 MB",
      licenseKey: "103_DEV_LIC_HAISB_8829_9918",
    },
    {
      id: "DL-1091",
      fileName: "nexus-dashboard-v4.0.0.zip",
      productName: "Nexus Admin Dashboard",
      version: "v4.0.0",
      date: "June 12, 2026",
      size: "89 MB",
      licenseKey: "103_DEV_LIC_NXDB_1102_5546",
    },
    {
      id: "DL-1090",
      fileName: "rust-web-server-v1.0.0.zip",
      productName: "Rust High-Performance Web Server",
      version: "v1.0.0",
      date: "May 30, 2026",
      size: "24 MB",
      licenseKey: "103_DEV_LIC_RWS_4492_1209",
    },
  ];

  const filteredHistory = downloadHistory.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Downloads & Licenses</h1>
          <p className="text-on-surface-variant text-sm mt-1">Review your download logs, re-download packages, and retrieve API/product license keys.</p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2 w-80 max-w-full focus-within:ring-1 focus-within:ring-primary transition-all">
        <span className="material-symbols-outlined text-outline text-lg mr-2">search</span>
        <input
          type="text"
          placeholder="Filter package downloads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
        />
      </div>

      {/* Downloads Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-base font-bold text-on-surface">Download History & Active Packages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">File / Product</th>
                <th className="py-4 px-6">Version</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Size</th>
                <th className="py-4 px-6">License Key</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="font-semibold text-on-surface">{item.productName}</p>
                      <p className="text-[10px] text-outline font-mono">{item.fileName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-primary">{item.version}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{item.date}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{item.size}</td>
                  <td className="py-4 px-6">
                    <code className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/5 font-mono text-on-surface-variant">
                      {item.licenseKey}
                    </code>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-on-surface-variant text-xs">
                    No matching downloads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
