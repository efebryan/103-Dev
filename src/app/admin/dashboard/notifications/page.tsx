"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "user", title: "New user registration", description: "A new user 'john.doe@example.com' just created an account.", time: "5m ago", is_read: false },
    { id: 2, type: "order", title: "Order #1234 placed", description: "Payment confirmed for Order #1234 for $49.00.", time: "1h ago", is_read: false },
    { id: 3, type: "system", title: "System update complete", description: "The platform has been updated to v1.2.0 successfully.", time: "2h ago", is_read: true },
    { id: 4, type: "alert", title: "High CPU Usage", description: "Server load exceeded 80% for 5 minutes.", time: "1d ago", is_read: true },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleClear = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const dotColor: Record<string, string> = {
    user: "bg-primary",
    order: "bg-secondary",
    system: "bg-emerald-400",
    alert: "bg-error",
    general: "bg-outline",
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Admin Notifications</h1>
          <p className="text-on-surface-variant text-sm mt-1">Review system alerts, new registrations, and platform updates.</p>
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
          {notifications.map((item) => (
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
                  <span className="text-[10px] text-outline font-mono">{item.time}</span>
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
