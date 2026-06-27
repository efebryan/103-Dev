"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: "Bryan",
    email: "bryan@103.dev",
    github: "github.com/bryan-103",
    role: "Developer / Pro License User",
  });

  const apiKeys = [
    { name: "Production CLI key", key: "103_cli_prod_ak_90221_55x", status: "Active", created: "June 25, 2026" },
    { name: "Local testing env key", key: "103_cli_test_ak_11204_22a", status: "Active", created: "June 12, 2026" },
  ];

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile configurations saved successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Console Configurations</h1>
        <p className="text-on-surface-variant text-sm mt-1">Configure profile details, manage developer CLI tokens, and manage payment setups.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6">
        {["profile", "api keys", "billing"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-semibold capitalize relative cursor-pointer ${
              activeTab === tab ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeSettingsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "profile" && (
          <div className="glass-card rounded-2xl p-6 border border-white/5 max-w-2xl">
            <h3 className="text-base font-bold text-on-surface mb-4">Account Profile Settings</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Display Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Contact Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">GitHub Handle</label>
                <input
                  type="text"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                />
              </div>

              <button type="submit" className="bg-primary text-on-primary py-2.5 px-6 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                Save Configurations
              </button>
            </form>
          </div>
        )}

        {activeTab === "api keys" && (
          <div className="space-y-6 max-w-3xl">
            <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-on-surface">Developer CLI API Keys</h3>
                <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                  Generate New Key
                </button>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Use these API keys to authenticate with the 103 Dev CLI command-line utility for downloading templates directly via your local terminal.
              </p>
            </div>

            <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                    <th className="py-4 px-6">Key Label</th>
                    <th className="py-4 px-6">API Key Value</th>
                    <th className="py-4 px-6">Created Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-on-surface">
                  {apiKeys.map((k) => (
                    <tr key={k.key} className="hover:bg-surface-container-high/20 transition-colors">
                      <td className="py-4 px-6 font-semibold">{k.name}</td>
                      <td className="py-4 px-6 font-mono text-outline flex items-center gap-2">
                        <code>{k.key}</code>
                        <button
                          onClick={() => handleCopy(k.key)}
                          className="p-1 rounded text-primary hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {copiedKey === k.key ? "check" : "content_copy"}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant">{k.created}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border bg-primary/10 text-primary border-primary/20">
                          {k.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-error hover:underline text-xs font-semibold cursor-pointer">
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="glass-card rounded-2xl p-6 border border-white/5 max-w-2xl space-y-6">
            <h3 className="text-base font-bold text-on-surface">Subscription Settings</h3>
            <div className="p-4 rounded-xl bg-primary-container/20 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-primary tracking-wide">ACTIVE SUBSCRIPTION</p>
                <p className="text-lg font-bold text-on-surface mt-1">103 Dev Commercial Pro Plan</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Renews automatically on July 25, 2026 ($199.00/month)</p>
              </div>
              <button className="bg-primary text-on-primary py-2 px-4 rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                Manage Billing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
