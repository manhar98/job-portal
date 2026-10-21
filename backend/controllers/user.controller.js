import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 1. REGISTER
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Resume or file if uploaded
        let fileUrl = "";
        let originalName = "";
        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
            originalName = req.file.originalname;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: fileUrl,
                resume: fileUrl,
                resumeOriginalName: originalName
            }
        });

        return res.status(201).json({
            message: `Account created successfully as ${role}!`,
            success: true
        });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            message: "Internal server error during registration.",
            success: false
        });
    }
};

// 2. LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required.",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check role match
        if (role !== user.role) {
            return res.status(400).json({
                message: `Account does not exist with role '${role}'.`,
                success: false
            });
        }

        // Check if account blocked by admin
        if (user.profile && user.profile.isBlocked) {
            return res.status(403).json({
                message: "Your account has been suspended by the Admin. Please contact support.",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id,
            role: user.role
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '7d' });

        const safeUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax'
        }).json({
            message: `Welcome back, ${user.fullname}!`,
            user: safeUser,
            token,
            success: true
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal server error during login.",
            success: false
        });
    }
};

// 3. LOGOUT
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            message: "Internal server error during logout.",
            success: false
        });
    }
};

// 4. UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id; // from isAuthenticated

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        if (skills) {
            // handle skills whether string or array
            user.profile.skills = typeof skills === 'string' 
                ? skills.split(",").map(s => s.trim()).filter(Boolean)
                : skills;
        }

        if (req.file) {
            user.profile.resume = `/uploads/${req.file.filename}`;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({
            message: "Internal server error during profile update.",
            success: false
        });
    }
};

// 5. GET LOGGED IN USER
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password").populate("profile.company");
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
