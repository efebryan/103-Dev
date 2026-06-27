"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter Bundle",
      price: "$0",
      description: "Perfect for testing and learning local boilerplates.",
      features: [
        "Access to 3 basic starter templates",
        "1 active domain activation limit",
        "Standard community Discord support",
        "Manual file downloads",
      ],
      popular: false,
      buttonText: "Current Plan",
      active: true,
    },
    {
      name: "Commercial Pro",
      price: billingCycle === "monthly" ? "$199" : "$159",
      description: "Everything you need to launch elite client websites and SaaS projects.",
      features: [
        "Access to all 50+ premium developer assets",
        "5 active domain activations",
        "Priority ticket support (< 2 hours)",
        "CLI keys for automated integrations",
        "Early access to upcoming UI releases",
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      active: false,
    },
    {
      name: "Enterprise System",
      price: "Custom",
      description: "For teams requiring customized setups, source codes, and deployment advice.",
      features: [
        "Unlimited domain activations",
        "Dedicated Slack support channel",
        "1-on-1 deployment consultation",
        "Custom features integration requests",
        "Complete source code repository access",
      ],
      popular: false,
      buttonText: "Contact Sales",
      active: false,
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">
          Central Command Upgrade Plans
        </h1>
        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
          Unlock unlimited CLI deployments, priority ticketing, and premium code repositories to scale your development workflow.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-1 p-1 bg-[#010f1f] rounded-full border border-white/5 mt-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              billingCycle === "monthly" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              billingCycle === "yearly" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`glass-card rounded-3xl p-6 md:p-8 border relative flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ${
              plan.popular 
                ? "border-primary shadow-[0_0_40px_rgba(66,229,176,0.15)] bg-primary/5" 
                : "border-white/5"
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Most Popular
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-on-surface">{plan.name}</h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-on-surface">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-xs text-on-surface-variant font-mono">/ month</span>
                )}
              </div>

              <ul className="space-y-3 text-xs text-on-surface-variant">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-base shrink-0">check_circle</span>
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <button 
                onClick={() => alert(`Redirecting to payment integration for ${plan.name}...`)}
                disabled={plan.active}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  plan.active
                    ? "bg-white/5 text-outline border border-white/10"
                    : "bg-primary text-on-primary hover:brightness-110 active:scale-95"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
