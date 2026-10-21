import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAdminJobs } from '../../redux/jobSlice';
import { Briefcase, Plus, Users, Trash2, MapPin, IndianRupee } from 'lucide-react';

const AdminJobs = () => {
    const { allAdminJobs } = useSelector(store => store.job);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAdminJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.error("Fetch Admin Jobs Error:", error);
        }
    };

    useEffect(() => {
        fetchAdminJobs();
    }, [dispatch]);

    const deleteJobHandler = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job posting?")) return;
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                fetchAdminJobs();
            }
        } catch (error) {
            console.error("Delete Job Error:", error);
        }
    };

    const filteredJobs = (allAdminJobs || []).filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Posted Jobs Management</h1>
                        <p className="text-xs text-slate-500 mt-1">Review your posted jobs and view candidate applications</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" /> Post New Job
                    </button>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search jobs by title or company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-80 px-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-800">No posted jobs found</h3>
                        <p className="text-xs text-slate-500 mt-1">Click "Post New Job" above to create your first vacancy.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3.5">Company</th>
                                        <th className="px-6 py-3.5">Role</th>
                                        <th className="px-6 py-3.5">Date</th>
                                        <th className="px-6 py-3.5">Applicants</th>
                                        <th className="px-6 py-3.5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredJobs.map((job) => (
                                        <tr key={job._id} className="hover:bg-slate-50/70 transition">
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {job?.company?.name || "Company"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{job.title}</div>
                                                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                                                    <span>{job.location}</span>
                                                    <span>•</span>
                                                    <span>₹{job.salary} LPA</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                                                >
                                                    <Users className="w-3.5 h-3.5" />
                                                    {job?.applications?.length || 0} Candidates
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => deleteJobHandler(job._id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                                                    title="Delete Job"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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

export default AdminJobs;
