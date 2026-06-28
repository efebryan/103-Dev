"use client";

import { useState, useMemo } from "react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  priceValue: number;
  status: "Published" | "Draft" | "Archived";
  downloads: number;
  rating: number;
  version: string;
  stockStatus: "In Stock" | "Out of Stock" | "Pre-order";
  publishedDate: string;
  thumbnailGradient: string;
}

export default function AdminProductManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date"); // date, price, downloads
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<Product | null>(null);

  const initialProducts: Product[] = [
    { id: "PRD-101", title: "Horizon AI SaaS Boilerplate", category: "Templates", price: "$199.00", priceValue: 199, status: "Published", downloads: 412, rating: 5, version: "v2.2.4", stockStatus: "In Stock", publishedDate: "June 12, 2026", thumbnailGradient: "from-blue-600 to-indigo-900" },
    { id: "PRD-102", title: "Nexus Admin Dashboard Layout", category: "Components", price: "$49.00", priceValue: 49, status: "Published", downloads: 882, rating: 5, version: "v4.0.0", stockStatus: "In Stock", publishedDate: "May 20, 2026", thumbnailGradient: "from-purple-600 to-pink-900" },
    { id: "PRD-103", title: "Rust High-Performance Web Server", category: "Backend", price: "$129.00", priceValue: 129, status: "Published", downloads: 254, rating: 4, version: "v1.0.2", stockStatus: "In Stock", publishedDate: "June 01, 2026", thumbnailGradient: "from-emerald-600 to-teal-900" },
    { id: "PRD-104", title: "Cyberpunk Tailwind UI Suite", category: "Components", price: "$79.00", priceValue: 79, status: "Draft", downloads: 0, rating: 0, version: "v0.9.0", stockStatus: "Pre-order", publishedDate: "Pending", thumbnailGradient: "from-rose-600 to-amber-900" },
    { id: "PRD-105", title: "AI Chatbot API Gateway Manager", category: "Backend", price: "$149.00", priceValue: 149, status: "Archived", downloads: 104, rating: 4, version: "v1.1.0", stockStatus: "Out of Stock", publishedDate: "Jan 10, 2026", thumbnailGradient: "from-cyan-600 to-blue-900" }
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Sorting and filtering logic
  const processedProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "all" || p.category.toLowerCase() === filterCategory;
        const matchesStatus = filterStatus === "all" || p.status.toLowerCase() === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "price") return b.priceValue - a.priceValue;
        if (sortBy === "downloads") return b.downloads - a.downloads;
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      });
  }, [products, searchQuery, filterCategory, filterStatus, sortBy]);

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.length === processedProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(processedProducts.map((p) => p.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedProductIds.length === 0) return alert("Select at least one product to perform bulk action.");
    if (action === "delete") {
      setProducts(prev => prev.filter(p => !selectedProductIds.includes(p.id)));
      alert(`Successfully deleted ${selectedProductIds.length} products.`);
    } else {
      alert(`Bulk action "${action}" completed for ${selectedProductIds.length} products.`);
    }
    setSelectedProductIds([]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    alert(`Product ${id} deleted.`);
  };

  const handleDuplicateProduct = (product: Product) => {
    const duplicate: Product = {
      ...product,
      id: `PRD-${Math.floor(200 + Math.random() * 800)}`,
      title: `${product.title} (Copy)`,
      downloads: 0,
      rating: 0
    };
    setProducts(prev => [duplicate, ...prev]);
    alert(`Duplicated ${product.title} to new ID ${duplicate.id}`);
  };

  const handleArchiveProduct = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: "Archived" } : p));
    alert(`Product ${id} archived.`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Product Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">Add templates, customize catalog details, adjust prices, and manage active software code bases.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setViewMode(prev => prev === "grid" ? "table" : "grid")}
            className="bg-surface-container-high border border-outline-variant p-2.5 rounded-xl text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface flex items-center justify-center cursor-pointer"
            title="Toggle View Mode"
          >
            <span className="material-symbols-outlined text-[18px]">
              {viewMode === "grid" ? "view_list" : "grid_view"}
            </span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-on-primary px-4 py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add_box</span>
            New Product
          </button>
        </div>
      </div>

      {/* Bulk actions and search tool bar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
        {/* Left: Filters and sorting */}
        <div className="flex flex-wrap gap-3 items-center">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            <option value="templates">Templates</option>
            <option value="components">Components</option>
            <option value="backend">Backend</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>

        {/* Right: Search and bulk operations */}
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-stretch sm:items-center">
          {selectedProductIds.length > 0 && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleBulkAction("duplicate")}
                className="bg-surface-container-high border border-outline-variant px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-bright cursor-pointer"
              >
                Bulk Duplicate
              </button>
              <button 
                onClick={() => handleBulkAction("archive")}
                className="bg-surface-container-high border border-outline-variant px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-bright cursor-pointer"
              >
                Bulk Archive
              </button>
              <button 
                onClick={() => handleBulkAction("delete")}
                className="bg-error/10 text-error border border-error/20 px-3 py-2 rounded-xl text-xs hover:bg-error/20 cursor-pointer"
              >
                Bulk Delete
              </button>
            </div>
          )}

          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full sm:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
            <input
              type="text"
              placeholder="Search by title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>
      </div>

      {/* Grid View rendering */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedProducts.map((p) => (
            <div key={p.id} className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Thumbnail gradient preview */}
                <div className={`h-36 bg-gradient-to-br ${p.thumbnailGradient} flex items-center justify-center relative p-4 text-center`}>
                  <span className="font-black text-white text-base drop-shadow-md select-none">{p.title}</span>
                  <div className="absolute top-3 left-3 bg-[#010f1f]/80 text-[10px] text-primary font-bold px-2 py-0.5 rounded-full border border-primary/20">{p.id}</div>
                  <input 
                    type="checkbox"
                    checked={selectedProductIds.includes(p.id)}
                    onChange={() => toggleSelectProduct(p.id)}
                    className="absolute top-3 right-3 w-4.5 h-4.5 rounded border-white/20 bg-transparent text-primary focus:ring-0 cursor-pointer"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[10px] uppercase font-bold text-outline tracking-wider">{p.category}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                      p.status === "Published" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                      p.status === "Draft" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                      "bg-white/10 text-outline border-white/15"
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-on-surface line-clamp-1">{p.title}</h3>

                  <div className="grid grid-cols-2 gap-y-2 text-[11px] text-on-surface-variant border-t border-white/5 pt-3">
                    <div>
                      <span className="text-outline">Downloads: </span>
                      <span className="font-bold text-on-surface">{p.downloads}</span>
                    </div>
                    <div>
                      <span className="text-outline">Version: </span>
                      <span className="font-mono text-primary font-semibold">{p.version}</span>
                    </div>
                    <div>
                      <span className="text-outline">Rating: </span>
                      <span className="text-amber-400 font-bold">★ {p.rating || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-outline">Stock: </span>
                      <span className={`font-semibold ${p.stockStatus === "In Stock" ? "text-primary" : "text-amber-400"}`}>{p.stockStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-white/5 bg-white/1.5 flex justify-between items-center">
                <span className="text-sm font-black text-on-surface">{p.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => setActiveTab(p)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-primary transition-colors cursor-pointer inline-flex items-center justify-center" title="View details"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                  <button onClick={() => handleDuplicateProduct(p)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-primary transition-colors cursor-pointer inline-flex items-center justify-center" title="Duplicate product"><span className="material-symbols-outlined text-[16px]">content_copy</span></button>
                  <button onClick={() => handleArchiveProduct(p.id)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-primary transition-colors cursor-pointer inline-flex items-center justify-center" title="Archive product"><span className="material-symbols-outlined text-[16px]">archive</span></button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-error transition-colors cursor-pointer inline-flex items-center justify-center" title="Delete product"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View rendering */
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6 w-10 text-center">
                    <input 
                      type="checkbox"
                      checked={selectedProductIds.length === processedProducts.length && processedProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4.5 h-4.5 rounded border-white/20 bg-transparent text-primary focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-6">ID & Thumbnail</th>
                  <th className="py-4 px-6">Product Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6 text-right">Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Downloads</th>
                  <th className="py-4 px-6">Version</th>
                  <th className="py-4 px-6">Stock Status</th>
                  <th className="py-4 px-6">Published Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {processedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6 text-center w-10">
                      <input 
                        type="checkbox"
                        checked={selectedProductIds.includes(p.id)}
                        onChange={() => toggleSelectProduct(p.id)}
                        className="w-4.5 h-4.5 rounded border-white/20 bg-transparent text-primary focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-9 rounded bg-gradient-to-br ${p.thumbnailGradient} border border-white/10 shrink-0`} />
                        <span className="font-mono font-medium text-primary">{p.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold">{p.title}</td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{p.category}</td>
                    <td className="py-4 px-6 text-right font-black text-on-surface">{p.price}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        p.status === "Published" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                        p.status === "Draft" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                        "bg-white/10 text-outline border-white/15"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-on-surface">{p.downloads}</td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-primary">{p.version}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        p.stockStatus === "In Stock" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                        p.stockStatus === "Pre-order" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                        "bg-rose-400/10 text-rose-400 border-rose-400/20"
                      }`}>
                        {p.stockStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{p.publishedDate}</td>
                    <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                      <button onClick={() => setActiveTab(p)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">View</button>
                      <button onClick={() => alert(`Opening product editor dialog for ${p.id}`)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">Edit</button>
                      <button onClick={() => handleDuplicateProduct(p)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">Duplicate</button>
                      <button onClick={() => handleArchiveProduct(p.id)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">Archive</button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="text-error hover:underline font-semibold cursor-pointer text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
                {processedProducts.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-on-surface-variant font-medium">
                      No products registered matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details View Modal */}
      {activeTab && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div>
              <h3 className="text-lg font-bold text-on-surface">{activeTab.title}</h3>
              <p className="text-[10px] text-on-surface-variant font-mono mt-1">Product ID: {activeTab.id}</p>
            </div>

            <div className={`h-24 bg-gradient-to-br ${activeTab.thumbnailGradient} rounded-xl border border-white/10`} />

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-outline">Category</p>
                <p className="font-semibold text-on-surface mt-0.5">{activeTab.category}</p>
              </div>
              <div>
                <p className="text-outline">Price Setup</p>
                <p className="font-bold text-primary mt-0.5">{activeTab.price}</p>
              </div>
              <div>
                <p className="text-outline">Status</p>
                <p className="font-semibold text-on-surface mt-0.5">{activeTab.status}</p>
              </div>
              <div>
                <p className="text-outline">Version</p>
                <p className="font-mono text-on-surface mt-0.5">{activeTab.version}</p>
              </div>
              <div>
                <p className="text-outline">Total Downloads</p>
                <p className="font-semibold text-on-surface mt-0.5">{activeTab.downloads}</p>
              </div>
              <div>
                <p className="text-outline">Published Date</p>
                <p className="font-semibold text-on-surface mt-0.5">{activeTab.publishedDate}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end text-xs pt-4 border-t border-white/5">
              <button
                onClick={() => setActiveTab(null)}
                className="bg-primary text-on-primary hover:brightness-110 px-5 py-2 rounded-xl font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div>
              <h3 className="text-lg font-bold text-on-surface">Publish New Marketplace Product</h3>
              <p className="text-[10px] text-on-surface-variant mt-1">Provide metadata and pricing terms to register the software bundle.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Product Title</label>
                  <input type="text" placeholder="e.g. Next.js SaaS Starter" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Price (USD)</label>
                  <input type="text" placeholder="e.g. $99.00" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Category</label>
                  <select className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Templates</option>
                    <option>Components</option>
                    <option>Backend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Stock Status</label>
                  <select className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>In Stock</option>
                    <option>Pre-order</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end text-xs pt-4 border-t border-white/5">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-white/5 hover:bg-white/10 text-on-surface px-4 py-2 rounded-xl font-semibold border border-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Product successfully added!");
                  setShowAddModal(false);
                }}
                className="bg-primary text-on-primary hover:brightness-110 px-4 py-2 rounded-xl font-semibold cursor-pointer"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
