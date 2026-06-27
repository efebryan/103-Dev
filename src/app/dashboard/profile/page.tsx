"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Bryan",
    email: "bryan@103.dev",
    role: "Full Stack Engineer",
    company: "103 Dev Premium Marketplace",
    location: "San Francisco, CA",
    github: "github.com/bryan-103",
    discord: "bryan_dev#9981",
    bio: "Developer building next-generation SaaS boilerplate kits and interactive developer platforms.",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile information updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Developer Profile</h1>
        <p className="text-on-surface-variant text-sm mt-1">Manage your public bio, connected accounts, and avatar.</p>
      </div>

      {/* Profile Overview Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/40 group-hover:border-primary transition-colors">
            <img
              className="w-full h-full object-cover"
              alt="Developer Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBcv3YPHQ8C3RSPuodg9qNiVcwmrQbZ8WW7YBoJKnyFXrCsjlL3YC4LECyrr7ZeIaTTQ9izPu97AfYiEwrirhysn91YeSBiGTm3E2tomiO0dXimnPXQcxNE8e7m6zS_bSa7JzCtnAzBUD2HuallHmYhevcUf-KcWdFpu_PrZzBhFap7IHWYzVU87jhpCvAqH8HfRrfRGRreblVXFYhlzdgvfZntzxrkfgazNjJWmV6UrMHIYFIf698RWED1CRzi2fECz7KbUqzwPh"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#051424] border border-white/10 text-primary hover:bg-white/5 transition-colors cursor-pointer shadow-lg" title="Change Avatar">
            <span className="material-symbols-outlined text-[14px]">photo_camera</span>
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-on-surface">{profile.name}</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border bg-primary/10 text-primary border-primary/20">
              {profile.role}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">{profile.email}</p>
          <p className="text-xs text-on-surface-variant/80 font-mono mt-1">{profile.location} • {profile.company}</p>
        </div>
      </div>

      {/* Tabs / Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-on-surface">Personal Information</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Display Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Professional Title</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Bio</label>
                <textarea
                  rows={3}
                  disabled={!isEditing}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50 leading-relaxed resize-none"
                />
              </div>

              {isEditing && (
                <button type="submit" className="bg-primary text-on-primary py-2 px-6 rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 className="text-base font-bold text-on-surface">Connected Accounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/30 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline text-lg">code</span>
                  <div className="text-xs">
                    <p className="font-semibold text-on-surface">GitHub</p>
                    <p className="text-[10px] text-on-surface-variant font-mono">{profile.github}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-primary uppercase">Connected</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/30 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline text-lg">forum</span>
                  <div className="text-xs">
                    <p className="font-semibold text-on-surface">Discord</p>
                    <p className="text-[10px] text-on-surface-variant font-mono">{profile.discord}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-primary uppercase">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
