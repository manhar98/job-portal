import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { Briefcase, Loader2, Lock, Mail } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "jobseeker"
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                localStorage.setItem("token", res.data.token);
                // Redirect according to user role
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin/jobs");
                } else if (res.data.user.role === 'admin') {
                    navigate("/system/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
            setErrorMsg(error?.response?.data?.message || "Login failed. Please check credentials.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex bg-indigo-50 p-3 rounded-2xl text-indigo-600 mb-3">
                        <Briefcase className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                    <p className="text-sm text-slate-500 mt-1">Sign in to your JobSphere account</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-5">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            I am a:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['jobseeker', 'recruiter', 'admin'].map((role) => (
                                <label
                                    key={role}
                                    className={`flex items-center justify-center py-2 px-3 text-xs font-semibold rounded-xl border cursor-pointer transition capitalize ${
                                        input.role === role
                                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600'
                                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={input.role === role}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    {role === 'jobseeker' ? 'Job Seeker' : role}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="name@company.com"
                                required
                                className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                required
                                className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
