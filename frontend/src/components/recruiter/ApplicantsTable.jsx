import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { Download, CheckCircle, XCircle, Clock } from 'lucide-react';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ onStatusChange }) => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                if (onStatusChange) onStatusChange();
            }
        } catch (error) {
            console.error("Status Update Error:", error);
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'rejected':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            default:
                return 'bg-amber-100 text-amber-800 border-amber-200';
        }
    };

    const list = applicants?.applications || [];

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {list.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                    No candidates have applied for this job opening yet.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3.5">Candidate Name</th>
                                <th className="px-6 py-3.5">Email</th>
                                <th className="px-6 py-3.5">Contact</th>
                                <th className="px-6 py-3.5">Resume</th>
                                <th className="px-6 py-3.5">Date</th>
                                <th className="px-6 py-3.5 text-right">Status Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {list.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50/70 transition">
                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        {item?.applicant?.fullname || "Candidate"}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-600">
                                        {item?.applicant?.email}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-600">
                                        {item?.applicant?.phoneNumber || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.resume || item?.applicant?.profile?.resume ? (
                                            <a
                                                href={`http://localhost:8000${item?.resume || item?.applicant?.profile?.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                                            >
                                                <Download className="w-3.5 h-3.5" /> View Resume
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400">None</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(item.status)}`}>
                                                {item.status}
                                            </span>

                                            {/* Status Changer Buttons */}
                                            {item.status === 'pending' && (
                                                <div className="flex items-center gap-1 ml-2">
                                                    <button
                                                        onClick={() => statusHandler("accepted", item._id)}
                                                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition"
                                                        title="Accept Candidate"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => statusHandler("rejected", item._id)}
                                                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition"
                                                        title="Reject Candidate"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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

export default ApplicantsTable;
