import React from 'react';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Latest & Top <span className="text-indigo-600">Job Openings</span>
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Apply to leading roles verified by top companies
                    </p>
                </div>
                <Link 
                    to="/jobs" 
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                    View all {allJobs?.length || 0} jobs <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {(!allJobs || allJobs.length === 0) ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                    <p className="text-slate-500 text-sm">No job openings available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.slice(0, 6).map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default LatestJobs;
