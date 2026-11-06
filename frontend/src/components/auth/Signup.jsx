import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';
import { Briefcase, Loader2, Lock, Mail, Phone, Upload, User } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "jobseeker",
        file: null
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res.data.success) {
                setSuccessMsg("Account registered successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            setErrorMsg(error?.response?.data?.message || "Registration failed. Try again.");
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
                    <h2 className="text-2xl font-bold text-slate-900">Create an Account</h2>
                    <p className="text-sm text-slate-500 mt-1">Join JobSphere to kickstart your journey</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                        {errorMsg}
                    </div>
                )}

                {successMsg && (
                    <div className="mb-6 p-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-4">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            Select Account Type:
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

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                required
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="name@domain.com"
                                required
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="9876543210"
                                required
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Create a strong password"
                                required
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Resume / Profile Photo Upload */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                            {input.role === 'jobseeker' ? 'Upload Resume (PDF/Doc/Image)' : 'Profile Photo'}
                        </label>
                        <div className="flex items-center gap-2">
                            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-400 transition text-xs text-slate-600 bg-slate-50">
                                <Upload className="w-4 h-4 text-indigo-500" />
                                <span>{input.file ? input.file.name : "Choose file..."}</span>
                                <input
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
