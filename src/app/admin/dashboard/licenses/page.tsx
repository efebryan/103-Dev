"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLicensesPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("licenses")
      .select(`*, users(id, full_name), templates(id, title)`)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLicenses(data ?? []);
        setLoading(false);
      });
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    const supabase = createClient();
    await supabase.from("licenses").update({ status: newStatus }).eq("id", id);
    setLicenses(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filtered = licenses.filter(l => {
    const matchFilter = filter === "all" || l.status === filter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || l.license_key.toLowerCase().includes(q)
      || (l.users?.full_name ?? "").toLowerCase().includes(q)
      || (l.templates?.title ?? "").toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const handleGenerateKey = () => {
    const newKey = `103DEV-GEN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-XNEW`;
    alert(`Generated New License Key:\n${newKey}\n\nNote: Assign it to a user & template via the database.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Software Licenses</h1>
          <p className="text-on-surface-variant text-sm mt-1">Generate keys, suspend licenses, and configure domain activation limit thresholds.</p>
        </div>
        <button
          onClick={handleGenerateKey}
          className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">vpn_key</span>
          Generate License Key
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          {["all", "active", "suspended"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${filter === s ? "bg-primary text-on-primary border-primary" : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input type="text" placeholder="Search key, customer, product..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40" />
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-on-surface-variant text-xs">Loading licenses…</div>
          ) : (
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
                {filtered.map(lic => (
                  <tr key={lic.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6 font-mono font-medium text-primary select-all text-xs truncate max-w-[200px]">{lic.license_key}</td>
                    <td className="py-4 px-6 text-on-surface-variant">{lic.templates?.title ?? "—"}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold">{lic.users?.full_name ?? "—"}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-on-surface">{lic.domains_used}</span>
                      <span className="text-outline"> / {lic.domain_limit === 9999 ? "∞" : lic.domain_limit}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${lic.status === "active" ? "bg-primary/10 text-primary border-primary/20" : "bg-error/10 text-error border-error/20"}`}>
                        {lic.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button onClick={() => handleToggleStatus(lic.id, lic.status)}
                        className={`${lic.status === "active" ? "text-error" : "text-primary"} hover:underline font-semibold cursor-pointer text-xs`}>
                        {lic.status === "active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-on-surface-variant font-medium">No licenses found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
