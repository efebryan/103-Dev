"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          setNotifications(data ?? []);
          setLoading(false);
        });
    });
  }, []);

  const handleMarkAllRead = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleClear = async (id: string) => {
    const supabase = createClient();
    await supabase.from("notifications").delete().eq("id", id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const dotColor: Record<string, string> = {
    update: "bg-primary",
    license: "bg-emerald-400",
    order: "bg-secondary",
    deal: "bg-tertiary",
    general: "bg-outline",
  };

  const fmt = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Just now";
    if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
    const day = Math.floor(h / 24);
    return day === 1 ? "Yesterday" : `${day} days ago`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Console Notifications</h1>
          <p className="text-on-surface-variant text-sm mt-1">Stay updated with package updates, security warnings, and transaction logs.</p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="bg-surface-container-high border border-outline-variant px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-base font-bold text-on-surface">Inbox</h3>
        </div>
        <div className="divide-y divide-white/5">
          {loading && (
            <div className="py-16 text-center text-on-surface-variant text-xs">Loading notifications…</div>
          )}
          {!loading && notifications.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 flex items-start gap-4 transition-colors relative ${!item.is_read ? "bg-primary/5" : ""}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dotColor[item.type] ?? "bg-outline"}`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h4 className={`text-xs md:text-sm font-bold text-on-surface ${!item.is_read ? "text-primary" : ""}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-outline font-mono">{fmt(item.created_at)}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-3xl">{item.description}</p>
              </div>
              <button
                onClick={() => handleClear(item.id)}
                className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-white/5 transition-all cursor-pointer"
                title="Dismiss"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </motion.div>
          ))}
          {!loading && notifications.length === 0 && (
            <div className="py-16 text-center text-on-surface-variant text-xs">
              All caught up! No active notifications in your console.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
