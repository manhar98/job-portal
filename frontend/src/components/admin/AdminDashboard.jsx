import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import axios from 'axios';
import { ADMIN_API_END_POINT, JOB_API_END_POINT } from '../../utils/constant';
import { 
    Users, Briefcase, Building2, FileCheck, Shield, 
    Ban, Trash2, CheckCircle2, AlertTriangle, Activity 
} from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [applicationsList, setApplicationsList] = useState([]);
    const [activeTab, setActiveTab] = useState("overview"); // "overview" | "users" | "applications"
    const [loading, setLoading] = useState(true);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const [statsRes, usersRes, appsRes] = await Promise.all([
                axios.get(`${ADMIN_API_END_POINT}/stats`, { withCredentials: true }),
                axios.get(`${ADMIN_API_END_POINT}/users`, { withCredentials: true }),
                axios.get(`${ADMIN_API_END_POINT}/applications`, { withCredentials: true })
            ]);

            if (statsRes.data.success) setStats(statsRes.data.stats);
            if (usersRes.data.success) setUsersList(usersRes.data.users);
            if (appsRes.data.success) setApplicationsList(appsRes.data.applications);
        } catch (error) {
            console.error("Admin Dashboard Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const toggleBlockHandler = async (userId) => {
        try {
            const res = await axios.put(`${ADMIN_API_END_POINT}/users/block/${userId}`, {}, { withCredentials: true });
            if (res.data.success) {
                fetchAdminData();
            }
        } catch (error) {
            console.error("Block User Error:", error);
        }
    };

    const deleteUserHandler = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? All their data will be purged.")) return;
        try {
            const res = await axios.delete(`${ADMIN_API_END_POINT}/users/delete/${userId}`, { withCredentials: true });
            if (res.data.success) {
                fetchAdminData();
            }
        } catch (error) {
            console.error("Delete User Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-2">
                            <Shield className="w-3.5 h-3.5" /> Super Admin Control
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">System Administration</h1>
                        <p className="text-xs text-slate-500 mt-1">Monitor portal activity, manage accounts, and oversee applications</p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                                activeTab === "overview" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                                activeTab === "users" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            Users ({usersList.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("applications")}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                                activeTab === "applications" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            Applications ({applicationsList.length})
                        </button>
                    </div>
                </div>

                {/* TAB 1: OVERVIEW STATS */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <div className="flex items-center justify-between text-slate-400 mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
                                    <Users className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">{stats?.totalUsers || 0}</div>
                                <div className="text-[11px] text-slate-400 mt-1">Platform-wide</div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <div className="flex items-center justify-between text-slate-400 mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider">Candidates</span>
                                    <Activity className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">{stats?.totalJobSeekers || 0}</div>
                                <div className="text-[11px] text-emerald-600 mt-1">Job Seekers</div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <div className="flex items-center justify-between text-slate-400 mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider">Recruiters</span>
                                    <Building2 className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">{stats?.totalRecruiters || 0}</div>
                                <div className="text-[11px] text-blue-600 mt-1">Hiring managers</div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <div className="flex items-center justify-between text-slate-400 mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider">Total Jobs</span>
                                    <Briefcase className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">{stats?.totalJobs || 0}</div>
                                <div className="text-[11px] text-amber-600 mt-1">Open vacancies</div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <div className="flex items-center justify-between text-slate-400 mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider">Applications</span>
                                    <FileCheck className="w-5 h-5 text-violet-500" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">{stats?.totalApplications || 0}</div>
                                <div className="text-[11px] text-violet-600 mt-1">Submitted</div>
                            </div>
                        </div>

                        {/* Application Status Breakdown */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 mb-4">Application Pipeline Breakdown</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                                    <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Pending Review</div>
                                    <div className="text-2xl font-bold text-amber-900 mt-1">{stats?.pendingApps || 0}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                    <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Accepted / Shortlisted</div>
                                    <div className="text-2xl font-bold text-emerald-900 mt-1">{stats?.acceptedApps || 0}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                                    <div className="text-xs font-semibold text-rose-800 uppercase tracking-wider">Rejected Applications</div>
                                    <div className="text-2xl font-bold text-rose-900 mt-1">{stats?.rejectedApps || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: USER MANAGEMENT */}
                {activeTab === "users" && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 text-sm">All Platform Accounts</h3>
                            <span className="text-xs text-slate-400">Manage access and suspend violator accounts</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3.5">User</th>
                                        <th className="px-6 py-3.5">Role</th>
                                        <th className="px-6 py-3.5">Contact</th>
                                        <th className="px-6 py-3.5">Status</th>
                                        <th className="px-6 py-3.5 text-right">Moderation Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {usersList.map((u) => (
                                        <tr key={u._id} className="hover:bg-slate-50/70 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{u.fullname}</div>
                                                <div className="text-xs text-slate-400">{u.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                                    u.role === 'admin' 
                                                        ? 'bg-purple-100 text-purple-700' 
                                                        : u.role === 'recruiter' 
                                                            ? 'bg-blue-100 text-blue-700' 
                                                            : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">
                                                {u.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4">
                                                {u.profile?.isBlocked ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                                        Suspended
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                                        Active
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {u.role !== 'admin' && (
                                                    <div className="inline-flex items-center gap-2">
                                                        <button
                                                            onClick={() => toggleBlockHandler(u._id)}
                                                            className={`p-1.5 rounded-lg transition ${
                                                                u.profile?.isBlocked 
                                                                    ? 'text-emerald-600 hover:bg-emerald-50' 
                                                                    : 'text-amber-600 hover:bg-amber-50'
                                                            }`}
                                                            title={u.profile?.isBlocked ? "Reactivate User" : "Suspend User"}
                                                        >
                                                            <Ban className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUserHandler(u._id)}
                                                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 3: APPLICATIONS MONITORING */}
                {activeTab === "applications" && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 text-sm">System Applications Monitor</h3>
                            <span className="text-xs text-slate-400">All candidate applications across all employers</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3.5">Candidate</th>
                                        <th className="px-6 py-3.5">Applied For Job</th>
                                        <th className="px-6 py-3.5">Date</th>
                                        <th className="px-6 py-3.5 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {applicationsList.map((app) => (
                                        <tr key={app._id} className="hover:bg-slate-50/70 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{app?.applicant?.fullname || "Candidate"}</div>
                                                <div className="text-xs text-slate-400">{app?.applicant?.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{app?.job?.title || "Job"}</div>
                                                <div className="text-xs text-slate-400">{app?.job?.location} • ₹{app?.job?.salary} LPA</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${
                                                    app.status === 'accepted'
                                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                                        : app.status === 'rejected'
                                                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                                                            : 'bg-amber-100 text-amber-800 border-amber-200'
                                                }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
