import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import { Mail, Phone, Edit, FileText, Download, Briefcase, Sparkles } from 'lucide-react';

const Profile = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
                                {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">{user?.fullname}</h1>
                                <p className="text-xs text-slate-500 mt-0.5 max-w-md">
                                    {user?.profile?.bio || "No headline added yet. Add a short bio to stand out to employers."}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpenDialog(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs self-start"
                        >
                            <Edit className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-100">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span>{user?.phoneNumber || "Not provided"}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="py-6 border-b border-slate-100">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills & Expertise</h2>
                        {user?.profile?.skills && user.profile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.profile.skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100/60"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400">No skills listed yet.</p>
                        )}
                    </div>

                    {/* Resume Download / View */}
                    <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attached Resume</h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {user?.profile?.resumeOriginalName || "Resume file uploaded"}
                            </p>
                        </div>
                        {user?.profile?.resume ? (
                            <a
                                href={`http://localhost:8000${user.profile.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition"
                            >
                                <Download className="w-3.5 h-3.5" /> Download Resume
                            </a>
                        ) : (
                            <span className="text-xs text-slate-400 italic">No resume uploaded yet.</span>
                        )}
                    </div>
                </div>

                {/* Applied Jobs Table Section */}
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={openDialog} setOpen={setOpenDialog} />
            <Footer />
        </div>
    );
};

export default Profile;
