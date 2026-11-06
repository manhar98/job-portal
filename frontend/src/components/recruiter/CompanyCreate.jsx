import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { Building2, Loader2, ArrowLeft } from 'lucide-react';

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async (e) => {
        e.preventDefault();
        if (!companyName.trim()) {
            setErrorMsg("Company name is required.");
            return;
        }

        try {
            setLoading(true);
            setErrorMsg("");
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            console.error("Register Company Error:", error);
            setErrorMsg(error?.response?.data?.message || "Failed to create company.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-12 flex-1 w-full">
                <button
                    onClick={() => navigate("/admin/companies")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Companies
                </button>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8">
                    <div className="inline-flex bg-indigo-50 p-3 rounded-2xl text-indigo-600 mb-4">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900">Your Company Name</h1>
                    <p className="text-xs text-slate-500 mt-1 mb-6">
                        What would you like to name your company? You can change this later.
                    </p>

                    {errorMsg && (
                        <div className="mb-4 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={registerNewCompany} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Company Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Google, Microsoft, Tech Corp..."
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/companies")}
                                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue to Details"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CompanyCreate;
