"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [stripeLive, setStripeLive] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Platform Settings</h1>
        <p className="text-on-surface-variant text-sm mt-1">Configure global marketplace attributes, Stripe credentials, and system maintenance triggers.</p>
      </div>

      {/* Global Config Settings */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 space-y-6">
        <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">Global Platform Attributes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-outline font-semibold mb-1">Marketplace Name</label>
            <input type="text" defaultValue="103 Dev" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface" />
          </div>
          <div>
            <label className="block text-outline font-semibold mb-1">Support Email Address</label>
            <input type="email" defaultValue="support@103.dev" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface" />
          </div>
          <div>
            <label className="block text-outline font-semibold mb-1">Partner Commission Fee (%)</label>
            <input type="number" defaultValue="10" className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface" />
          </div>
          <div>
            <label className="block text-outline font-semibold mb-1">Platform Inbound CLI Hook Secret</label>
            <input type="password" value="103dev_secret_cli_99228811" readOnly className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface font-mono select-all" />
          </div>
        </div>
      </div>

      {/* Stripe Payment Gateway Config */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <h3 className="text-base font-bold text-on-surface">Stripe Payment Gateway</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium">Stripe Live Mode</span>
            <button 
              onClick={() => setStripeLive(!stripeLive)}
              className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${stripeLive ? "bg-primary" : "bg-white/10"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-on-primary transition-transform ${stripeLive ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 text-xs">
          <div>
            <label className="block text-outline font-semibold mb-1">Stripe Publishable Key</label>
            <input type="text" placeholder={stripeLive ? "pk_live_..." : "pk_test_..."} className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface font-mono" />
          </div>
          <div>
            <label className="block text-outline font-semibold mb-1">Stripe Secret API Key</label>
            <input type="password" placeholder={stripeLive ? "sk_live_..." : "sk_test_..."} className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl text-on-surface font-mono" />
          </div>
        </div>
      </div>

      {/* System Maintenance Controls */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 space-y-6">
        <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">System Maintenance Controls</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-on-surface">Enable System Maintenance Mode</p>
              <p className="text-[10px] text-on-surface-variant">Toggling puts the entire console into offline read-only state for end users.</p>
            </div>
            <button 
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${maintenanceMode ? "bg-error" : "bg-white/10"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-on-primary transition-transform ${maintenanceMode ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button 
          onClick={() => alert("Platform settings configured and applied successfully.")}
          className="bg-primary text-on-primary px-5 py-3 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
