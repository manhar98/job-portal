import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Briefcase, User as UserIcon, LogOut, LayoutDashboard, PlusCircle, Building2, FileText, Shield } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../../redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            console.error(error);
            dispatch(setUser(null));
            navigate("/");
        }
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 text-white p-2 rounded-xl group-hover:bg-indigo-700 transition">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        JobSphere
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600">
                    <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                    <Link to="/jobs" className="hover:text-indigo-600 transition">Jobs</Link>

                    {/* Role specific links */}
                    {user && user.role === 'jobseeker' && (
                        <Link to="/profile" className="hover:text-indigo-600 transition flex items-center gap-1">
                            <FileText className="w-4 h-4" /> Applied Jobs
                        </Link>
                    )}

                    {user && user.role === 'recruiter' && (
                        <>
                            <Link to="/admin/companies" className="hover:text-indigo-600 transition flex items-center gap-1">
                                <Building2 className="w-4 h-4" /> Companies
                            </Link>
                            <Link to="/admin/jobs" className="hover:text-indigo-600 transition flex items-center gap-1">
                                <Briefcase className="w-4 h-4" /> My Jobs
                            </Link>
                            <Link to="/admin/jobs/create" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
                                <PlusCircle className="w-4 h-4" /> Post Job
                            </Link>
                        </>
                    )}

                    {user && user.role === 'admin' && (
                        <Link to="/system/admin" className="text-violet-600 font-semibold hover:text-violet-700 transition flex items-center gap-1">
                            <Shield className="w-4 h-4" /> Admin Console
                        </Link>
                    )}
                </nav>

                {/* Auth Controls / User Profile */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-full hover:ring-2 hover:ring-indigo-200 transition"
                            >
                                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                    {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="hidden sm:inline text-sm font-medium text-slate-800">{user.fullname}</span>
                            </button>

                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-sm font-semibold text-slate-900">{user.fullname}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        <span className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                            user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : user.role === 'recruiter'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </div>

                                    {user.role === 'jobseeker' && (
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                        >
                                            <UserIcon className="w-4 h-4 text-slate-400" /> My Profile
                                        </Link>
                                    )}

                                    {user.role === 'recruiter' && (
                                        <>
                                            <Link
                                                to="/admin/companies"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                <Building2 className="w-4 h-4 text-slate-400" /> Companies
                                            </Link>
                                            <Link
                                                to="/admin/jobs"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                <LayoutDashboard className="w-4 h-4 text-slate-400" /> Manage Jobs
                                            </Link>
                                        </>
                                    )}

                                    {user.role === 'admin' && (
                                        <Link
                                            to="/system/admin"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                        >
                                            <Shield className="w-4 h-4 text-slate-400" /> Admin Dashboard
                                        </Link>
                                    )}

                                    <div className="border-t border-slate-100 mt-1">
                                        <button
                                            onClick={logoutHandler}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 text-left"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
