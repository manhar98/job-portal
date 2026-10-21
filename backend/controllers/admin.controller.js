import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";

// 1. Get Admin Dashboard Analytics / Stats
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobSeekers = await User.countDocuments({ role: "jobseeker" });
        const totalRecruiters = await User.countDocuments({ role: "recruiter" });
        const totalJobs = await Job.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalApplications = await Application.countDocuments();

        const pendingApps = await Application.countDocuments({ status: "pending" });
        const acceptedApps = await Application.countDocuments({ status: "accepted" });
        const rejectedApps = await Application.countDocuments({ status: "rejected" });

        return res.status(200).json({
            stats: {
                totalUsers,
                totalJobSeekers,
                totalRecruiters,
                totalJobs,
                totalCompanies,
                totalApplications,
                pendingApps,
                acceptedApps,
                rejectedApps
            },
            success: true
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 2. Get All Users (Admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({
            users,
            success: true
        });
    } catch (error) {
        console.error("Admin Get Users Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 3. Block or Unblock User (Admin)
export const toggleBlockUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        user.profile.isBlocked = !user.profile.isBlocked;
        await user.save();

        return res.status(200).json({
            message: `User ${user.profile.isBlocked ? "suspended" : "reactivated"} successfully.`,
            user,
            success: true
        });
    } catch (error) {
        console.error("Toggle Block User Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 4. Delete User (Admin)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        await Application.deleteMany({ applicant: userId });
        await Job.deleteMany({ created_by: userId });

        return res.status(200).json({
            message: "User and related records removed successfully.",
            success: true
        });
    } catch (error) {
        console.error("Delete User Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// 5. Monitor all applications (Admin)
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate({ path: "job", select: "title location salary" })
            .populate({ path: "applicant", select: "fullname email phoneNumber" })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error("Get All Applications Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
