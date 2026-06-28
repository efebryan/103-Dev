"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  country: string;
  orders: number;
  spent: string;
  downloads: number;
  registrationDate: string;
  status: "Active" | "Suspended" | "Pending";
  avatarColor: string;
}

export default function AdminUsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const initialUsers: User[] = [
    { id: "USR-001", name: "Bryan", username: "efebryan", email: "bryan@103.dev", country: "United States", orders: 12, spent: "$1,248.00", downloads: 48, registrationDate: "Jan 15, 2026", status: "Active", avatarColor: "bg-primary text-on-primary" },
    { id: "USR-002", name: "Sarah Jenkins", username: "sarahj", email: "sarah@jenkins.co", country: "United Kingdom", orders: 8, spent: "$432.00", downloads: 22, registrationDate: "Feb 10, 2026", status: "Active", avatarColor: "bg-secondary text-on-secondary" },
    { id: "USR-003", name: "Michael Chen", username: "mchen", email: "m.chen@tech.org", country: "Canada", orders: 4, spent: "$258.00", downloads: 14, registrationDate: "Mar 01, 2026", status: "Suspended", avatarColor: "bg-amber-500/20 text-amber-400" },
    { id: "USR-004", name: "Emma Watson", username: "emmatron", email: "emma@watson.dev", country: "Australia", orders: 2, spent: "$129.00", downloads: 6, registrationDate: "Nov 20, 2025", status: "Active", avatarColor: "bg-purple-500/20 text-purple-400" },
    { id: "USR-005", name: "Alex Rivera", username: "alexr", email: "alex.r@rivera.io", country: "Spain", orders: 0, spent: "$0.00", downloads: 0, registrationDate: "June 25, 2026", status: "Pending", avatarColor: "bg-rose-500/20 text-rose-400" }
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleStatusToggle = (id: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
    alert(`Account status updated for user ID: ${id}`);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm(`Are you sure you want to permanently delete user record ${id}?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      alert(`User record ${id} removed.`);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Users</h1>
        <p className="text-on-surface-variant text-sm mt-1">Review registered user accounts, track developer downloads, configure passwords, and manage status logs.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          {["all", "active", "suspended", "pending"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${
                filterStatus === status
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search name, username, email..."
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
                <th className="py-4 px-6">User / Avatar</th>
                <th className="py-4 px-6">Username</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Country</th>
                <th className="py-4 px-6 text-center">Orders</th>
                <th className="py-4 px-6 text-right">Spent</th>
                <th className="py-4 px-6 text-center">Downloads</th>
                <th className="py-4 px-6">Registration Date</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center font-bold text-xs shrink-0 select-none`}>
                        {user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <span className="text-[10px] text-outline font-mono">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-primary">@{user.username}</td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">{user.email}</td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">{user.country}</td>
                  <td className="py-4 px-6 text-center font-bold">{user.orders}</td>
                  <td className="py-4 px-6 text-right font-bold text-on-surface">{user.spent}</td>
                  <td className="py-4 px-6 text-center font-bold text-primary">{user.downloads}</td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">{user.registrationDate}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      user.status === "Active" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                      user.status === "Suspended" ? "bg-rose-400/10 text-rose-400 border-rose-400/20" :
                      "bg-amber-400/10 text-amber-400 border-amber-400/20"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                    <button onClick={() => setSelectedUser(user)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">View</button>
                    <button onClick={() => handleStatusToggle(user.id)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">
                      {user.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                    <button onClick={() => alert(`Password reset request triggered for email: ${user.email}`)} className="text-primary hover:underline font-semibold cursor-pointer text-xs">Reset Password</button>
                    <button onClick={() => handleDeleteUser(user.id)} className="text-error hover:underline font-semibold cursor-pointer text-xs">Delete</button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-on-surface-variant font-medium">
                    No matching user records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Info View Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full ${selectedUser.avatarColor} flex items-center justify-center font-bold text-lg select-none shrink-0`}>
                {selectedUser.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">{selectedUser.name}</h3>
                <p className="text-xs text-primary font-mono font-semibold">@{selectedUser.username}</p>
                <p className="text-[9px] text-outline font-mono mt-0.5">ID: {selectedUser.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
              <div>
                <p className="text-outline">Email Address</p>
                <p className="font-semibold text-on-surface mt-0.5">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-outline">Country</p>
                <p className="font-semibold text-on-surface mt-0.5">{selectedUser.country}</p>
              </div>
              <div>
                <p className="text-outline">Total Purchases</p>
                <p className="font-bold text-primary mt-0.5">{selectedUser.orders} orders</p>
              </div>
              <div>
                <p className="text-outline">Total Revenue Spent</p>
                <p className="font-black text-on-surface mt-0.5">{selectedUser.spent}</p>
              </div>
              <div>
                <p className="text-outline">Downloads Counter</p>
                <p className="font-bold text-on-surface mt-0.5">{selectedUser.downloads} times</p>
              </div>
              <div>
                <p className="text-outline">Registration Date</p>
                <p className="font-semibold text-on-surface mt-0.5">{selectedUser.registrationDate}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end text-xs pt-4 border-t border-white/5">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-primary text-on-primary hover:brightness-110 px-5 py-2 rounded-xl font-semibold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
