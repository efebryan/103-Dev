"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      supabase
        .from("downloads")
        .select(`purchased_at, template_id, templates(id, title, description, version, file_url)`)
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false })
        .then(({ data }) => {
          setDownloads(data ?? []);
          setLoading(false);
        });
    });
  }, []);

  const filtered = downloads.filter(item =>
    (item.templates?.title ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Downloads &amp; Licenses</h1>
          <p className="text-on-surface-variant text-sm mt-1">Review your download logs, re-download packages, and retrieve product license keys.</p>
        </div>
      </div>

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

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-base font-bold text-on-surface">Download History &amp; Active Packages</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-on-surface-variant text-xs">Loading downloads…</div>
          ) : (
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Version</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {filtered.map((item) => (
                  <tr key={item.template_id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="font-semibold text-on-surface">{item.templates?.title ?? "—"}</p>
                        <p className="text-[10px] text-outline font-mono">{item.templates?.description ?? ""}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-primary">{item.templates?.version ?? "—"}</td>
                    <td className="py-4 px-6 text-on-surface-variant">{fmt(item.purchased_at)}</td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={item.templates?.file_url ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all ${!item.templates?.file_url ? "opacity-40 pointer-events-none" : "cursor-pointer"}`}
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-on-surface-variant text-xs">No matching downloads found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
