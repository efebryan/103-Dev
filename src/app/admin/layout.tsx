"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const operationsNav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Orders", href: "/admin/dashboard/orders", icon: "shopping_cart" },
    { name: "Licenses", href: "/admin/dashboard/licenses", icon: "verified_user" },
  ];

  const managementNav = [
    { name: "Users", href: "/admin/users", icon: "group" },
    { name: "Products", href: "/admin/products", icon: "shopping_bag" },
    { name: "Settings", href: "/admin/settings", icon: "settings" },
  ];

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
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
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
          <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-high/50">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate">Admin User</p>
              <p className="text-[10px] text-on-surface-variant truncate">admin@103.dev</p>
            </div>
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

              <nav className="flex-1 space-y-1.5 overflow-y-auto">
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
                <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-high/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                    AD
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold truncate">Admin User</p>
                    <p className="text-[9px] text-on-surface-variant truncate">admin@103.dev</p>
                  </div>
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

          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span className="hidden sm:inline">View Live Site</span>
            </Link>
            <div className="w-[1px] h-4 bg-outline-variant"></div>
            <button className="relative w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-bright transition-colors text-on-surface">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Page children */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
