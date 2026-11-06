import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

// 1. Post a new Job (Recruiter / Admin)
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, category, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !salary || !location || !jobType || !companyId) {
            return res.status(400).json({
                message: "Missing required fields for job posting.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: typeof requirements === 'string' 
                ? requirements.split(",").map(r => r.trim()).filter(Boolean)
                : (requirements || []),
            salary: Number(salary),
            location,
            category: category || "Other",
            jobType,
            experienceLevel: experience || "0-2 Years",
            position: position ? Number(position) : 1,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "Job posted successfully!",
            job,
            success: true
        });
    } catch (error) {
        console.error("Post Job Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 2. Get all jobs with Search & Filter (Job Seeker / Public)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const jobType = req.query.jobType || "";
        const category = req.query.category || "";

        const query = {};

        // Keyword filter: searches title, description or category
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ];
        }

        // Category filter
        if (category) {
            query.category = { $regex: category, $options: "i" };
        }

        // Location filter
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        // Job type filter
        if (jobType) {
            query.jobType = { $regex: jobType, $options: "i" };
        }

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .populate({ path: "created_by", select: "fullname email" })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Get All Jobs Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 3. Get Single Job By ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({ path: "applications" })
            .populate({ path: "company" })
            .populate({ path: "created_by", select: "fullname email" });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error("Get Job By ID Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 4. Get jobs created by current logged in Recruiter
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Get Admin Jobs Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 5. Update Job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, category, jobType, experience, position } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (salary) updateData.salary = Number(salary);
        if (location) updateData.location = location;
        if (category) updateData.category = category;
        if (jobType) updateData.jobType = jobType;
        if (experience) updateData.experienceLevel = experience;
        if (position) updateData.position = Number(position);
        if (requirements) {
            updateData.requirements = typeof requirements === 'string'
                ? requirements.split(",").map(r => r.trim()).filter(Boolean)
                : requirements;
        }

        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Update Job Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 6. Delete Job
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Remove linked applications
        await Application.deleteMany({ job: jobId });

        return res.status(200).json({
            message: "Job and associated applications deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error("Delete Job Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
