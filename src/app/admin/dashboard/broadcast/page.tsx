"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BroadcastPage() {
  const [recipientType, setRecipientType] = useState<"all" | "specific">("all");
  const [emailAddress, setEmailAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipientType === "specific" && !emailAddress) {
      alert("Please provide an email address.");
      return;
    }
    if (!subject || !message) {
      alert("Please provide a subject and a message.");
      return;
    }

    setSending(true);
    // Mock sending process
    setTimeout(() => {
      setSending(false);
      alert(
        `Broadcast sent successfully to ${
          recipientType === "all" ? "all users" : emailAddress
        }!`
      );
      // Reset form
      setSubject("");
      setMessage("");
      if (recipientType === "specific") setEmailAddress("");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Email Broadcast</h1>
          <p className="text-on-surface-variant text-sm mt-1">Send announcements, updates, or direct messages to your users.</p>
        </div>
      </div>

      <form onSubmit={handleSend} className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 space-y-8">
        
        {/* Recipient Selection */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-primary text-base">group</span>
            Recipient
          </h3>
          
          <div className="flex flex-wrap gap-4">
            <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${recipientType === "all" ? "bg-primary/10 border-primary text-primary" : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
              <input 
                type="radio" 
                name="recipientType" 
                value="all" 
                checked={recipientType === "all"} 
                onChange={() => setRecipientType("all")}
                className="hidden" 
              />
              <span className="material-symbols-outlined">public</span>
              <div className="text-xs">
                <p className="font-bold">All Users</p>
                <p className="opacity-80">Send to everyone</p>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${recipientType === "specific" ? "bg-primary/10 border-primary text-primary" : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
              <input 
                type="radio" 
                name="recipientType" 
                value="specific" 
                checked={recipientType === "specific"} 
                onChange={() => setRecipientType("specific")}
                className="hidden" 
              />
              <span className="material-symbols-outlined">person</span>
              <div className="text-xs">
                <p className="font-bold">Specific User</p>
                <p className="opacity-80">Target a single email</p>
              </div>
            </label>
          </div>

          <AnimatePresence>
            {recipientType === "specific" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="pt-2"
              >
                <label className="block text-outline font-semibold mb-1 text-xs">Email Address</label>
                <input 
                  type="email" 
                  value={emailAddress}
                  onChange={e => setEmailAddress(e.target.value)}
                  placeholder="user@example.com" 
                  className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message Composition */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-primary text-base">edit_document</span>
            Composition
          </h3>

          <div>
            <label className="block text-outline font-semibold mb-1 text-xs">Subject Line</label>
            <input 
              type="text" 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Major Platform Update v2.0" 
              className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
            />
          </div>

          <div>
            <label className="block text-outline font-semibold mb-1 text-xs">Message Body</label>
            <textarea 
              rows={8}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write your email content here..." 
              className="w-full bg-surface-container-lowest border border-outline-variant p-3 rounded-xl text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
            />
          </div>
        </div>

        {/* Action */}
        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            disabled={sending}
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            {sending ? "Sending Broadcast..." : "Send Broadcast"}
          </button>
        </div>

      </form>
    </div>
  );
}
