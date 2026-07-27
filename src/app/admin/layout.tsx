"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Notification State
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New user registration", time: "5m ago", read: false },
    { id: 2, title: "Order #1234 placed", time: "1h ago", read: false },
    { id: 3, title: "System update complete", time: "2h ago", read: true },
  ]);

  const markNotifRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const deleteNotif = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Profile & Password Modals State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [userEmail, setUserEmail] = useState("admin@103.dev");
  const [userName, setUserName] = useState("Admin User");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? "admin@103.dev");
        if (user.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        }
      }
    });
  }, []);

  const operationsNav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Orders", href: "/admin/dashboard/orders", icon: "shopping_cart" },
    { name: "Licenses", href: "/admin/dashboard/licenses", icon: "verified_user" },
  ];

  const managementNav = [
    { name: "Users", href: "/admin/dashboard/users", icon: "group" },
    { name: "Products", href: "/admin/dashboard/products", icon: "shopping_bag" },
    { name: "Add/Edit Product", href: "/admin/dashboard/add-edit", icon: "edit_note" },
    { name: "Broadcast", href: "/admin/dashboard/broadcast", icon: "campaign" },
    { name: "Settings", href: "/admin/dashboard/settings", icon: "settings" },
  ];

  const initials = (name: string) =>
    (name ?? "AD").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Desktop Sidebar (visible on md+) */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col hidden md:flex h-screen sticky top-0">
        {/* Brand */}
        <div className="h-16 px-6 border-b border-outline-variant flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
            103<span className="text-primary">.Dev</span> <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="pb-2 px-4">
            <p className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              Operations
            </p>
          </div>
          {operationsNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary pl-3.5"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}

          <div className="pt-6 pb-2 px-4">
            <p className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              Management
            </p>
          </div>
          {managementNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary pl-3.5"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-outline-variant">
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-surface-container-high/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 shrink-0 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                {initials(userName)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold truncate">{userName}</p>
                <p className="text-[10px] text-on-surface-variant truncate">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 shrink-0 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
              title="Logout"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay Drawer (visible on <md) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col z-50 md:hidden p-4 space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
                <Link href="/" onClick={() => setIsMobileSidebarOpen(false)} className="text-lg font-bold tracking-tight">
                  103<span className="text-primary">.Dev</span> <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Admin</span>
                </Link>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-on-surface hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <nav className="flex-1 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="pb-1 px-2">
                  <p className="text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                    Operations
                  </p>
                </div>
                {operationsNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary border-l-2 border-primary pl-2.5"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}

                <div className="pt-4 pb-1 px-2">
                  <p className="text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                    Management
                  </p>
                </div>
                {managementNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary border-l-2 border-primary pl-2.5"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-outline-variant">
                <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-surface-container-high/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                      {initials(userName)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold truncate">{userName}</p>
                      <p className="text-[9px] text-on-surface-variant truncate">{userEmail}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-1.5 shrink-0 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-outline-variant bg-surface/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Hamburger menu toggle */}
            <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Toggle admin sidebar"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* Search */}
            <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-1.5 w-64 max-w-full focus-within:ring-1 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
              <input
                type="text"
                placeholder="Search console..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">


            {/* Top Bar Notification Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifModalOpen(!isNotifModalOpen)}
                className="relative w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-bright transition-colors text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                )}
              </button>

              {isNotifModalOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifModalOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 glass-card rounded-2xl p-4 border border-white/10 shadow-2xl z-50 flex flex-col">
                    <h4 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2 mb-2">Notifications</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-on-surface-variant text-center py-4">No notifications.</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`flex items-start justify-between gap-2 p-2 rounded-xl transition-colors ${n.read ? "bg-transparent" : "bg-primary/5 border border-primary/10"}`}>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs truncate ${n.read ? "text-on-surface-variant" : "text-on-surface font-semibold"}`}>{n.title}</p>
                              <p className="text-[10px] text-on-surface-variant/60">{n.time}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {!n.read && (
                                <button onClick={() => markNotifRead(n.id)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-primary transition-colors" title="Mark as read">
                                  <span className="material-symbols-outlined text-[14px]">done</span>
                                </button>
                              )}
                              <button onClick={() => deleteNotif(n.id)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-error/10 text-error transition-colors" title="Delete">
                                <span className="material-symbols-outlined text-[14px]">close</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <Link href="/admin/dashboard/notifications" onClick={() => setIsNotifModalOpen(false)} className="mt-3 pt-3 border-t border-white/5 text-xs text-center text-primary font-semibold hover:underline">
                      View all
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Top Bar Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-xs hover:bg-primary/30 transition-all cursor-pointer shadow-sm"
                title="Admin Profile Menu"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
              </button>

              {isProfileModalOpen && (
                <>
                  {/* Backdrop to close dropdown on outside click */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileModalOpen(false)} />

                  {/* Dropdown Box */}
                  <div className="absolute right-0 mt-2 w-64 glass-card rounded-2xl p-4 border border-white/10 shadow-2xl z-50 space-y-3">
                    {/* Profile Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary/30">
                        {initials(userName)}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-xs font-bold text-on-surface truncate">{userName}</h3>
                        <p className="text-[10px] text-on-surface-variant font-mono truncate">{userEmail}</p>
                      </div>
                    </div>

                    {/* Menu Actions */}
                    <div className="space-y-1">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileModalOpen(false)}
                        className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface text-xs font-semibold transition-colors"
                      >
                        <span className="material-symbols-outlined text-primary text-[16px]">person</span>
                        Profile
                      </Link>

                      <button
                        onClick={() => {
                          setIsProfileModalOpen(false);
                          setIsChangePasswordModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-amber-400 text-[16px]">lock_reset</span>
                        Change Password
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileModalOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-colors cursor-pointer border border-rose-500/20"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page children */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5 relative">
            <button 
              onClick={() => setIsChangePasswordModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div>
              <h3 className="text-base font-bold text-on-surface">Change Password</h3>
              <p className="text-xs text-on-surface-variant mt-1">Enter a new secure password for your account.</p>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (newPassword.length < 6) return alert("Password must be at least 6 characters.");
                setPasswordLoading(true);
                const supabase = createClient();
                const { error } = await supabase.auth.updateUser({ password: newPassword });
                setPasswordLoading(false);
                if (error) {
                  alert(error.message);
                } else {
                  alert("Password updated successfully!");
                  setNewPassword("");
                  setIsChangePasswordModalOpen(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#010f1f] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordModalOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-on-surface text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-primary text-on-primary text-xs font-bold px-5 py-2.5 rounded-xl hover:brightness-110 cursor-pointer disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
