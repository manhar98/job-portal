import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { ArrowLeft, Loader2, Upload, Building2 } from 'lucide-react';

const CompanySetup = () => {
    const { id: companyId } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [previewLogo, setPreviewLogo] = useState("");

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    const c = res.data.company;
                    setInput({
                        name: c.name || "",
                        description: c.description || "",
                        website: c.website || "",
                        location: c.location || "",
                        file: null
                    });
                    if (c.logo) setPreviewLogo(`http://localhost:8000${c.logo}`);
                }
            } catch (error) {
                console.error("Fetch Single Company Error:", error);
            }
        };
        fetchCompanyDetails();
    }, [companyId]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
        if (file) {
            setPreviewLogo(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error("Update Company Error:", error);
            setErrorMsg(error?.response?.data?.message || "Failed to update company.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-10 flex-1 w-full">
                <button
                    onClick={() => navigate("/admin/companies")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Companies
                </button>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8">
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Company Setup</h1>
                    <p className="text-xs text-slate-500 mb-6">Complete your company profile to start posting jobs</p>

                    {errorMsg && (
                        <div className="mb-4 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    required
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Ahmedabad, India"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Website URL</label>
                            <input
                                type="url"
                                name="website"
                                placeholder="https://company.com"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Company Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder="Describe what your company does..."
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Company Logo</label>
                            <div className="flex items-center gap-4">
                                {previewLogo ? (
                                    <img src={previewLogo} alt="Logo" className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                                ) : (
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                )}
                                <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-400 text-xs text-slate-600 bg-slate-50">
                                    <Upload className="w-4 h-4 text-indigo-500" />
                                    <span>Upload Logo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/companies")}
                                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Company"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CompanySetup;
