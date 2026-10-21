import express from "express";
import { deleteUser, getAdminStats, getAllApplications, getAllUsers, toggleBlockUser } from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.use(isAuthenticated);
router.use(authorizeRoles("admin"));

router.route("/stats").get(getAdminStats);
router.route("/users").get(getAllUsers);
router.route("/users/block/:id").put(toggleBlockUser);
router.route("/users/delete/:id").delete(deleteUser);
router.route("/applications").get(getAllApplications);

export default router;
