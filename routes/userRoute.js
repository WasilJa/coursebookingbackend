import express from "express";
import {
  login,
  logout,
  register,
  changePassword,
  forgetPassword,
  resetPassword,
  getMyProfile,
  updateProfile,
  updateProfilePicture,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/changepassword").put(isAuthenticated, changePassword);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword/:token").post(resetPassword);

router.route("/updateprofile").put(isAuthenticated, updateProfile);
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);
router.route("/addplaylist").post(isAuthenticated, addToPlaylist);
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizedAdmin, updateUserRole).delete(isAuthenticated, authorizedAdmin,deleteUser);

export default router;
