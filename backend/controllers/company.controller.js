import { Company } from "../models/company.model.js";

// Register Company (Recruiter / Admin)
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName.trim() });
        if (company) {
            return res.status(400).json({
                message: "A company with this name already exists.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName.trim(),
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Register Company Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get all companies for current recruiter
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error("Get Companies Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get single company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error("Get Company By ID Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Update company info
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        let logo = undefined;
        if (req.file) {
            logo = `/uploads/${req.file.filename}`;
        }

        const updateData = { name, description, website, location };
        if (logo) updateData.logo = logo;

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Update Company Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
