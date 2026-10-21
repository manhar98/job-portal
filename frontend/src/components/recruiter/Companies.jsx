import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanies } from '../../redux/companySlice';
import { Building2, Plus, Edit, ExternalLink, MapPin } from 'lucide-react';

const Companies = () => {
    const { companies } = useSelector(store => store.company);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Fetch Companies Error:", error);
            }
        };
        fetchCompanies();
    }, [dispatch]);

    const filteredCompanies = (companies || []).filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Registered Companies</h1>
                        <p className="text-xs text-slate-500 mt-1">Manage company profiles before posting jobs</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" /> Add Company
                    </button>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search company by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-80 px-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {filteredCompanies.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                        <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-800">No companies found</h3>
                        <p className="text-xs text-slate-500 mt-1">Click "Add Company" above to register your first company.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompanies.map((company) => (
                            <div 
                                key={company._id} 
                                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 overflow-hidden">
                                            {company.logo ? (
                                                <img src={`http://localhost:8000${company.logo}`} alt="logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 className="w-6 h-6 text-indigo-600" />
                                            )}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base">{company.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                        {company.description || "No description provided."}
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" /> {company.location || "Location not set"}
                                    </span>
                                    {company.website && (
                                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                                            Visit <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Companies;
