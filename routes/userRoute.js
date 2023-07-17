import express from "express";
import { getMyProfile, login, logout,updateProfile, register,changePassword,updateProfilePicture } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/changepassword").put(isAuthenticated, changePassword);
router.route("/updateprofile").put(isAuthenticated, updateProfile);
router.route("/updateprofilepicture").put(isAuthenticated, updateProfilePicture);






export default router;
