import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '../../utils/constant';
import { Briefcase, Loader2, ArrowLeft } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        category: "IT & Software",
        jobType: "Full-Time",
        experience: "0-2 Years",
        position: 1,
        companyId: ""
    });
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    setCompanies(res.data.companies);
                    if (res.data.companies.length > 0) {
                        setInput(prev => ({ ...prev, companyId: res.data.companies[0]._id }));
                    }
                }
            } catch (error) {
                console.error("Fetch Companies Error:", error);
            }
        };
        fetchCompanies();
    }, []);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!input.companyId) {
            setErrorMsg("Please select or register a company first.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error("Post Job Error:", error);
            setErrorMsg(error?.response?.data?.message || "Failed to post job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-10 flex-1 w-full">
                <button
                    onClick={() => navigate("/admin/jobs")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to My Jobs
                </button>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8">
                    <div className="inline-flex bg-indigo-50 p-3 rounded-2xl text-indigo-600 mb-3">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900">Post a New Job</h1>
                    <p className="text-xs text-slate-500 mt-1 mb-6">Create a job listing to find candidates</p>

                    {errorMsg && (
                        <div className="mb-4 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    {companies.length === 0 ? (
                        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs">
                            You need to register at least one company before posting a job.{' '}
                            <button
                                onClick={() => navigate("/admin/companies/create")}
                                className="font-bold underline text-amber-900"
                            >
                                Register Company Now
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Company</label>
                                    <select
                                        name="companyId"
                                        value={input.companyId}
                                        onChange={changeEventHandler}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    >
                                        {companies.map((c) => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Accountant, Sales Lead, React Developer..."
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        required
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Industry / Category</label>
                                    <select
                                        name="category"
                                        value={input.category}
                                        onChange={changeEventHandler}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="IT & Software">IT & Software</option>
                                        <option value="Marketing & Sales">Marketing & Sales</option>
                                        <option value="Finance & Accounts">Finance & Accounts</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Design & Creative">Design & Creative</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Customer Support">Customer Support</option>
                                        <option value="Education & Teaching">Education & Teaching</option>
                                        <option value="Engineering & Manufacturing">Engineering & Manufacturing</option>
                                        <option value="Banking & Insurance">Banking & Insurance</option>
                                        <option value="Operations & Logistics">Operations & Logistics</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Ahmedabad, Mumbai, Remote..."
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        required
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Salary (in LPA)</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        placeholder="e.g. 6"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        required
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Type</label>
                                    <select
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Experience Level</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        placeholder="e.g. 1-3 Years"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Open Positions</label>
                                    <input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        min="1"
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Key Requirements / Skills (comma separated)</label>
                                <input
                                    type="text"
                                    name="requirements"
                                    placeholder="React, Redux, Node.js, REST API"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Description</label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Outline the role responsibilities and perks..."
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    required
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/jobs")}
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Job Opening"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostJob;
