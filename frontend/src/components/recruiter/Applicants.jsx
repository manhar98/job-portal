import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ApplicantsTable from './ApplicantsTable';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { setAllApplicants } from '../../redux/applicationSlice';
import { ArrowLeft, Users } from 'lucide-react';

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    const fetchAllApplicants = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAllApplicants(res.data.job));
            }
        } catch (error) {
            console.error("Fetch Applicants Error:", error);
        }
    };

    useEffect(() => {
        fetchAllApplicants();
    }, [id, dispatch]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                <button
                    onClick={() => navigate("/admin/jobs")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to My Jobs
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Users className="w-6 h-6 text-indigo-600" />
                            Applicants ({applicants?.applications?.length || 0})
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Role: <span className="font-semibold text-slate-800">{applicants?.title || "Job Position"}</span>
                        </p>
                    </div>
                </div>

                <ApplicantsTable onStatusChange={fetchAllApplicants} />
            </div>
            <Footer />
        </div>
    );
};

export default Applicants;
