import React, { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAppliedJobs } from '../../redux/jobSlice';
import { Calendar, Building2 } from 'lucide-react';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.error("Fetch Applied Jobs Error:", error);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'rejected':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            default:
                return 'bg-amber-100 text-amber-800 border-amber-200';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Your Job Applications ({allAppliedJobs?.length || 0})</h3>
            </div>

            {(!allAppliedJobs || allAppliedJobs.length === 0) ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                    You haven't applied to any jobs yet. Check out the <span className="text-indigo-600 font-semibold">Jobs</span> section!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Job Role</th>
                                <th className="px-6 py-3">Company</th>
                                <th className="px-6 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {allAppliedJobs.map((appliedJob) => (
                                <tr key={appliedJob._id} className="hover:bg-slate-50/70 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                                        {new Date(appliedJob.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                        {appliedJob?.job?.title || "Position Unavailable"}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {appliedJob?.job?.company?.name || "Company"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getStatusBadge(appliedJob.status)}`}>
                                            {appliedJob.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AppliedJobTable;
