import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Job Seeker applies to a job
router.route("/apply/:id").get(isAuthenticated, authorizeRoles("jobseeker", "admin"), applyJob);

// Job Seeker views applied jobs
router.route("/get").get(isAuthenticated, authorizeRoles("jobseeker", "admin"), getAppliedJobs);

// Recruiter views applicants for a job
router.route("/:id/applicants").get(isAuthenticated, authorizeRoles("recruiter", "admin"), getApplicants);

// Recruiter updates status of an application
router.route("/status/:id/update").post(isAuthenticated, authorizeRoles("recruiter", "admin"), updateStatus);

export default router;
