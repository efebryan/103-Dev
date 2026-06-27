"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

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
    { name: "Notifications", href: "/dashboard/notifications", icon: "notifications" },
    { name: "Settings", href: "/dashboard/settings", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] flex font-sans select-none relative">
      {/* Ambient Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(173, 198, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(173, 198, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Sidebar Navigation */}
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-white/10 bg-[#051424]/60 backdrop-blur-md flex-col py-6 px-4 z-50">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined font-bold text-[20px]">terminal</span>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-on-surface leading-tight">103 Dev</h2>
            <p className="text-[10px] text-on-surface-variant font-medium tracking-wider uppercase">Engineering Suite</p>
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
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-6 pb-2 px-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Support & Utility</p>
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
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 space-y-4">
          <div className="p-4 rounded-xl bg-primary-container/20 border border-primary/20">
            <p className="text-xs font-bold text-primary mb-1">PRO PLAN</p>
            <p className="text-[13px] text-on-surface-variant mb-3">Unlock unlimited licenses and cloud sync.</p>
            <button className="w-full py-2 px-4 bg-primary text-on-primary rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer">
              Upgrade to Pro
            </button>
          </div>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined text-[20px]">logout</span>
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
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
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
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </button>
            <button className="flex items-center gap-2 py-1.5 px-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-xs font-semibold cursor-pointer">
              <span className="material-symbols-outlined text-primary text-lg">add_circle</span>
              <span className="hidden sm:inline">New Project</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 ml-2">
              <img
                className="w-full h-full object-cover"
                alt="Developer Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBcv3YPHQ8C3RSPuodg9qNiVcwmrQbZ8WW7YBoJKnyFXrCsjlL3YC4LECyrr7ZeIaTTQ9izPu97AfYiEwrirhysn91YeSBiGTm3E2tomiO0dXimnPXQcxNE8e7m6zS_bSa7JzCtnAzBUD2HuallHmYhevcUf-KcWdFpu_PrZzBhFap7IHWYzVU87jhpCvAqH8HfRrfRGRreblVXFYhlzdgvfZntzxrkfgazNjJWmV6UrMHIYFIf698RWED1CRzi2fECz7KbUqzwPh"
              />
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
        <Link href="/dashboard" className={`flex flex-col items-center gap-1 ${pathname === "/dashboard" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/dashboard/library" className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/library" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <span className="material-symbols-outlined text-[20px]">folder_open</span>
          <span className="text-[10px]">Library</span>
        </Link>
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>
        <Link href="/dashboard/downloads" className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/downloads" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <span className="material-symbols-outlined text-[20px]">download</span>
          <span className="text-[10px]">Files</span>
        </Link>
        <Link href="/dashboard/settings" className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/settings" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="text-[10px]">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
