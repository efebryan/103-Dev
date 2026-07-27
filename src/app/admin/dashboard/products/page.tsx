"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminProductManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<any | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add product form state
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Templates");
  const [newStockStatus, setNewStockStatus] = useState("in_stock");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  };

  const processedProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
        const matchCategory = filterCategory === "all" || (p.category ?? "").toLowerCase() === filterCategory.toLowerCase();
        const matchStatus = filterStatus === "all" || (p.status ?? "published") === filterStatus;
        return matchSearch && matchCategory && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === "price") return (b.price ?? 0) - (a.price ?? 0);
        if (sortBy === "downloads") return (b.download_count ?? 0) - (a.download_count ?? 0);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [products, searchQuery, filterCategory, filterStatus, sortBy]);

  const toggleSelectProduct = (id: string) =>
    setSelectedProductIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const toggleSelectAll = () =>
    setSelectedProductIds(selectedProductIds.length === processedProducts.length ? [] : processedProducts.map(p => p.id));

  const handleDeleteProduct = async (id: string) => {
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleArchiveProduct = async (id: string) => {
    const supabase = createClient();
    await supabase.from("products").update({ status: "archived" }).eq("id", id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: "archived" } : p));
  };

  const handleBulkAction = async (action: string) => {
    if (selectedProductIds.length === 0) return alert("Select at least one product.");
    const supabase = createClient();
    if (action === "delete") {
      await supabase.from("products").delete().in("id", selectedProductIds);
      setProducts(prev => prev.filter(p => !selectedProductIds.includes(p.id)));
    } else if (action === "archive") {
      await supabase.from("products").update({ status: "archived" }).in("id", selectedProductIds);
      setProducts(prev => prev.map(p => selectedProductIds.includes(p.id) ? { ...p, status: "archived" } : p));
    }
    setSelectedProductIds([]);
  };

  const handleAddProduct = async () => {
    if (!newTitle.trim() || !newPrice) return;
    setSaving(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .insert({ title: newTitle, price: parseFloat(newPrice), category: newCategory, stock_status: newStockStatus, status: "draft", version: "v1.0.0" })
      .select()
      .single();
    if (data) setProducts(prev => [data, ...prev]);
    setNewTitle(""); setNewPrice(""); setSaving(false); setShowAddModal(false);
  };

  const statusBadge: Record<string, string> = {
    published: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    draft: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    archived: "bg-white/10 text-outline border-white/15",
  };

  const fmt = (d: string) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
  const fmtAmt = (n: number) => `₦${Number(n ?? 0).toFixed(2)}`;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Product Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">Add templates, customize catalog details, adjust prices, and manage active software code bases.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setViewMode(prev => prev === "grid" ? "table" : "grid")}
            className="bg-surface-container-high border border-outline-variant p-2.5 rounded-xl hover:bg-surface-bright transition-colors text-on-surface flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">{viewMode === "grid" ? "view_list" : "grid_view"}</span>
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="bg-primary text-on-primary px-4 py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">add_box</span>
            New Product
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
        <div className="flex flex-wrap gap-3 items-center">
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="all">All Categories</option>
            <option value="Templates">Templates</option>
            <option value="Components">Components</option>
            <option value="Backend">Backend</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-stretch sm:items-center">
          {selectedProductIds.length > 0 && (
            <div className="flex gap-2">
              <button onClick={() => handleBulkAction("archive")} className="bg-surface-container-high border border-outline-variant px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-bright cursor-pointer">Bulk Archive</button>
              <button onClick={() => handleBulkAction("delete")} className="bg-error/10 text-error border border-error/20 px-3 py-2 rounded-xl text-xs hover:bg-error/20 cursor-pointer">Bulk Delete</button>
            </div>
          )}
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full sm:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
            <input type="text" placeholder="Search by title or ID..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass-card rounded-2xl border border-white/5 p-16 text-center text-on-surface-variant text-xs">Loading products…</div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedProducts.map((p) => (
            <div key={p.id} className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-36 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center relative p-4 text-center overflow-hidden">
                  {p.thumbnail_url
                    ? <img src={p.thumbnail_url} className="w-full h-full object-cover absolute inset-0" alt={p.title} />
                    : <span className="font-black text-white text-base drop-shadow-md select-none relative z-10">{p.title}</span>
                  }
                  <div className="absolute top-3 left-3 bg-[#010f1f]/80 text-[10px] text-primary font-bold px-2 py-0.5 rounded-full border border-primary/20 z-10">{p.id.slice(0,8)}</div>
                  <input type="checkbox" checked={selectedProductIds.includes(p.id)} onChange={() => toggleSelectProduct(p.id)}
                    className="absolute top-3 right-3 w-4 h-4 rounded border-white/20 bg-transparent text-primary focus:ring-0 cursor-pointer z-10" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[10px] uppercase font-bold text-outline tracking-wider">{p.category ?? "—"}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border ${statusBadge[p.status ?? "published"] ?? statusBadge.published}`}>{p.status ?? "published"}</span>
                  </div>
                  <h3 className="text-sm font-bold text-on-surface line-clamp-1">{p.title}</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-[11px] text-on-surface-variant border-t border-white/5 pt-3">
                    <div><span className="text-outline">Downloads: </span><span className="font-bold text-on-surface">{p.download_count ?? 0}</span></div>
                    <div><span className="text-outline">Version: </span><span className="font-mono text-primary font-semibold">{p.version ?? "—"}</span></div>
                    <div className="col-span-2"><span className="text-outline">Rating: </span><span className="text-amber-400 font-bold">★ {p.rating_avg ? Number(p.rating_avg).toFixed(1) : "N/A"}</span></div>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-white/5 bg-white/1.5 flex justify-between items-center">
                <span className="text-sm font-black text-on-surface">{fmtAmt(p.price)}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleArchiveProduct(p.id)} className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-on-surface-variant cursor-pointer" title="Archive">
                    <span className="material-symbols-outlined text-[16px]">archive</span>
                  </button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 rounded bg-error/10 hover:bg-error/20 text-error cursor-pointer" title="Delete">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {processedProducts.length === 0 && (
            <div className="col-span-full py-16 text-center text-on-surface-variant text-xs">No products found.</div>
          )}
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6 w-10 text-center">
                    <input type="checkbox" checked={selectedProductIds.length === processedProducts.length && processedProducts.length > 0} onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-white/20 bg-transparent text-primary focus:ring-0 cursor-pointer" />
                  </th>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6 text-right">Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Downloads</th>
                  <th className="py-4 px-6">Version</th>
                  <th className="py-4 px-6">Created</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {processedProducts.map(p => (
                  <tr key={p.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6 text-center">
                      <input type="checkbox" checked={selectedProductIds.includes(p.id)} onChange={() => toggleSelectProduct(p.id)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-primary focus:ring-0 cursor-pointer" />
                    </td>
                    <td className="py-4 px-6 font-bold">{p.title}</td>
                    <td className="py-4 px-6 text-on-surface-variant">{p.category ?? "—"}</td>
                    <td className="py-4 px-6 text-right font-black">{fmtAmt(p.price)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadge[p.status ?? "published"] ?? statusBadge.published}`}>
                        {p.status ?? "published"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold">{p.download_count ?? 0}</td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-primary">{p.version ?? "—"}</td>
                    <td className="py-4 px-6 text-on-surface-variant">{fmt(p.created_at)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setActiveTab(p)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-on-surface cursor-pointer" title="View">
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                        </button>
                        <button onClick={() => handleArchiveProduct(p.id)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-on-surface-variant cursor-pointer" title="Archive">
                          <span className="material-symbols-outlined text-[16px]">archive</span>
                        </button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-1 rounded bg-error/10 hover:bg-error/20 text-error cursor-pointer" title="Delete">
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {processedProducts.length === 0 && (
                  <tr><td colSpan={9} className="py-8 text-center text-on-surface-variant font-medium">No products registered.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {activeTab && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div>
              <h3 className="text-lg font-bold text-on-surface">{activeTab.title}</h3>
              <p className="text-[10px] text-on-surface-variant font-mono mt-1">ID: {activeTab.id}</p>
            </div>
            {activeTab.thumbnail_url && (
              <img src={activeTab.thumbnail_url} alt={activeTab.title} className="w-full h-24 object-cover rounded-xl border border-white/10" />
            )}
            <div className="grid grid-cols-2 gap-4 text-xs">
              {[["Category", activeTab.category ?? "—"], ["Price", fmtAmt(activeTab.price)], ["Status", activeTab.status ?? "—"], ["Version", activeTab.version ?? "—"], ["Downloads", activeTab.download_count ?? 0], ["Rating", activeTab.rating_avg ? `★ ${Number(activeTab.rating_avg).toFixed(1)}` : "N/A"]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-outline">{label}</p>
                  <p className="font-semibold text-on-surface mt-0.5">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end text-xs pt-4 border-t border-white/5">
              <button onClick={() => setActiveTab(null)} className="bg-primary text-on-primary hover:brightness-110 px-5 py-2 rounded-xl font-semibold cursor-pointer">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div>
              <h3 className="text-lg font-bold text-on-surface">Publish New Marketplace Product</h3>
              <p className="text-[10px] text-on-surface-variant mt-1">Provide metadata and pricing to register the software bundle.</p>
            </div>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Product Title</label>
                  <input type="text" placeholder="e.g. Next.js SaaS Starter" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Price (USD)</label>
                  <input type="number" placeholder="e.g. 99" value={newPrice} onChange={e => setNewPrice(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Category</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Templates</option>
                    <option>Components</option>
                    <option>Backend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Stock Status</label>
                  <select value={newStockStatus} onChange={e => setNewStockStatus(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="in_stock">In Stock</option>
                    <option value="pre_order">Pre-order</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end text-xs pt-4 border-t border-white/5">
              <button onClick={() => setShowAddModal(false)} className="bg-white/5 hover:bg-white/10 text-on-surface px-4 py-2 rounded-xl font-semibold border border-white/5 cursor-pointer">Cancel</button>
              <button onClick={handleAddProduct} disabled={saving}
                className="bg-primary text-on-primary hover:brightness-110 px-4 py-2 rounded-xl font-semibold cursor-pointer disabled:opacity-60">
                {saving ? "Publishing…" : "Publish Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
