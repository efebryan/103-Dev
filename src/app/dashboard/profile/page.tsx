"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable form state
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    country: "",
    bio: "",
    website: "",
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return setLoading(false);
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      const merged = { ...data, email: user.email };
      setProfile(merged);
      setForm({
        full_name: data?.full_name ?? "",
        username: data?.username ?? "",
        country: data?.country ?? "",
        bio: data?.bio ?? "",
        website: data?.website ?? "",
      });
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setSaving(false);

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name: form.full_name,
        username: form.username || null,
        country: form.country || null,
        bio: form.bio || null,
        website: form.website || null,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile({ ...data, email: user.email });
    }
    setSaving(false);
    setIsEditing(false);
  };

  const initials = (name: string) =>
    (name ?? "?").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  if (loading) {
    return (
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Developer Profile</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage your public bio, connected accounts, and avatar.</p>
        </div>
        <div className="glass-card rounded-3xl p-16 border border-white/5 text-center text-on-surface-variant text-xs">Loading profile…</div>
      </div>
    );
  }

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
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/40 group-hover:border-primary transition-colors bg-primary/10 flex items-center justify-center">
            {profile?.avatar_url ? (
              <img className="w-full h-full object-cover" alt="Profile" src={profile.avatar_url} />
            ) : (
              <span className="text-primary font-black text-3xl">{initials(profile?.full_name ?? "")}</span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-on-surface">{profile?.full_name ?? "—"}</h2>
            {profile?.account_status && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border capitalize ${
                profile.account_status === "active" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" : "bg-rose-400/10 text-rose-400 border-rose-400/20"
              }`}>
                {profile.account_status}
              </span>
            )}
            {profile?.is_admin && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border bg-primary/10 text-primary border-primary/20">Admin</span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant">{profile?.email ?? "—"}</p>
          {profile?.username && (
            <p className="text-xs text-primary font-mono font-semibold">@{profile.username}</p>
          )}
          <p className="text-xs text-on-surface-variant/80 font-mono mt-1">
            {[profile?.country, profile?.website].filter(Boolean).join(" • ") || "No location set"}
          </p>
          {profile?.bio && (
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed max-w-lg">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Edit Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-on-surface">Personal Information</h3>
              <button
                onClick={() => {
                  if (isEditing) {
                    // Cancel — restore original values
                    setForm({
                      full_name: profile?.full_name ?? "",
                      username: profile?.username ?? "",
                      country: profile?.country ?? "",
                      bio: profile?.bio ?? "",
                      website: profile?.website ?? "",
                    });
                  }
                  setIsEditing(!isEditing);
                }}
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
                    value={form.full_name}
                    onChange={e => setForm({ ...form, full_name: e.target.value })}
                    className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Username</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    placeholder="e.g. devbryan"
                    className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50 placeholder:text-on-surface-variant/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Country</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={form.country}
                    onChange={e => setForm({ ...form, country: e.target.value })}
                    placeholder="e.g. United States"
                    className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50 placeholder:text-on-surface-variant/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Website / Portfolio</label>
                  <input
                    type="url"
                    disabled={!isEditing}
                    value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })}
                    placeholder="https://yoursite.dev"
                    className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50 placeholder:text-on-surface-variant/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Bio</label>
                <textarea
                  rows={3}
                  disabled={!isEditing}
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell the community about yourself…"
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface disabled:opacity-50 leading-relaxed resize-none placeholder:text-on-surface-variant/30"
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-on-primary py-2 px-6 rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 className="text-base font-bold text-on-surface">Account Details</h3>
            <div className="space-y-3 text-xs">
              {[
                { label: "Email", value: profile?.email ?? "—", icon: "mail" },
                { label: "Account Status", value: profile?.account_status ?? "active", icon: "verified_user" },
                { label: "Role", value: profile?.is_admin ? "Administrator" : "Customer", icon: "badge" },
                { label: "Member Since", value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—", icon: "calendar_today" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-high/30 border border-white/5">
                  <span className="material-symbols-outlined text-outline text-base shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[9px] text-outline uppercase font-bold">{item.label}</p>
                    <p className="font-semibold text-on-surface mt-0.5 capitalize">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
