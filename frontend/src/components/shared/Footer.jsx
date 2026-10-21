import React from 'react';
import { Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-indigo-600 text-white p-2 rounded-xl">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-white">JobSphere</span>
                        </div>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            A unified platform connecting job seekers with hiring companies. Search, apply, post jobs, and manage candidates effortlessly.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm mb-3">For Candidates</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/jobs" className="hover:text-white transition">Browse All Jobs</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition">Application Status</Link></li>
                            <li><Link to="/login" className="hover:text-white transition">Candidate Login</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm mb-3">For Employers</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/admin/jobs/create" className="hover:text-white transition">Post a Job</Link></li>
                            <li><Link to="/admin/companies" className="hover:text-white transition">Register Company</Link></li>
                            <li><Link to="/login" className="hover:text-white transition">Recruiter Dashboard</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} JobSphere Inc. All rights reserved.</p>
                    <p className="flex items-center gap-1 mt-4 sm:mt-0">
                        Crafted for Full Stack Excellence with MERN
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
