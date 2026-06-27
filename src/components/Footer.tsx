"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Subscribed successfully!");
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-16 mt-20">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="text-xl font-bold text-on-surface">103 Dev</Link>
          <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
            The premier marketplace for elite developer assets. High-performance, production-ready, and developer-approved.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary hover:scale-110 transition-all duration-300" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary hover:scale-110 transition-all duration-300" aria-label="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary hover:scale-110 transition-all duration-300" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary hover:scale-110 transition-all duration-300" aria-label="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.53.02C13.84 0 15.14.3 16.32.87V5.3c-.94-.6-2.02-.9-3.13-.87v3.7c.9 0 1.76.26 2.5.75v6.52c0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8c.63 0 1.25.1 1.83.3V5.45c-2.45-.6-5.02-.27-7.2 1a8 8 0 0 0-4.3 7 8 8 0 0 0 8 8c4.4 0 8-3.6 8-8V4.75c1.8.8 3.8 1.25 5.8 1.25V2c-2.67 0-5.1-.88-7-2.38v.4z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-xs uppercase tracking-wider">Products</h4>
          <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
            <li><Link href="/signup" className="hover:text-primary transition-colors">Browse Products</Link></li>
            <li><Link href="/signup" className="hover:text-primary transition-colors">Affiliate Program</Link></li>
            <li><Link href="/signup" className="hover:text-primary transition-colors">Free Assets</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-xs uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Licensing</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-on-surface font-bold text-xs uppercase tracking-wider">Stay Updated</h4>
          <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
            Subscribe to get the latest assets and tools in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-surface-container-high border border-outline-variant rounded-lg px-3 py-2 text-xs md:text-sm flex-1 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-on-surface-variant/40 outline-none w-full"
            />
            <button type="submit" className="bg-primary text-on-primary p-2 px-4 rounded-lg flex items-center justify-center hover:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-8 pt-12 mt-12 border-t border-white/5 text-center">
        <p className="text-on-surface-variant text-xs md:text-sm">© 2026 103 Dev. High-performance developer assets.</p>
      </div>
    </footer>
  );
}
