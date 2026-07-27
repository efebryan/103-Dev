"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    products: 0,
    customers: 0,
    orders: 0,
    downloads: 0,
    activeLicenses: 0,
    pendingTickets: 0,
  });
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [latestOrders, setLatestOrders] = useState<any[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [latestReviews, setLatestReviews] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    Promise.all([
      // Revenue: sum of all completed order amounts
      supabase.from("orders").select("amount").eq("order_status", "completed"),
      // Counts
      supabase.from("templates").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("downloads").select("*", { count: "exact", head: true }),
      supabase.from("licenses").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("support_tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
      // Top products by download_count
      supabase.from("templates").select("id, title, category, price, download_count, rating_avg").eq("status", "published").order("download_count", { ascending: false }).limit(3),
      // Latest orders
      supabase.from("orders").select("id, amount, order_status, created_at, users(full_name), templates(title)").order("created_at", { ascending: false }).limit(5),
      // Recent customers
      supabase.from("users").select("id, full_name, email, created_at").order("created_at", { ascending: false }).limit(5),
      // Open tickets
      supabase.from("support_tickets").select("id, subject, priority, status, created_at, users(full_name, email)").eq("status", "open").order("created_at", { ascending: false }).limit(5),
      // Latest reviews
      supabase.from("reviews").select("id, rating, body, created_at, users(full_name), templates(title)").order("created_at", { ascending: false }).limit(4),
      // Activity log
      supabase.from("activity_log").select("id, action, created_at").order("created_at", { ascending: false }).limit(5),
    ]).then(([
      revenueRes, productsRes, customersRes, ordersRes, downloadsRes, licensesRes, ticketsRes,
      topProdRes, latestOrdersRes, recentCustomersRes, supportRes, reviewsRes, activityRes
    ]) => {
      const totalRevenue = (revenueRes.data ?? []).reduce((sum: number, r: any) => sum + Number(r.amount ?? 0), 0);
      setStats({
        totalRevenue,
        products: productsRes.count ?? 0,
        customers: customersRes.count ?? 0,
        orders: ordersRes.count ?? 0,
        downloads: downloadsRes.count ?? 0,
        activeLicenses: licensesRes.count ?? 0,
        pendingTickets: ticketsRes.count ?? 0,
      });
      setTopProducts(topProdRes.data ?? []);
      setLatestOrders(latestOrdersRes.data ?? []);
      setRecentCustomers(recentCustomersRes.data ?? []);
      setSupportTickets(supportRes.data ?? []);
      setLatestReviews(reviewsRes.data ?? []);
      setActivity(activityRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const fmtAmt = (n: number) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  const fmtTime = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m} min${m > 1 ? "s" : ""} ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const statCards = [
    { name: "Total Revenue", value: loading ? "…" : fmtAmt(stats.totalRevenue), label: "Lifetime", icon: "payments", color: "text-primary bg-primary/10 border-primary/20" },
    { name: "Products", value: loading ? "…" : stats.products.toLocaleString(), label: "Active Marketplace", icon: "shopping_bag", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    { name: "Customers", value: loading ? "…" : stats.customers.toLocaleString(), label: "Developers", icon: "group", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
    { name: "Orders", value: loading ? "…" : stats.orders.toLocaleString(), label: "Transactions", icon: "shopping_cart", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    { name: "Downloads", value: loading ? "…" : stats.downloads.toLocaleString(), label: "Package pulls", icon: "download", color: "text-teal-400 bg-teal-400/10 border-teal-400/20" },
    { name: "Active Licenses", value: loading ? "…" : stats.activeLicenses.toLocaleString(), label: "Live Keys", icon: "verified_user", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
    { name: "Pending Tickets", value: loading ? "…" : stats.pendingTickets.toLocaleString(), label: "Needs Reply", icon: "support_agent", color: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
  ];

  const orderBadge: Record<string, string> = {
    completed: "bg-primary/10 text-primary border-primary/20",
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    refunded: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    cancelled: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Console Dashboard</h1>
        <p className="text-on-surface-variant text-sm mt-1">Real-time telemetry, transaction metrics, client logs, and support desks.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider leading-tight">{stat.name}</span>
              <div className={`p-1.5 rounded-lg border ${stat.color} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-base">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-black text-on-surface tracking-tight">{stat.value}</h4>
              <span className="text-[9px] text-outline font-medium mt-0.5 block">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue SVG Chart */}
      <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-on-surface">Revenue Overview</h3>
            <p className="text-[10px] text-on-surface-variant">Cumulative completed order revenue</p>
          </div>
          <span className="text-xs font-mono font-bold text-primary">{loading ? "…" : fmtAmt(stats.totalRevenue)} total</span>
        </div>
        <div className="h-40 w-full bg-[#010f1f]/50 rounded-2xl border border-white/5 p-4 flex items-end relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#42e5b0" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#42e5b0" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,45 Q15,35 30,38 T60,20 T90,15 T100,10 L100,50 L0,50 Z" fill="url(#chartGradient)" />
            <path d="M0,45 Q15,35 30,38 T60,20 T90,15 T100,10" fill="none" stroke="#42e5b0" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3-col table grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Products */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Top Selling Products</h3>
            {loading ? (
              <p className="text-xs text-on-surface-variant">Loading…</p>
            ) : (
              <div className="space-y-3">
                {topProducts.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No products yet.</p>}
                {topProducts.map(prod => (
                  <div key={prod.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="text-xs font-bold text-on-surface line-clamp-1">{prod.title}</p>
                      <span className="text-[9px] text-outline font-medium">{prod.category ?? "—"}</span>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xs font-extrabold text-primary">{fmtAmt(prod.price)}</p>
                      <span className="text-[9px] text-on-surface-variant font-mono">{prod.download_count ?? 0} dl</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/admin/dashboard/products" className="text-[10px] text-primary hover:underline font-bold text-center block mt-4 border-t border-white/5 pt-4">
            View products catalog
          </Link>
        </div>

        {/* Latest Orders */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Latest Orders</h3>
            {loading ? (
              <p className="text-xs text-on-surface-variant">Loading…</p>
            ) : (
              <div className="space-y-3">
                {latestOrders.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No orders yet.</p>}
                {latestOrders.map(ord => (
                  <div key={ord.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <span className="text-[9px] font-mono text-primary font-bold">{ord.id.slice(0, 8).toUpperCase()}</span>
                      <p className="text-xs font-semibold text-on-surface mt-0.5 line-clamp-1">{ord.users?.full_name ?? "—"}</p>
                      <p className="text-[9px] text-outline line-clamp-1">{ord.templates?.title ?? "—"}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xs font-black text-on-surface">{fmtAmt(ord.amount)}</p>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-semibold border mt-1 ${orderBadge[ord.order_status] ?? "bg-white/5 text-outline border-white/10"}`}>
                        {ord.order_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/admin/dashboard/orders" className="text-[10px] text-primary hover:underline font-bold text-center block mt-4 border-t border-white/5 pt-4">
            View transactions portal
          </Link>
        </div>

        {/* Recent Customers */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Recent Customers</h3>
            {loading ? (
              <p className="text-xs text-on-surface-variant">Loading…</p>
            ) : (
              <div className="space-y-3">
                {recentCustomers.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No customers yet.</p>}
                {recentCustomers.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="text-xs font-bold text-on-surface">{c.full_name ?? "—"}</p>
                      <span className="text-[9px] text-on-surface-variant font-mono">{c.email ?? "—"}</span>
                    </div>
                    <span className="text-[9px] text-outline font-medium shrink-0 ml-2">{fmtTime(c.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/admin/dashboard/users" className="text-[10px] text-primary hover:underline font-bold text-center block mt-4 border-t border-white/5 pt-4">
            View user profiles
          </Link>
        </div>
      </div>

      {/* Support, Reviews, Actions, Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Support Tickets */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Recent Support Tickets</h3>
            {loading ? <p className="text-xs text-on-surface-variant">Loading…</p> : (
              <div className="space-y-3">
                {supportTickets.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No open tickets. 🎉</p>}
                {supportTickets.map(ticket => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-rose-400 font-bold">{ticket.id.slice(0, 8).toUpperCase()}</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] bg-rose-400/10 text-rose-400 font-bold border border-rose-400/20 capitalize">{ticket.priority}</span>
                      </div>
                      <p className="text-xs font-bold text-on-surface leading-snug line-clamp-1">{ticket.subject}</p>
                      <p className="text-[9px] text-outline">{ticket.users?.full_name ?? ticket.users?.email ?? "—"}</p>
                    </div>
                    <button className="text-primary hover:underline text-xs font-semibold cursor-pointer shrink-0 ml-3">Reply</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Latest Reviews */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Latest Reviews</h3>
            {loading ? <p className="text-xs text-on-surface-variant">Loading…</p> : (
              <div className="space-y-3">
                {latestReviews.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No reviews yet.</p>}
                {latestReviews.map(rev => (
                  <div key={rev.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-on-surface">{rev.users?.full_name ?? "Anonymous"}</span>
                        <span className="text-[9px] text-outline ml-2 font-medium">{rev.templates?.title ?? "—"}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, r) => (
                          <span key={r} className="material-symbols-outlined text-xs">star</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{rev.body ? `"${rev.body}"` : "No comment."}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {[
                { icon: "add_box", label: "Add Product", desc: "Publish templates", href: "/admin/dashboard/products" },
                { icon: "vpn_key", label: "New License", desc: "Generate serial key", href: "/admin/dashboard/licenses" },
                { icon: "group", label: "Manage Users", desc: "User accounts", href: "/admin/dashboard/users" },
                { icon: "support_agent", label: "Support Desk", desc: "Reply to tickets", href: "/admin/dashboard/orders" },
              ].map(action => (
                <Link key={action.label} href={action.href}
                  className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-on-surface transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-primary text-base">{action.icon}</span>
                  <div>
                    <p className="font-bold">{action.label}</p>
                    <p className="text-[9px] text-on-surface-variant mt-0.5">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Recent Activity Feed</h3>
            {loading ? <p className="text-xs text-on-surface-variant">Loading…</p> : (
              <div className="space-y-4">
                {activity.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No activity logged yet.</p>}
                {activity.map((act, i) => (
                  <div key={act.id ?? i} className="flex gap-4 items-start text-xs">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1 flex justify-between items-start gap-4">
                      <p className="text-on-surface-variant leading-relaxed">{act.action}</p>
                      <span className="text-[10px] text-outline font-mono shrink-0">{fmtTime(act.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
