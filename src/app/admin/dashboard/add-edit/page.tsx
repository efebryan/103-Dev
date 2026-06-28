"use client";

import { useState } from "react";

export default function AddEditProductPage() {
  const [isFeatured, setIsFeatured] = useState(false);
  const [visibility, setVisibility] = useState("Draft");
  const [licenseOption, setLicenseOption] = useState("Single Site");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Product saved successfully! All fields validated.");
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-16 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Add / Edit Product</h1>
          <p className="text-on-surface-variant text-sm mt-1">Design, configure pricing structures, upload software bundles, and publish marketplace assets.</p>
        </div>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={() => alert("Changes discarded.")}
            className="bg-surface-container-high border border-outline-variant px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer"
          >
            Discard
          </button>
          <button 
            type="submit"
            className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Editor Inputs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="material-symbols-outlined text-primary text-base">info</span>
              Basic Information
            </h3>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Product Title</label>
                  <input type="text" placeholder="e.g. Horizon AI SaaS Boilerplate" required className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Slug</label>
                  <input type="text" placeholder="e.g. horizon-ai-saas-boilerplate" required className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Short Description</label>
                <input type="text" placeholder="A brief one-liner summary of the product..." required className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Full Description</label>
                <textarea rows={6} placeholder="Describe the template's technical details, features, structure..." required className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="material-symbols-outlined text-primary text-base">terminal</span>
              Technical Specifications
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Key Features</label>
                <input type="text" placeholder="e.g. Next.js 16, Tailwind CSS, Stripe integration (comma separated)" className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Prerequisites & Requirements</label>
                  <textarea rows={3} placeholder="Node.js 18+, Docker runtime, PostgreSQL database..." className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Installation Guide</label>
                  <textarea rows={3} placeholder="1. npm install\n2. configure .env\n3. npm run dev" className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Online Documentation URL</label>
                <input type="url" placeholder="https://docs.103.dev/products/..." className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Section 3: File Bundles */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="material-symbols-outlined text-primary text-base">upload_file</span>
              Files Upload
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="border border-dashed border-white/10 rounded-2xl p-4 text-center hover:border-primary/40 transition-colors">
                <span className="material-symbols-outlined text-outline text-[24px] mb-1">archive</span>
                <p className="font-bold">Main ZIP File</p>
                <p className="text-[9px] text-outline mt-0.5">Application bundle archive</p>
                <input type="file" className="hidden" id="zipFile" />
                <label htmlFor="zipFile" className="mt-3 inline-block bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 font-semibold cursor-pointer">Choose File</label>
              </div>

              <div className="border border-dashed border-white/10 rounded-2xl p-4 text-center hover:border-primary/40 transition-colors">
                <span className="material-symbols-outlined text-outline text-[24px] mb-1">description</span>
                <p className="font-bold">Documentation</p>
                <p className="text-[9px] text-outline mt-0.5">PDF or Markdown guides</p>
                <input type="file" className="hidden" id="docFile" />
                <label htmlFor="docFile" className="mt-3 inline-block bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 font-semibold cursor-pointer">Choose File</label>
              </div>

              <div className="border border-dashed border-white/10 rounded-2xl p-4 text-center hover:border-primary/40 transition-colors">
                <span className="material-symbols-outlined text-outline text-[24px] mb-1">attachment</span>
                <p className="font-bold">Demo Files</p>
                <p className="text-[9px] text-outline mt-0.5">Sample assets or mock databases</p>
                <input type="file" className="hidden" id="demoFile" />
                <label htmlFor="demoFile" className="mt-3 inline-block bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 font-semibold cursor-pointer">Choose File</label>
              </div>
            </div>
          </div>

          {/* Section 4: Product Media */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="material-symbols-outlined text-primary text-base">image</span>
              Images & Gallery
            </h3>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Product Main Image URL</label>
                  <input type="url" placeholder="https://103.dev/images/..." className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-outline font-semibold mb-1">Video Teaser URL</label>
                  <input type="url" placeholder="YouTube/Vimeo embed link" className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Gallery Images (space-separated URLs)</label>
                <textarea rows={3} placeholder="https://103.dev/images/screenshot1.png https://103.dev/images/screenshot2.png" className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Configurations Sidebar */}
        <div className="space-y-8">
          
          {/* Section 5: Pricing */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">Pricing Setup</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Regular Price (USD)</label>
                <input type="text" placeholder="e.g. $199.00" required className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Sale Price (USD)</label>
                <input type="text" placeholder="e.g. $149.00" className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">License Options</label>
                <select 
                  value={licenseOption} 
                  onChange={(e) => setLicenseOption(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Single Site</option>
                  <option>Unlimited Sites</option>
                  <option>Extended Developer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 6: Classification */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">Classification</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Product Category</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Templates</option>
                  <option>Components</option>
                  <option>Backend</option>
                </select>
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Tags (space-separated)</label>
                <input type="text" placeholder="react tailwind rust database" className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Section 7: Versioning */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">Version Information</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Current Version</label>
                <input type="text" placeholder="e.g. v1.0.0" required className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Release Notes</label>
                <textarea rows={3} placeholder="Initial launch features..." className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Section 8: Visibility & Promotion */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">Visibility & Status</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Publishing Status</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {["Draft", "Published", "Scheduled"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setVisibility(mode)}
                      className={`py-2 rounded-xl font-bold cursor-pointer text-center border transition-all ${
                        visibility === mode 
                          ? "bg-primary text-on-primary border-primary" 
                          : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-2">
                <div>
                  <p className="font-bold text-on-surface">Featured Product</p>
                  <p className="text-[9px] text-on-surface-variant">Promote at the top of the homepage grid.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${isFeatured ? "bg-primary" : "bg-white/10"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-on-primary transition-transform ${isFeatured ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Section 9: SEO Settings */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">SEO Configurations</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Meta Title</label>
                <input type="text" placeholder="Google index title tag..." className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Meta Description</label>
                <textarea rows={3} placeholder="Google description snippet..." className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </form>
  );
}
