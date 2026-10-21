import React, { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate(`/jobs?keyword=${encodeURIComponent(query)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white pt-16 pb-20 text-center">
            {/* Background blur decorative shapes */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6">
                    <Sparkles className="w-4 h-4 text-indigo-600" /> No. 1 Job Portal Platform
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Search, Apply & <br />
                    Get Your <span className="text-indigo-600">Dream Job</span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Connecting top tech talent with industry-leading companies. Discover thousands of verified career opportunities waiting for you.
                </p>

                {/* Search Bar */}
                <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-lg border border-slate-200/80">
                    <div className="flex-1 flex items-center gap-2 w-full px-3">
                        <Search className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full py-2.5 text-sm bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
                        />
                    </div>
                    <button
                        onClick={searchJobHandler}
                        className="w-full sm:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                    >
                        Search Jobs
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <span>Popular:</span>
                    <button onClick={() => { setQuery("React"); dispatch(setSearchedQuery("React")); navigate("/jobs?keyword=React"); }} className="hover:text-indigo-600 underline">React Developer</button>
                    <span>•</span>
                    <button onClick={() => { setQuery("Node"); dispatch(setSearchedQuery("Node")); navigate("/jobs?keyword=Node"); }} className="hover:text-indigo-600 underline">Node.js</button>
                    <span>•</span>
                    <button onClick={() => { setQuery("Full Stack"); dispatch(setSearchedQuery("Full Stack")); navigate("/jobs?keyword=Full Stack"); }} className="hover:text-indigo-600 underline">Full Stack</button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
