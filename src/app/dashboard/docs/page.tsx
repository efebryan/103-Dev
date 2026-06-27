"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DashboardDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scripts = [
    {
      title: "CLI: Authenticate session",
      desc: "Connect your local terminal session to your 103 Dev dashboard profile using your API key.",
      code: "npx 103dev-cli auth login --key <your-api-key>",
      id: "cli-auth",
    },
    {
      title: "CLI: Pull codebase asset",
      desc: "Pull down your purchased templates directly into your working directory.",
      code: "npx 103dev-cli pull --asset horizon-ai-saas",
      id: "cli-pull",
    },
    {
      title: "Local development server",
      desc: "Spin up the turbopack compiler with hot module reloading.",
      code: "npm run dev",
      id: "dev-run",
    },
    {
      title: "Production build check",
      desc: "Create an optimized production build of your application layout.",
      code: "npm run build",
      id: "build-run",
    },
    {
      title: "Database schema migration",
      desc: "Sync database schemas and apply prisma/supabase relational migrations.",
      code: "npx prisma db push",
      id: "db-sync",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Engineering Scripts & CLI Docs</h1>
        <p className="text-on-surface-variant text-sm mt-1">Copy and run essential commands to integrate, download, and configure your local development workspace.</p>
      </div>

      {/* CLI Quickstart Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 bg-primary/5 space-y-4">
        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">terminal</span>
          CLI Integration Workflow
        </h2>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          The 103 Dev CLI tool lets you download, pull updates, and manage activation domains directly from your command line. Configure your API key in your console settings to get started.
        </p>
      </div>

      {/* Scripts Guide List */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-on-surface border-b border-white/5 pb-2">Common Scripts Reference</h3>

        <div className="space-y-6">
          {scripts.map((script, idx) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-6 border border-white/5 space-y-3"
            >
              <div>
                <h4 className="text-sm font-bold text-on-surface">{script.title}</h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{script.desc}</p>
              </div>

              <div className="flex items-center justify-between gap-4 p-3 bg-[#010f1f] rounded-xl border border-white/5 font-mono text-xs text-on-surface-variant">
                <code>{script.code}</code>
                <button
                  onClick={() => handleCopy(script.id, script.code)}
                  className="p-1.5 rounded text-primary hover:bg-white/5 transition-colors cursor-pointer"
                  title="Copy Command"
                >
                  <span className="material-symbols-outlined text-base">
                    {copiedId === script.id ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
