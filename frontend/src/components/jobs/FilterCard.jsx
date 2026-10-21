import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const filterData = [
    {
        filterType: "Industry",
        array: [
            "IT & Software", 
            "Marketing & Sales", 
            "Finance & Accounts", 
            "Human Resources", 
            "Design & Creative", 
            "Healthcare", 
            "Customer Support"
        ]
    },
    {
        filterType: "Location",
        array: ["Ahmedabad", "Mumbai", "Bangalore", "Pune", "Delhi NCR", "Remote"]
    },
    {
        filterType: "Job Type",
        array: ["Full-Time", "Part-Time", "Remote", "Internship"]
    }
];

const FilterCard = ({ selectedFilters, setSelectedFilters, onReset }) => {
    const handleRadioChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType] === value ? "" : value
        }));
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Filter className="w-4 h-4 text-indigo-600" /> Filter Jobs
                </h3>
                <button
                    onClick={onReset}
                    className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition"
                >
                    <RotateCcw className="w-3 h-3" /> Reset
                </button>
            </div>

            <div className="space-y-6">
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                            {data.filterType}
                        </h4>
                        <div className="space-y-1.5">
                            {data.array.map((item, idx) => {
                                const isChecked = selectedFilters[data.filterType] === item;
                                return (
                                    <label
                                        key={idx}
                                        className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-0.5 select-none"
                                    >
                                        <input
                                            type="radio"
                                            name={data.filterType}
                                            value={item}
                                            checked={isChecked}
                                            onChange={() => handleRadioChange(data.filterType, item)}
                                            className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                        />
                                        <span>{item}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCard;
