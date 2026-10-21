import express from "express";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Public routes for job seekers & visitors
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);

// Protected routes for recruiters & admin
router.route("/post").post(isAuthenticated, authorizeRoles("recruiter", "admin"), postJob);
router.route("/getadminjobs").get(isAuthenticated, authorizeRoles("recruiter", "admin"), getAdminJobs);
router.route("/update/:id").put(isAuthenticated, authorizeRoles("recruiter", "admin"), updateJob);
router.route("/delete/:id").delete(isAuthenticated, authorizeRoles("recruiter", "admin"), deleteJob);

export default router;
