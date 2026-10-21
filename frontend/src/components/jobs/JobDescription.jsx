import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../../redux/jobSlice';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { 
    Briefcase, MapPin, IndianRupee, Users, Calendar, 
    CheckCircle2, ArrowLeft, Building2, Check, AlertCircle 
} from 'lucide-react';

const JobDescription = () => {
    const { id: jobId } = useParams();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isApplied, setIsApplied] = useState(false);
    const [applyLoading, setApplyLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Fetch job details
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    // Check if current user already applied
                    const applied = res.data.job.applications?.some(app => 
                        (typeof app === 'string' ? app === user?._id : app.applicant === user?._id)
                    );
                    setIsApplied(applied);
                }
            } catch (error) {
                console.error("Fetch Job Error:", error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== 'jobseeker') {
            setMessage({ text: "Only Job Seekers can apply for jobs.", type: "error" });
            return;
        }

        try {
            setApplyLoading(true);
            setMessage({ text: "", type: "" });

            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                setIsApplied(true);
                setMessage({ text: "Congratulations! You have applied successfully.", type: "success" });
            }
        } catch (error) {
            console.error("Apply Job Error:", error);
            setMessage({ 
                text: error?.response?.data?.message || "Failed to apply for job.", 
                type: "error" 
            });
        } finally {
            setApplyLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to jobs
                </button>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                        message.type === 'success' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                        {message.type === 'success' ? <Check className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
                        <span>{message.text}</span>
                    </div>
                )}

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                    {/* Top Job Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl overflow-hidden shrink-0">
                                {singleJob?.company?.logo ? (
                                    <img src={`http://localhost:8000${singleJob?.company?.logo}`} alt="logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-7 h-7" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">{singleJob?.title}</h1>
                                <p className="text-sm font-medium text-indigo-600 mt-0.5">
                                    {singleJob?.company?.name || "Company"}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {singleJob?.location}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {singleJob?.jobType}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {singleJob?.applications?.length || 0} Applicants</span>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="sm:self-start">
                            <button
                                onClick={applyJobHandler}
                                disabled={isApplied || applyLoading}
                                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 ${
                                    isApplied
                                        ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed border border-emerald-200'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                }`}
                            >
                                {isApplied ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        Already Applied
                                    </>
                                ) : (
                                    applyLoading ? "Submitting..." : "Apply Now"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Job Details Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-6 border-b border-slate-100">
                        <div className="bg-slate-50 p-3.5 rounded-xl">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Industry</span>
                            <span className="text-sm font-bold text-indigo-600 mt-0.5 block truncate">{singleJob?.category || "General"}</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Salary</span>
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                                <IndianRupee className="w-3.5 h-3.5 text-slate-500" /> {singleJob?.salary} LPA
                            </span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Experience</span>
                            <span className="text-sm font-bold text-slate-800 mt-0.5 block">{singleJob?.experienceLevel || "0-2 Yrs"}</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Job Type</span>
                            <span className="text-sm font-bold text-slate-800 mt-0.5 block">{singleJob?.jobType}</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Posted On</span>
                            <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                                {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : "Recent"}
                            </span>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="py-6">
                        <h2 className="text-base font-bold text-slate-900 mb-3">About The Role</h2>
                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {singleJob?.description}
                        </div>
                    </div>

                    {/* Requirements / Skills */}
                    {singleJob?.requirements && singleJob.requirements.length > 0 && (
                        <div className="pt-2">
                            <h2 className="text-base font-bold text-slate-900 mb-3">Key Skills & Requirements</h2>
                            <div className="flex flex-wrap gap-2">
                                {singleJob.requirements.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobDescription;
