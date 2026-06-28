"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminLicensesPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const licenses = [
    { id: "1", key: "103DEV-HORIZON-7788-9900-XAAA", customer: "Bryan", email: "bryan@103.dev", product: "Horizon AI SaaS Boilerplate", domains: ["103.dev", "localhost"], limit: 5, status: "Active" },
    { id: "2", key: "103DEV-CYBER-5544-3321-XBBB", customer: "Sarah Jenkins", email: "sarah@jenkins.co", product: "Cyberpunk Tailwind UI Kit", domains: ["sarahjenkins.design"], limit: 1, status: "Active" },
    { id: "3", key: "103DEV-RUST-4433-2211-XCCC", customer: "Michael Chen", email: "m.chen@tech.org", product: "Rust High-Performance Web Server", domains: [], limit: 10, status: "Suspended" },
  ];

  const filteredLicenses = licenses.filter((lic) => {
    const matchesFilter = filter === "all" || lic.status.toLowerCase() === filter;
    const matchesSearch = 
      lic.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lic.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lic.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lic.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleGenerateKey = () => {
    const newKey = `103DEV-GEN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-XNEW`;
    alert(`Generated New License Key:\n${newKey}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Software Licenses</h1>
          <p className="text-on-surface-variant text-sm mt-1">Generate keys, suspend licenses, and configure domain activation limit thresholds.</p>
        </div>
        <div>
          <button 
            onClick={handleGenerateKey}
            className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">vpn_key</span>
            Generate License Key
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          {["all", "active", "suspended"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${
                filter === status
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search key, customer, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      {/* Licenses Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">License Key</th>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6 text-center">Domains</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredLicenses.map((lic) => (
                <tr key={lic.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary select-all">{lic.key}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{lic.product}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold">{lic.customer}</p>
                      <p className="text-[10px] text-outline">{lic.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-bold text-on-surface">{lic.domains.length}</span>
                    <span className="text-outline"> / {lic.limit}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      lic.status === "Active"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-error/10 text-error border-error/20"
                    }`}>
                      {lic.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {lic.status === "Active" ? (
                      <button
                        onClick={() => alert(`Suspending license: ${lic.key}`)}
                        className="text-error hover:underline font-semibold cursor-pointer text-xs"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Activating license: ${lic.key}`)}
                        className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Managing domains for key:\n${lic.key}\nActive: ${lic.domains.join(", ") || "None"}`)}
                      className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Domains
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLicenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-on-surface-variant font-medium">
                    No software licenses found matching search criteria.
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
