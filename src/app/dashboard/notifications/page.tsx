"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Horizon AI SaaS Boilerplate version available",
      desc: "Version v2.2.4 released. Read the changelogs and run update command.",
      time: "2 hours ago",
      type: "update",
      unread: true,
    },
    {
      id: "2",
      title: "Licensing key successfully verified",
      desc: "Nexus Admin Dashboard key was successfully registered at nexus-preview.103.dev",
      time: "5 hours ago",
      type: "license",
      unread: true,
    },
    {
      id: "3",
      title: "Product wishlist discount alert",
      desc: "Quantum UI Kit is now 15% off for Pro tier accounts.",
      time: "Yesterday",
      type: "deal",
      unread: false,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleClear = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
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

      {/* Notifications List */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-base font-bold text-on-surface">Inbox</h3>
        </div>
        <div className="divide-y divide-white/5">
          {notifications.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 flex items-start gap-4 transition-colors relative ${item.unread ? "bg-primary/5" : ""}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                item.type === "update" ? "bg-primary" :
                item.type === "license" ? "bg-emerald-400" :
                "bg-tertiary"
              }`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h4 className={`text-xs md:text-sm font-bold text-on-surface ${item.unread ? "text-primary" : ""}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-outline font-mono">{item.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-3xl">{item.desc}</p>
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
          {notifications.length === 0 && (
            <div className="py-16 text-center text-on-surface-variant text-xs">
              All caught up! No active notifications in your console.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
