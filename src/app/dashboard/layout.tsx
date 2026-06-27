"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Library", href: "/dashboard/library", icon: "folder_open" },
    { name: "Downloads", href: "/dashboard/downloads", icon: "download" },
    { name: "Orders", href: "/dashboard/orders", icon: "shopping_cart" },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: "favorite" },
    { name: "Licenses", href: "/dashboard/licenses", icon: "verified_user" },
  ];

  const supportNav = [
    { name: "Support", href: "/dashboard/support", icon: "support_agent" },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: "notifications",
    },
    { name: "Settings", href: "/dashboard/settings", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-sans select-none relative">
      {/* Ambient Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(173, 198, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(173, 198, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sidebar Navigation */}
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-white/10 bg-surface/60 backdrop-blur-md flex-col py-6 px-4 z-50">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined font-bold text-[20px]">
              terminal
            </span>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-on-surface leading-tight">
              103 Dev
            </h2>
            <p className="text-[10px] text-on-surface-variant font-medium tracking-wider uppercase">
              Engineering Suite
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "text-primary font-bold border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent"
                    : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-6 pb-2 px-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">
              Support & Utility
            </p>
          </div>

          {supportNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "text-primary font-bold border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent"
                    : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 space-y-4">
          <div className="p-4 rounded-xl bg-primary-container/20 border border-primary/20">
            <p className="text-xs font-bold text-primary mb-1">PRO PLAN</p>
            <p className="text-[13px] text-on-surface-variant mb-3">
              Unlock unlimited licenses and cloud sync.
            </p>
            <Link
              href="/dashboard/upgrade"
              className="w-full py-2 px-4 bg-primary text-on-primary rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer block text-center"
            >
              Upgrade to Pro
            </Link>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 w-full z-40 bg-[#051424]/60 backdrop-blur-md border-b border-white/10 h-16 flex justify-between items-center px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search resources, licenses, and docs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#010f1f] border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[#d4e4fa]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-6">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer relative"
              >
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationsOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="fixed md:absolute top-16 md:top-auto right-4 md:right-0 left-4 md:left-auto md:mt-2 md:w-80 bg-[#051424] backdrop-blur-md rounded-2xl border border-white/10 z-50 p-4 shadow-2xl space-y-3"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-xs font-bold text-on-surface font-sans">
                          Recent Notifications
                        </span>
                        <button
                          onClick={() => alert("Marked all as read")}
                          className="text-[10px] text-primary hover:underline font-semibold cursor-pointer"
                        >
                          Mark read
                        </button>
                      </div>

                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        <div className="text-xs space-y-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <p className="font-semibold text-primary">
                            Horizon AI SaaS v2.2.4 released
                          </p>
                          <p className="text-on-surface-variant leading-relaxed">
                            Upgrade is now available in your engineering
                            downloads.
                          </p>
                          <span className="text-[9px] text-outline">
                            2 hours ago
                          </span>
                        </div>
                        <div className="text-xs space-y-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <p className="font-semibold text-emerald-400">
                            License Key Verified
                          </p>
                          <p className="text-on-surface-variant leading-relaxed">
                            Key registered for Nexus Dashboard locally.
                          </p>
                          <span className="text-[9px] text-outline">
                            5 hours ago
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-2 text-center">
                        <Link
                          href="/dashboard/notifications"
                          onClick={() => setIsNotificationsOpen(false)}
                          className="text-xs text-primary hover:underline font-bold block"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 ml-2 hover:border-primary cursor-pointer block transition-colors focus:outline-none"
              >
                <img
                  className="w-full h-full object-cover"
                  alt="Developer Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBcv3YPHQ8C3RSPuodg9qNiVcwmrQbZ8WW7YBoJKnyFXrCsjlL3YC4LECyrr7ZeIaTTQ9izPu97AfYiEwrirhysn91YeSBiGTm3E2tomiO0dXimnPXQcxNE8e7m6zS_bSa7JzCtnAzBUD2HuallHmYhevcUf-KcWdFpu_PrZzBhFap7IHWYzVU87jhpCvAqH8HfRrfRGRreblVXFYhlzdgvfZntzxrkfgazNjJWmV6UrMHIYFIf698RWED1CRzi2fECz7KbUqzwPh"
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    {/* Click-out backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProfileOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-[#051424] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-white/5 mb-1">
                        <p className="text-xs font-bold text-on-surface">Bryan</p>
                        <p className="text-[10px] text-on-surface-variant font-mono">bryan@103.dev</p>
                      </div>

                      <Link 
                        href="/dashboard/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">person</span>
                        <span>View Profile</span>
                      </Link>

                      <Link 
                        href="/login" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-error hover:bg-error/10 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        <span>Logout</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Children Page Content */}
        <main className="flex-1 px-4 md:px-8 py-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#051424]/80 backdrop-blur-lg border-t border-white/10 px-6 py-3 flex justify-between items-center z-50">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 ${pathname === "/dashboard" ? "text-primary font-bold" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-[20px]">
            dashboard
          </span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link
          href="/dashboard/library"
          className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/library" ? "text-primary font-bold" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-[20px]">
            folder_open
          </span>
          <span className="text-[10px]">Library</span>
        </Link>
        
        {/* Middle Action Button with Popup Menus */}
        <div className="relative -top-6">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-90"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? "close" : "add"}
            </span>
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop overlay */}
                <div 
                  className="fixed inset-0 bg-[#010f1f]/60 backdrop-blur-sm z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Expandable Grid Menu */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                  exit={{ opacity: 0, y: 30, scale: 0.9, x: "-50%" }}
                  className="absolute bottom-20 left-1/2 w-[85vw] max-w-sm bg-[#051424] border border-white/10 rounded-3xl p-4 shadow-2xl z-50 grid grid-cols-3 gap-4"
                >
                  <Link
                    href="/dashboard/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                    <span className="text-[9px] font-semibold">Orders</span>
                  </Link>

                  <Link
                    href="/dashboard/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">favorite</span>
                    <span className="text-[9px] font-semibold">Wishlist</span>
                  </Link>

                  <Link
                    href="/dashboard/licenses"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                    <span className="text-[9px] font-semibold">Licenses</span>
                  </Link>

                  <Link
                    href="/dashboard/support"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">support_agent</span>
                    <span className="text-[9px] font-semibold">Support</span>
                  </Link>

                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">notifications</span>
                    <span className="text-[9px] font-semibold">Alerts</span>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">person</span>
                    <span className="text-[9px] font-semibold">Profile</span>
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/dashboard/downloads"
          className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/downloads" ? "text-primary font-bold" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-[20px]">
            download
          </span>
          <span className="text-[10px]">Files</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/settings" ? "text-primary font-bold" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-[20px]">
            settings
          </span>
          <span className="text-[10px]">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
