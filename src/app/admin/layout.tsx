"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Users", href: "/admin/users", icon: "group" },
    { name: "Products", href: "/admin/products", icon: "shopping_bag" },
    { name: "Transactions", href: "/admin/transactions", icon: "receipt_long" },
    { name: "Settings", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col hidden md:flex">
        {/* Brand */}
        <div className="h-16 px-6 border-b border-outline-variant flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
            103<span className="text-primary">.Dev</span> <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navigation.map((item) => {
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-outline-variant bg-surface/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-4 flex-1">
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
              View Live Site
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
