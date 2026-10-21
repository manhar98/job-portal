import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: String,
        default: "0-1 Year"
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "General",
        trim: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        default: 1
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
