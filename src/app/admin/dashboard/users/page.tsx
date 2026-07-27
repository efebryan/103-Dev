"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminUsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusToggle = async (id: string, current: string) => {
    const next = current === "active" ? "suspended" : "active";
    const supabase = createClient();
    await supabase.from("users").update({ account_status: next }).eq("id", id);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, account_status: next } : u));
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm(`Permanently delete this user account?`)) return;
    const supabase = createClient();
    await supabase.from("users").delete().eq("id", id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const filtered = users.filter(u => {
    const matchStatus = filterStatus === "all" || (u.account_status ?? "active") === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q
      || (u.full_name ?? "").toLowerCase().includes(q)
      || (u.username ?? "").toLowerCase().includes(q)
      || (u.email ?? "").toLowerCase().includes(q)
      || (u.country ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const statusBadge: Record<string, string> = {
    active: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    suspended: "bg-rose-400/10 text-rose-400 border-rose-400/20",
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  };

  const initials = (name: string) =>
    (name ?? "?").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  const fmt = (d: string) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Users</h1>
        <p className="text-on-surface-variant text-sm mt-1">Review registered user accounts, track developer downloads, configure passwords, and manage status logs.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto flex-wrap">
          {["all", "active", "suspended", "pending"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${filterStatus === s ? "bg-primary text-on-primary border-primary" : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input type="text" placeholder="Search name, username, email..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40" />
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-on-surface-variant text-xs">Loading users…</div>
          ) : (
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Username</th>
                  <th className="py-4 px-6">Country</th>
                  <th className="py-4 px-6">Joined</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 select-none overflow-hidden border border-white/5">
                          {user.avatar_url
                            ? <img src={user.avatar_url} className="w-full h-full object-cover" alt={user.full_name} />
                            : initials(user.full_name)}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{user.full_name ?? "—"}</p>
                          <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">{user.email ?? "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-primary">{user.username ? `@${user.username}` : "—"}</td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{user.country ?? "—"}</td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{fmt(user.created_at)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${statusBadge[user.account_status ?? "active"] ?? statusBadge.active}`}>
                        {user.account_status ?? "active"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center"
                        title="User Actions"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-on-surface-variant font-medium">No matching user records found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg select-none shrink-0 overflow-hidden border border-white/10">
                {selectedUser.avatar_url
                  ? <img src={selectedUser.avatar_url} className="w-full h-full object-cover" alt={selectedUser.full_name} />
                  : initials(selectedUser.full_name)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">{selectedUser.full_name ?? "—"}</h3>
                <p className="text-xs text-primary font-mono font-semibold">{selectedUser.username ? `@${selectedUser.username}` : "—"}</p>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">{selectedUser.email ?? "—"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
              {[
                ["Email", selectedUser.email ?? "—"],
                ["Country", selectedUser.country ?? "—"],
                ["Status", selectedUser.account_status ?? "active"],
                ["Joined", fmt(selectedUser.created_at)],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-outline">{label}</p>
                  <p className={`font-semibold text-on-surface mt-0.5 ${label === "Email" ? "lowercase font-mono text-[11px]" : "capitalize"}`}>
                    {label === "Email" ? (val ?? "—").toLowerCase() : val}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs pt-4 border-t border-white/5">
              <button
                onClick={() => {
                  handleDeleteUser(selectedUser.id);
                  setSelectedUser(null);
                }}
                className="bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Delete User
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const next = (selectedUser.account_status ?? "active") === "active" ? "suspended" : "active";
                    await handleStatusToggle(selectedUser.id, selectedUser.account_status ?? "active");
                    setSelectedUser({ ...selectedUser, account_status: next });
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {(selectedUser.account_status ?? "active") === "active" ? "block" : "check_circle"}
                  </span>
                  {(selectedUser.account_status ?? "active") === "active" ? "Suspend Account" : "Activate Account"}
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-primary text-on-primary hover:brightness-110 px-5 py-2.5 rounded-xl font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
