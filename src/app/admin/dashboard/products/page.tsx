"use client";

import { useState } from "react";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const products = [
    { id: "PRD-101", title: "Horizon AI SaaS Boilerplate", category: "Templates", price: "$199.00", sales: 412, version: "v2.2.4" },
    { id: "PRD-102", title: "Nexus Admin Dashboard", category: "Components", price: "$49.00", sales: 882, version: "v4.0.0" },
    { id: "PRD-103", title: "Rust High-Performance Web Server", category: "Backend", price: "$129.00", sales: 254, version: "v1.0.2" },
  ];

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Platform Products</h1>
          <p className="text-on-surface-variant text-sm mt-1">Review active marketplace templates, pricing setups, and coordinate code versions updates.</p>
        </div>
        <div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add_box</span>
            Add New Product
          </button>
        </div>
      </div>

      {/* Add New Product Dialog Mockup */}
      {showAddForm && (
        <div className="glass-card p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
          <h3 className="text-sm font-bold text-on-surface flex items-center justify-between">
            <span>Register New Marketplace Product</span>
            <button onClick={() => setShowAddForm(false)} className="text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-outline font-semibold mb-1">Product Title</label>
              <input type="text" placeholder="e.g. Next.js SaaS Kit" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface" />
            </div>
            <div>
              <label className="block text-outline font-semibold mb-1">Price (USD)</label>
              <input type="text" placeholder="e.g. $99.00" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface" />
            </div>
            <div>
              <label className="block text-outline font-semibold mb-1">Category</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface">
                <option>Templates</option>
                <option>Components</option>
                <option>Backend</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => {
              alert("New marketplace product queued for validation review!");
              setShowAddForm(false);
            }}
            className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-115 cursor-pointer"
          >
            Publish Product
          </button>
        </div>
      )}

      {/* Search */}
      <div className="flex justify-end">
        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      {/* Products List */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">Product ID</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Version</th>
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-center">Purchases</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary">{p.id}</td>
                  <td className="py-4 px-6 font-bold">{p.title}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{p.category}</td>
                  <td className="py-4 px-6 font-mono text-xs">{p.version}</td>
                  <td className="py-4 px-6 text-right font-extrabold text-on-surface">{p.price}</td>
                  <td className="py-4 px-6 text-center font-bold text-primary">{p.sales}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => alert(`Modifying details for ${p.title}...`)}
                      className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => alert(`Upgrading code files configuration for version ${p.version}...`)}
                      className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Update Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
