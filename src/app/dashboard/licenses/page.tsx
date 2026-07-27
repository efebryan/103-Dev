"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LicensesPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      supabase
        .from("licenses")
        .select(`*, templates(id, title)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          setLicenses(data ?? []);
          setLoading(false);
        });
    });
  }, []);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const licenseTypeLabel: Record<string, string> = {
    personal: "Personal Developer License",
    commercial_pro: "Commercial Pro License",
    enterprise: "Unlimited Enterprise License",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Software Licenses</h1>
        <p className="text-on-surface-variant text-sm mt-1">Manage activation limits, copy developer keys, and track deployments.</p>
      </div>

      {loading ? (
        <div className="glass-card rounded-2xl border border-white/5 p-16 text-center text-on-surface-variant text-xs">Loading licenses…</div>
      ) : (
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
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  {licenseTypeLabel[lic.license_type] ?? lic.license_type}
                </span>
                <h3 className="text-lg font-bold text-on-surface">{lic.templates?.title ?? "—"}</h3>
                <p className="text-xs text-on-surface-variant">
                  Purchased {new Date(lic.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} •
                  Activations: <span className="font-semibold text-on-surface">{lic.domains_used} of {lic.domain_limit === 9999 ? "Unlimited" : lic.domain_limit}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:items-center gap-4">
                <div className="flex items-center gap-2 p-2 bg-[#010f1f] rounded-lg border border-white/5">
                  <code className="text-xs font-mono text-on-surface-variant truncate max-w-xs">{lic.license_key}</code>
                  <button
                    onClick={() => handleCopy(lic.license_key)}
                    className="p-1 rounded text-primary hover:bg-white/5 transition-colors cursor-pointer"
                    title="Copy Key"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedKey === lic.license_key ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    lic.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-400/10 text-rose-400 border-rose-400/20"
                  }`}>
                    {lic.status}
                  </span>
                  <button className="bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer">
                    Manage Domains
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {licenses.length === 0 && (
            <div className="glass-card rounded-2xl p-16 border border-white/5 text-center text-on-surface-variant text-xs">
              No licenses found. Purchase a template to receive a license key.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
