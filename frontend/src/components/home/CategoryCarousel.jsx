import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { 
    Code, TrendingUp, DollarSign, Users, Palette, 
    Stethoscope, Headphones, GraduationCap 
} from 'lucide-react';

const categories = [
    { name: "IT & Software", icon: Code, color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
    { name: "Marketing & Sales", icon: TrendingUp, color: "text-rose-600 bg-rose-50 hover:bg-rose-100" },
    { name: "Finance & Accounts", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
    { name: "Human Resources", icon: Users, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" },
    { name: "Design & Creative", icon: Palette, color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
    { name: "Healthcare", icon: Stethoscope, color: "text-teal-600 bg-teal-50 hover:bg-teal-100" },
    { name: "Customer Support", icon: Headphones, color: "text-amber-600 bg-amber-50 hover:bg-amber-100" },
    { name: "Education & Teaching", icon: GraduationCap, color: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100" },
];

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchCategoryHandler = (category) => {
        dispatch(setSearchedQuery(category));
        navigate(`/jobs?keyword=${encodeURIComponent(category)}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Explore Jobs by Industry</h2>
                <p className="text-sm text-slate-500 mt-1">Discover opportunities across tech, business, finance, healthcare & creative sectors</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {categories.map((cat, idx) => {
                    const IconComponent = cat.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => searchCategoryHandler(cat.name)}
                            className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border border-slate-100 transition shadow-2xs hover:shadow group ${cat.color}`}
                        >
                            <div className="p-2.5 rounded-xl bg-white shadow-xs group-hover:scale-110 transition">
                                <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="mt-2.5 text-xs font-semibold text-slate-800 text-center leading-tight">
                                {cat.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryCarousel;
