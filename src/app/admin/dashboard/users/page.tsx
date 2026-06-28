"use client";

import { useState } from "react";

export default function AdminUsersPage() {
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    { id: "USR-001", name: "Bryan", email: "bryan@103.dev", role: "Developer", purchases: 12, licenses: 5, dateJoined: "Jan 15, 2026" },
    { id: "USR-002", name: "Sarah Jenkins", email: "sarah@jenkins.co", role: "Partner", purchases: 8, licenses: 3, dateJoined: "Feb 10, 2026" },
    { id: "USR-003", name: "Michael Chen", email: "m.chen@tech.org", role: "Developer", purchases: 4, licenses: 1, dateJoined: "Mar 01, 2026" },
    { id: "USR-004", name: "Emma Watson", email: "emma@watson.dev", role: "Admin", purchases: 2, licenses: 2, dateJoined: "Nov 20, 2025" },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Manage Users</h1>
        <p className="text-on-surface-variant text-sm mt-1">Configure account access, modify roles, and review developer purchases metrics.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          {["all", "developer", "partner", "admin"].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${
                filterRole === role
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">User ID</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-center">Purchases</th>
                <th className="py-4 px-6 text-center">Active Keys</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary">{user.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-[10px] text-outline">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">{user.dateJoined}</td>
                  <td className="py-4 px-6 text-center font-bold">{user.purchases}</td>
                  <td className="py-4 px-6 text-center font-bold text-primary">{user.licenses}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-on-surface border border-white/10">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => alert(`Modifying role settings for ${user.name}...`)}
                      className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Edit Role
                    </button>
                    <button
                      onClick={() => alert(`Suspending user session ${user.id}...`)}
                      className="text-error hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
