"use client";

import React, { useState, useMemo } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface DocTopic {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  content: React.ReactNode;
}

export default function DocsPage() {
  const [activeTopic, setActiveTopic] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Structured documentation topics
  const DOCS_DATA: DocTopic[] = [
    {
      id: "intro",
      title: "Introduction",
      category: "Getting Started",
      keywords: ["intro", "overview", "marketplace", "welcome", "concept"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Getting Started
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Welcome to <span className="text-primary">103 Dev Docs</span>
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            103 Dev is a premium, curated developer marketplace offering ready-to-deploy boilerplates, dashboards, templates, and high-quality, copy-pasteable UI components. We focus on visual excellence, performance, and developer efficiency.
          </p>

          <div className="glass-card rounded-2xl p-6 border border-white/5 bg-surface-container/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              Our Core Philosophy
            </h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              We believe developer tools shouldn't just be functional—they should be beautiful, fluid, and delightful. Every asset in our catalog undergoes rigorous design review and is performance-optimized out of the box.
            </p>
          </div>

          <h2 className="text-xl font-bold text-on-surface mt-8 pt-4 border-t border-white/5">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-container/60 border border-white/5 hover:border-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary mb-2 text-[28px]">dashboard</span>
              <h3 className="font-bold text-sm text-on-surface mb-1">Production-Ready Boilerplates</h3>
              <p className="text-xs text-on-surface-variant/75 leading-relaxed">
                Complete tech stacks configured with authentication, databases, styles, and automated deployment scripts.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-surface-container/60 border border-white/5 hover:border-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary mb-2 text-[28px]">code</span>
              <h3 className="font-bold text-sm text-on-surface mb-1">Copy-Paste UI Components</h3>
              <p className="text-xs text-on-surface-variant/75 leading-relaxed">
                Beautiful responsive modules (buttons, cards, navbars) powered by Tailwind CSS v4 and Framer Motion.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-surface-container/60 border border-white/5 hover:border-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary mb-2 text-[28px]">terminal</span>
              <h3 className="font-bold text-sm text-on-surface mb-1">Developer CLI</h3>
              <p className="text-xs text-on-surface-variant/75 leading-relaxed">
                Pull UI components directly into your local codebase from your terminal with a single command.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-surface-container/60 border border-white/5 hover:border-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary mb-2 text-[28px]">speed</span>
              <h3 className="font-bold text-sm text-on-surface mb-1">Ultra Performance</h3>
              <p className="text-xs text-on-surface-variant/75 leading-relaxed">
                Optimized bundles, zero runtime bloat, SEO friendly structures, and state-of-the-art animations.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "quickstart",
      title: "Quick Start Guide",
      category: "Getting Started",
      keywords: ["start", "setup", "install", "quickstart", "steps", "usage"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Getting Started
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Quick Start Guide
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            Follow this 3-step guide to log in, pull premium components into your local project, and launch your templates in minutes.
          </p>

          {/* Step 1 */}
          <div className="relative pl-10 border-l border-white/10 space-y-3 pb-8">
            <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center font-bold text-xs text-primary shadow-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-on-surface">Create an Account</h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              First, sign up at our platform and generate an access token in your dashboard settings. This token allows your local terminal to communicate with our secure assets registry.
            </p>
            <div className="pt-2">
              <a href="/signup" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                Register on 103 Dev
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-10 border-l border-white/10 space-y-3 pb-8">
            <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center font-bold text-xs text-primary shadow-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-on-surface">Install the CLI and Authenticate</h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              Open your terminal, install the 103 Dev CLI globally, and authenticate using the token you generated in Step 1.
            </p>
            
            {/* Custom Code Block */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-[#080e1d] shadow-inner mt-2">
              <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-surface-container/40">
                <span className="text-[10px] font-mono text-on-surface-variant/60">terminal</span>
                <button
                  onClick={() => handleCopy("quick-cli-install", "npm install -g @103dev/cli\n103dev login")}
                  className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedId === "quick-cli-install" ? "done" : "content_copy"}
                  </span>
                  {copiedId === "quick-cli-install" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-on-surface-variant leading-relaxed text-left overflow-x-auto">
                <span className="text-primary">$</span> npm install -g @103dev/cli<br />
                <span className="text-primary">$</span> 103dev login
              </pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-10 space-y-3 pb-4">
            <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center font-bold text-xs text-primary shadow-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-on-surface">Pull and Integrate Components</h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              Use the command line tool to pull components straight into your working subdirectory. The CLI automatically places files in your target components folder and links dependencies.
            </p>
            
            {/* Custom Code Block */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-[#080e1d] shadow-inner mt-2">
              <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-surface-container/40">
                <span className="text-[10px] font-mono text-on-surface-variant/60">terminal</span>
                <button
                  onClick={() => handleCopy("quick-cli-pull", "103dev pull glass-card --out ./src/components")}
                  className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedId === "quick-cli-pull" ? "done" : "content_copy"}
                  </span>
                  {copiedId === "quick-cli-pull" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-on-surface-variant leading-relaxed text-left overflow-x-auto">
                <span className="text-primary">$</span> 103dev pull glass-card --out ./src/components<br />
                <span className="text-on-surface/50">✔ Component glass-card downloaded successfully</span><br />
                <span className="text-on-surface/50">✔ Framer-motion checked. Matches project requirements</span>
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cli",
      title: "CLI Tools Reference",
      category: "Getting Started",
      keywords: ["cli", "terminal", "command", "login", "pull", "reference", "help"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            Getting Started
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            CLI Tools Reference
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            The `@103dev/cli` package is a developer-friendly command line interface built to manage, pull, update, and integrate marketplace templates and components in seconds.
          </p>

          <h2 className="text-xl font-bold text-on-surface mt-6">Commands Overview</h2>
          
          <div className="space-y-4">
            {/* Command 1 */}
            <div className="p-5 rounded-xl bg-surface-container/40 border border-white/5">
              <h3 className="font-mono text-sm text-primary font-bold mb-1">103dev login</h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Launches a browser page or prompts you for an API token to log in and write configurations locally to `~/.103devrc`.
              </p>
              <div className="bg-[#080e1d] rounded-lg p-3 text-[11px] font-mono text-on-surface-variant/80 border border-white/5">
                $ 103dev login --token &lt;your_auth_token&gt;
              </div>
            </div>

            {/* Command 2 */}
            <div className="p-5 rounded-xl bg-surface-container/40 border border-white/5">
              <h3 className="font-mono text-sm text-primary font-bold mb-1">103dev pull &lt;asset_id&gt;</h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Downloads the source code of a specified component or template boilerplate, matches local paths, and registers tailwind imports.
              </p>
              <div className="bg-[#080e1d] rounded-lg p-3 text-[11px] font-mono text-on-surface-variant/80 border border-white/5">
                $ 103dev pull neon-btn --out ./components/ui --tsx
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2 text-[10px] font-medium text-on-surface-variant/50">
                <span>Options:</span>
                <span className="font-mono bg-surface-container-high px-1.5 py-0.5 rounded">--out (target folder)</span>
                <span className="font-mono bg-surface-container-high px-1.5 py-0.5 rounded">--tsx (TypeScript)</span>
                <span className="font-mono bg-surface-container-high px-1.5 py-0.5 rounded">--css (raw CSS rules)</span>
              </div>
            </div>

            {/* Command 3 */}
            <div className="p-5 rounded-xl bg-surface-container/40 border border-white/5">
              <h3 className="font-mono text-sm text-primary font-bold mb-1">103dev check</h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Scans your project directory to verify if your Tailwind v4 theme, Framer Motion version, and CSS configs are fully compatible.
              </p>
              <div className="bg-[#080e1d] rounded-lg p-3 text-[11px] font-mono text-on-surface-variant/80 border border-white/5">
                $ 103dev check
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "templates",
      title: "Templates Integration",
      category: "Guides",
      keywords: ["templates", "boilerplate", "nextjs", "supabase", "env", "configuration"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            Guides & Customization
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Templates Integration
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            Our premium templates are built using standardized modern stacks: Next.js (App Router), React 19, Tailwind CSS v4, Prisma or Supabase client, and NextAuth/Supabase Auth.
          </p>

          <h2 className="text-xl font-bold text-on-surface mt-6 pt-4 border-t border-white/5">Environment Configuration</h2>
          <p className="text-sm text-on-surface-variant/85 leading-relaxed">
            Copy the `.env.example` in the template root directory to `.env.local` and complete the details for your database and auth endpoints.
          </p>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-[#080e1d] shadow-inner">
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-surface-container/40">
              <span className="text-[10px] font-mono text-on-surface-variant/60">.env.local</span>
              <button
                onClick={() => handleCopy("template-env", "NEXT_PUBLIC_APP_URL=http://localhost:3000\nDATABASE_URL=postgresql://user:pass@host:port/dbname\nNEXTAUTH_SECRET=generate_a_random_32_char_secret_key\nSUPABASE_SERVICE_ROLE_KEY=ey...")}
                className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedId === "template-env" ? "done" : "content_copy"}
                </span>
                {copiedId === "template-env" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-on-surface-variant/90 leading-relaxed text-left overflow-x-auto">
              NEXT_PUBLIC_APP_URL=http://localhost:3000<br />
              DATABASE_URL=postgresql://user:pass@host:port/dbname<br />
              NEXTAUTH_SECRET=generate_a_random_32_char_secret_key<br />
              SUPABASE_SERVICE_ROLE_KEY=ey...
            </pre>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/5 bg-surface-container/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-500 text-[20px]">warning</span>
              Database Migrations
            </h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              Always run database initialization scripts or Prisma migrations BEFORE starting your Next.js development server to prevent runtime connect errors:
            </p>
            <div className="bg-[#080e1d] rounded-lg p-3 text-[11px] font-mono text-on-surface-variant/80 border border-white/5 mt-3">
              $ npx prisma db push --force-reset
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "components",
      title: "Using UI Components",
      category: "Guides",
      keywords: ["components", "ui", "tailwind", "import", "globals.css", "framer-motion"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            Guides & Customization
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Using UI Components
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            Our UI components rely on Tailwind CSS v4's theme systems and Framer Motion for premium micro-animations. Ensure your global styles match our tokens.
          </p>

          <h2 className="text-xl font-bold text-on-surface mt-6">Configure custom theme tokens</h2>
          <p className="text-sm text-on-surface-variant/85 leading-relaxed">
            Add these utility properties to your `globals.css` (Tailwind CSS v4 syntax) to correctly render our signature glassmorphic layers and neon glowing badges:
          </p>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-[#080e1d] shadow-inner">
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-surface-container/40">
              <span className="text-[10px] font-mono text-on-surface-variant/60">globals.css</span>
              <button
                onClick={() => handleCopy("components-css", `@theme {\n  --color-primary: #42e5b0;\n  --color-background: #0d1322;\n  --color-surface-container: #191f2f;\n  --radius-xl: 0.75rem;\n}\n\n.glass-card {\n  background: rgba(17, 24, 39, 0.6);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}`)}
                className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedId === "components-css" ? "done" : "content_copy"}
                </span>
                {copiedId === "components-css" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-on-surface-variant/90 leading-relaxed text-left overflow-x-auto">
              @theme &#123;<br />
              &nbsp;&nbsp;--color-primary: #42e5b0;<br />
              &nbsp;&nbsp;--color-background: #0d1322;<br />
              &nbsp;&nbsp;--color-surface-container: #191f2f;<br />
              &nbsp;&nbsp;--radius-xl: 0.75rem;<br />
              &#125;<br /><br />
              .glass-card &#123;<br />
              &nbsp;&nbsp;background: rgba(17, 24, 39, 0.6);<br />
              &nbsp;&nbsp;backdrop-filter: blur(12px);<br />
              &nbsp;&nbsp;border: 1px solid rgba(255, 255, 255, 0.08);<br />
              &#125;
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: "api-auth",
      title: "API Authentication",
      category: "API Reference",
      keywords: ["api", "authentication", "token", "header", "security", "developer"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">key</span>
            API Reference
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            API Authentication
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            All API endpoints require a bearer authentication token. Pass this token in the `Authorization` header of all requests.
          </p>

          <h2 className="text-xl font-bold text-on-surface mt-6">Headers Schema</h2>
          <p className="text-sm text-on-surface-variant/85 leading-relaxed">
            Specify the `Content-Type` as application/json and supply your access token exactly as shown:
          </p>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-[#080e1d] shadow-inner">
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-surface-container/40">
              <span className="text-[10px] font-mono text-on-surface-variant/60">cURL</span>
              <button
                onClick={() => handleCopy("api-curl", "curl -X GET https://api.103dev.com/v1/products \\\n  -H \"Authorization: Bearer dev_103_token_xxxxxxxx\" \\\n  -H \"Content-Type: application/json\"")}
                className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedId === "api-curl" ? "done" : "content_copy"}
                </span>
                {copiedId === "api-curl" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-on-surface-variant/90 leading-relaxed text-left overflow-x-auto">
              curl -X GET https://api.103dev.com/v1/products \<br />
              &nbsp;&nbsp;-H "Authorization: Bearer dev_103_token_xxxxxxxx" \<br />
              &nbsp;&nbsp;-H "Content-Type: application/json"
            </pre>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/5 bg-surface-container/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-red-600 text-[20px]">security</span>
              Keep tokens private
            </h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              Do not include API tokens directly in your front-end repository or commit them to public version control systems. Always read keys from environment parameters on secure backend systems.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "api-endpoints",
      title: "Products Endpoint",
      category: "API Reference",
      keywords: ["endpoints", "products", "templates", "components", "list", "json"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">api</span>
            API Reference
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Products Endpoint
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            Query our entire products catalog programmatically to list templates, download stats, and retrieve configuration formats.
          </p>

          <h2 className="text-xl font-bold text-on-surface mt-6">GET /v1/products</h2>
          <p className="text-sm text-on-surface-variant/85 leading-relaxed">
            Query parameters:
          </p>
          <ul className="list-disc pl-5 text-xs text-on-surface-variant/85 space-y-2">
            <li><span className="font-mono text-primary font-bold">category</span>: Filter by component types (e.g. `buttons`, `cards`) or templates.</li>
            <li><span className="font-mono text-primary font-bold">limit</span>: Return count limit (default 20, max 100).</li>
          </ul>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-[#080e1d] shadow-inner mt-4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-surface-container/40">
              <span className="text-[10px] font-mono text-on-surface-variant/60">Response Payload (200 OK)</span>
              <button
                onClick={() => handleCopy("api-response", `{\n  "success": true,\n  "data": [\n    {\n      "id": "glass-card",\n      "title": "Glassmorphic Premium Card",\n      "price": 0,\n      "rating": 4.9,\n      "downloads": 1420\n    }\n  ]\n}`)}
                className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedId === "api-response" ? "done" : "content_copy"}
                </span>
                {copiedId === "api-response" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-on-surface-variant/90 leading-relaxed text-left overflow-x-auto max-h-60 overflow-y-auto">
              &#123;<br />
              &nbsp;&nbsp;"success": true,<br />
              &nbsp;&nbsp;"data": [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "glass-card",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"title": "Glassmorphic Premium Card",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": 0,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"rating": 4.9,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"downloads": 1420<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;]<br />
              &#125;
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: "license",
      title: "Licensing Model",
      category: "Resources",
      keywords: ["license", "legal", "usage", "single", "commercial", "terms"],
      content: (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">gavel</span>
            Resources & Rules
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Licensing Model
          </h1>
          <p className="text-base text-on-surface-variant/90 leading-relaxed">
            All code blocks and assets downloaded or copied from 103 Dev are subject to one of three licensing modes.
          </p>

          <h2 className="text-xl font-bold text-on-surface mt-6 pt-4 border-t border-white/5">Permitted Usage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-surface-container/40 border border-white/5">
              <h3 className="font-bold text-sm text-primary mb-2">Single Use License</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Applies to free components. Allowed in 1 commercial or personal project. No code redistributions allowed.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-surface-container/40 border border-white/5">
              <h3 className="font-bold text-sm text-primary mb-2">Developer License</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Applies to standard templates. Allowed for unlimited personal and client projects. Code cannot be resold as templates.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-surface-container/40 border border-white/5">
              <h3 className="font-bold text-sm text-primary mb-2">Agency License</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Allows entire developer teams to collaborate, build products, integrate components, and reuse boilerplates indefinitely.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Grouped menu categories
  const MENU_CATEGORIES = ["Getting Started", "Guides", "API Reference", "Resources"];

  // Filter topics based on search query
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return DOCS_DATA;
    const query = searchQuery.toLowerCase();
    return DOCS_DATA.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Active topic object
  const activeTopicObj = useMemo(() => {
    return DOCS_DATA.find((topic) => topic.id === activeTopic) || DOCS_DATA[0];
  }, [activeTopic]);

  // Find next topic for the button at the bottom
  const nextTopicObj = useMemo(() => {
    const currentIndex = DOCS_DATA.findIndex((topic) => topic.id === activeTopic);
    if (currentIndex >= 0 && currentIndex < DOCS_DATA.length - 1) {
      return DOCS_DATA[currentIndex + 1];
    }
    return null;
  }, [activeTopic]);

  const selectTopic = (id: string) => {
    setActiveTopic(id);
    setIsMobileMenuOpen(false);
    // Scroll content area back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <TopNavBar />

      <main className="pt-[72px] flex-1 flex bg-background relative overflow-hidden selection:bg-primary/30 selection:text-primary">
        {/* Glowing background shapes */}
        <div className="absolute top-[-10%] right-[-15%] w-[600px] h-[600px] bg-primary/5 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-[300px] border-r border-white/5 bg-surface-container-lowest/30 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto px-6 py-8 select-none z-10">
          <div className="space-y-6">
            {/* Version Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-sm font-extrabold text-on-surface">103 Dev Docs</span>
              <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                v1.0.0
              </span>
            </div>

            {/* Sidebar Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Filter topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest/60 border border-white/10 focus:border-primary focus:ring-primary/20 rounded-xl pl-9 pr-8 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface text-[14px]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            {/* Navigation Lists */}
            <nav className="space-y-6">
              {MENU_CATEGORIES.map((category) => {
                const categoryTopics = filteredTopics.filter(
                  (t) => t.category === category
                );

                if (categoryTopics.length === 0) return null;

                return (
                  <div key={category} className="space-y-2">
                    <h4 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest px-3">
                      {category}
                    </h4>
                    <ul className="space-y-1">
                      {categoryTopics.map((topic) => (
                        <li key={topic.id}>
                          <button
                            onClick={() => selectTopic(topic.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                              activeTopic === topic.id
                                ? "bg-primary/10 text-primary border border-primary/10 shadow-[0_0_10px_rgba(66,229,176,0.1)]"
                                : "text-on-surface-variant/75 hover:text-on-surface hover:bg-surface-container/40 border border-transparent"
                            }`}
                          >
                            {topic.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {filteredTopics.length === 0 && (
                <div className="text-center py-6 text-xs text-on-surface-variant/50">
                  No matching topics
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Content Column */}
        <section className="flex-1 min-h-[calc(100vh-72px)] relative z-10 px-6 md:px-12 lg:px-16 py-12 flex justify-center overflow-x-hidden">
          <div className="w-full max-w-[800px] flex flex-col justify-between">
            {/* Active Topic Content with Animation */}
            <div className="flex-1 pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopicObj.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTopicObj.content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            {nextTopicObj && (
              <div className="border-t border-white/5 pt-8 mt-12 flex justify-end">
                <button
                  onClick={() => selectTopic(nextTopicObj.id)}
                  className="group flex items-center gap-3 bg-surface-container border border-white/5 hover:border-primary/20 p-4 rounded-2xl text-right transition-all cursor-pointer shadow-md hover:shadow-lg hover:shadow-primary/5 active:scale-98"
                >
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider block mb-0.5">
                      Next Section
                    </span>
                    <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                      {nextTopicObj.title}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Floating Table of Contents for Mobile & Tablet */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-3 rounded-full shadow-2xl font-bold text-xs tracking-wider cursor-pointer hover:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
            <span>TOC</span>
          </button>
        </div>

        {/* Mobile Slide-out Drawer Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black z-40"
              />

              {/* Drawer Container */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-[72px] right-0 bottom-0 w-[280px] bg-surface-container-low border-l border-white/5 z-45 overflow-y-auto px-6 py-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <span className="text-sm font-extrabold text-on-surface">Menu</span>
                    <span className="px-2 py-0.5 rounded bg-primary/15 text-[9px] font-bold text-primary">v1.0.0</span>
                  </div>

                  {/* Sidebar Search */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[16px]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Filter topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-surface-container-lowest/60 border border-white/10 focus:border-primary focus:ring-primary/20 rounded-xl pl-9 pr-8 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 transition-all"
                    />
                  </div>

                  {/* Mobile Navigation List */}
                  <nav className="space-y-6">
                    {MENU_CATEGORIES.map((category) => {
                      const categoryTopics = filteredTopics.filter(
                        (t) => t.category === category
                      );

                      if (categoryTopics.length === 0) return null;

                      return (
                        <div key={category} className="space-y-2">
                          <h4 className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest px-2">
                            {category}
                          </h4>
                          <ul className="space-y-1">
                            {categoryTopics.map((topic) => (
                              <li key={topic.id}>
                                <button
                                  onClick={() => selectTopic(topic.id)}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                    activeTopic === topic.id
                                      ? "bg-primary/10 text-primary border border-primary/10"
                                      : "text-on-surface-variant/75 hover:text-on-surface hover:bg-surface-container/40"
                                  }`}
                                >
                                  {topic.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
