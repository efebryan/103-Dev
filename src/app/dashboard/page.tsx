"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ orders: 0, downloads: 0, wishlist: 0, notifications: 0 });
  const [recentDownloads, setRecentDownloads] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return setLoading(false);

      const [
        { data: profileData },
        { count: ordersCount },
        { count: downloadsCount },
        { count: wishlistCount },
        { count: notifCount },
        { data: recentDl },
        { data: activityData },
      ] = await Promise.all([
        supabase.from("users").select("*").eq("id", user.id).single(),
        supabase.from("orders").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("downloads").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("wishlists").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false),
        supabase.from("downloads").select(`purchased_at, templates(id, title, description, version, thumbnail_url)`).eq("user_id", user.id).order("purchased_at", { ascending: false }).limit(3),
        supabase.from("activity_log").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);

      setProfile(profileData);
      setStats({ orders: ordersCount ?? 0, downloads: downloadsCount ?? 0, wishlist: wishlistCount ?? 0, notifications: notifCount ?? 0 });
      setRecentDownloads((recentDl ?? []).map(d => d.templates).filter(Boolean));
      setActivity(activityData ?? []);
      setLoading(false);
    });
  }, []);

  const statCards = [
    { name: "Purchased Assets", value: stats.orders, label: "Lifetime", icon: "shopping_cart", color: "primary" },
    { name: "Total Downloads", value: stats.downloads, label: "Packages", icon: "download", color: "secondary" },
    { name: "Unread Alerts", value: stats.notifications, label: "Notifications", icon: "notifications", color: "error" },
    { name: "Wishlist Items", value: stats.wishlist, label: "Saved", icon: "favorite", color: "tertiary" },
  ];

  const resources = [
    { title: "API Documentation", desc: "Full integration guides for all 103 Dev kits.", icon: "library_books", bgClass: "bg-primary/10", text: "text-primary", href: "/dashboard/docs" },
    { title: "Community Discord", desc: "Connect with developers on our server.", icon: "forum", bgClass: "bg-secondary/10", text: "text-secondary", href: "/dashboard/docs" },
    { title: "CLI Toolbelt", desc: "Automate your workflow with our custom CLI.", icon: "terminal", bgClass: "bg-tertiary/10", text: "text-tertiary", href: "/dashboard/docs" },
    { title: "Priority Support", desc: "Tickets respond in < 2 hours for Pro users.", icon: "live_help", bgClass: "bg-surface-container-highest", text: "text-on-surface", href: "/dashboard/support" },
  ];

  const fmt = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)} days ago`;
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-2">
            Welcome back, {loading ? "…" : (profile?.full_name?.split(" ")[0] ?? "Developer")} 👋
          </h1>
          <p className="text-on-surface-variant max-w-xl text-sm">Manage your purchases, downloads, licenses, and developer resources from your centralized engineering command center.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center gap-2 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Online
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-primary/30 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color === "primary" ? "bg-primary/10 text-primary" : stat.color === "secondary" ? "bg-secondary/10 text-secondary" : stat.color === "error" ? "bg-error/10 text-error" : "bg-tertiary/10 text-tertiary"}`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${stat.color === "error" ? "text-error" : "text-outline"}`}>{stat.label}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-on-surface">{loading ? "—" : stat.value}</p>
              <p className="text-on-surface-variant text-xs mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Continue Working */}
      {recentDownloads.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-on-surface">Continue Working</h2>
            <Link href="/dashboard/library" className="text-primary text-sm font-semibold hover:underline cursor-pointer">View All Library</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentDownloads.map((product) => (
              <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row group border border-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="md:w-48 h-48 md:h-auto relative overflow-hidden shrink-0 bg-surface-container-high">
                  {product.thumbnail_url ? (
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.title} src={product.thumbnail_url} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline text-xs">No Preview</div>
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-on-surface">{product.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-outline font-bold">Version</span>
                      <span className="text-xs font-mono text-on-surface mt-0.5">{product.version ?? "—"}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <a href={product.file_url ?? "#"} target="_blank" rel="noreferrer"
                      className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 bg-primary text-on-primary hover:brightness-110 transition-all ${!product.file_url ? "opacity-40 pointer-events-none" : "cursor-pointer"}`}>
                      <span className="material-symbols-outlined text-[16px]">download</span>Download
                    </a>
                    <Link href="/dashboard/docs" className="py-2 px-4 bg-surface-container-high text-on-surface rounded-lg border border-white/10 font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">description</span>Docs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resources & Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-on-surface">Engineering Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((res) => (
              <Link href={res.href} key={res.title} className="glass-card p-5 rounded-xl border border-white/5 flex items-start gap-4 hover:bg-primary/5 transition-colors cursor-pointer block">
                <div className={`p-2.5 rounded-lg ${res.bgClass} ${res.text}`}>
                  <span className="material-symbols-outlined text-[20px]">{res.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">{res.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{res.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-on-surface">Recent Activity</h2>
          <div className="glass-card rounded-2xl p-6 space-y-6 border border-white/5">
            {loading ? (
              <p className="text-xs text-on-surface-variant">Loading activity…</p>
            ) : activity.length === 0 ? (
              <p className="text-xs text-on-surface-variant text-center py-4">No recent activity yet.</p>
            ) : (
              activity.map((act, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-xs text-on-surface leading-relaxed">{act.action}</p>
                    <span className="text-[10px] text-outline mt-1 block font-mono">{fmt(act.created_at)}</span>
                  </div>
                </div>
              ))
            )}
            <Link href="/dashboard/notifications" className="w-full py-2.5 text-primary font-bold text-xs border-t border-white/5 pt-4 hover:brightness-125 transition-all cursor-pointer block text-center">
              View Full Log
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
