import React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition cursor-pointer flex flex-col justify-between group"
        >
            <div>
                {/* Header: Company & Location */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-700 font-bold text-base overflow-hidden">
                            {job?.company?.logo ? (
                                <img src={`http://localhost:8000${job?.company?.logo}`} alt="logo" className="w-full h-full object-cover" />
                            ) : (
                                <Building2 className="w-5 h-5 text-indigo-600" />
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                                {job?.company?.name || "Company"}
                            </h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {job?.location || "India"}
                            </p>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(job?.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Job Title */}
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition line-clamp-1">
                    {job?.title}
                </h3>

                {/* Job Description Snippet */}
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {job?.description}
                </p>
            </div>

            {/* Badges & Salary */}
            <div>
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
                    {job?.category && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700">
                            {job.category}
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700">
                        <Briefcase className="w-3 h-3" /> {job?.jobType}
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700">
                        <IndianRupee className="w-3 h-3" /> {job?.salary} LPA
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">
                        {job?.position || 1} Openings
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
