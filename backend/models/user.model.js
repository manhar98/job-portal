import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['jobseeker', 'recruiter', 'admin'],
        required: true,
        default: 'jobseeker'
    },
    profile: {
        bio: { type: String, default: "" },
        skills: [{ type: String }],
        experience: { type: String, default: "" },
        resume: { type: String, default: "" },
        resumeOriginalName: { type: String, default: "" },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: { type: String, default: "" },
        isBlocked: { type: Boolean, default: false }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
