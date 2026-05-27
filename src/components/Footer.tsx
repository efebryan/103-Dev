"use client";

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
          <a href="#" className="text-xl font-bold text-on-surface">103 Dev</a>
          <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
            The premier marketplace for elite developer assets. High-performance, production-ready, and developer-approved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">code</span>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-xs uppercase tracking-wider">Products</h4>
          <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">Browse Products</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Become a Seller</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Affiliate Program</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Free Assets</a></li>
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
