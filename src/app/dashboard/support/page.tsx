"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("technical");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      supabase
        .from("support_tickets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          setTickets(data ?? []);
          setLoading(false);
        });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSubmitting(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setSubmitting(false);

    const { data, error } = await supabase
      .from("support_tickets")
      .insert({ user_id: user.id, subject: newTitle, category: newCategory, priority: "medium" })
      .select()
      .single();

    if (!error && data) {
      setTickets(prev => [data, ...prev]);
      setNewTitle("");
    }
    setSubmitting(false);
  };

  const statusColors: Record<string, string> = {
    open: "bg-primary/10 text-primary border-primary/20",
    answered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    closed: "bg-white/5 text-outline border-white/10",
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Developer Support Center</h1>
        <p className="text-on-surface-variant text-sm mt-1">Get priority technical help, resolve billing issues, or check active ticket statuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-base font-bold text-on-surface mb-4">Open a Priority Ticket</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Subject / Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g. Stripe webhook verification failing in local env"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-on-surface-variant/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                >
                  <option value="technical">Technical / Bug Support</option>
                  <option value="billing">Billing &amp; Orders</option>
                  <option value="license">Licensing &amp; Activations</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-on-primary w-full py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Ticket"}
              </button>
            </form>
          </div>
        </div>

        {/* Ticket List */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface">Active Tickets</h3>
            {loading ? (
              <p className="text-xs text-on-surface-variant">Loading tickets…</p>
            ) : (
              <div className="space-y-4">
                {tickets.map((t) => (
                  <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-surface-container-high/30 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-primary">{t.id.slice(0, 8).toUpperCase()}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border ${statusColors[t.status] ?? "bg-white/5 text-outline border-white/10"}`}>
                        {t.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-on-surface leading-normal line-clamp-2">{t.subject}</h4>
                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant pt-1">
                      <span className="capitalize">{t.category}</span>
                      <span>{fmt(t.created_at)}</span>
                    </div>
                  </motion.div>
                ))}
                {tickets.length === 0 && (
                  <p className="text-xs text-on-surface-variant text-center py-4">No tickets yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
