import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import FilterCard from './FilterCard';
import JobCard from '../home/JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useGetAllJobs from '../../hooks/useGetAllJobs';
import { setSearchedQuery } from '../../redux/jobSlice';
import { Search, Briefcase } from 'lucide-react';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const [filterJobs, setFilterJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        "Job Type": ""
    });
    const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");

    useEffect(() => {
        const keyword = searchParams.get("keyword");
        if (keyword) {
            setSearchTerm(keyword);
            dispatch(setSearchedQuery(keyword));
        }
    }, [searchParams, dispatch]);

    // Apply filtering on client side for instant responsiveness
    useEffect(() => {
        let filtered = allJobs || [];

        // Keyword filter
        if (searchTerm.trim() !== "") {
            const query = searchTerm.toLowerCase();
            filtered = filtered.filter(job => 
                job.title?.toLowerCase().includes(query) ||
                job.description?.toLowerCase().includes(query) ||
                job.category?.toLowerCase().includes(query) ||
                job.company?.name?.toLowerCase().includes(query)
            );
        }

        // Location filter
        if (selectedFilters.Location) {
            filtered = filtered.filter(job => 
                job.location?.toLowerCase().includes(selectedFilters.Location.toLowerCase())
            );
        }

        // Industry / Category filter
        if (selectedFilters.Industry) {
            filtered = filtered.filter(job => 
                job.category?.toLowerCase() === selectedFilters.Industry.toLowerCase() ||
                job.title?.toLowerCase().includes(selectedFilters.Industry.toLowerCase())
            );
        }

        // Job Type filter
        if (selectedFilters["Job Type"]) {
            filtered = filtered.filter(job => 
                job.jobType?.toLowerCase() === selectedFilters["Job Type"].toLowerCase()
            );
        }

        setFilterJobs(filtered);
    }, [allJobs, selectedFilters, searchTerm]);

    const resetFilters = () => {
        setSelectedFilters({
            Location: "",
            Industry: "",
            "Job Type": ""
        });
        setSearchTerm("");
        dispatch(setSearchedQuery(""));
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                {/* Search Bar at Top of Jobs Page */}
                <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex-1 flex items-center gap-2 w-full px-2">
                        <Search className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filter by title, keywords, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full text-sm bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
                        />
                    </div>
                    <div className="text-xs font-semibold text-slate-500 whitespace-nowrap px-3 py-1 bg-slate-100 rounded-lg">
                        {filterJobs.length} Jobs Found
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Filter Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <FilterCard 
                            selectedFilters={selectedFilters} 
                            setSelectedFilters={setSelectedFilters} 
                            onReset={resetFilters}
                        />
                    </div>

                    {/* Right: Jobs Grid */}
                    <div className="flex-1">
                        {filterJobs.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
                                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <h3 className="text-base font-semibold text-slate-800">No jobs match your criteria</h3>
                                <p className="text-xs text-slate-500 mt-1">Try clearing some filters or searching for different keywords.</p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold text-xs rounded-xl hover:bg-indigo-100 transition"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {filterJobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;
