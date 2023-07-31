import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseLecture,
  addLecture,
  deleteCourse,
  deleteLecture,
  
} from "../controller/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { isAuthenticated, authorizedAdmin,authorizedSubscribes } from "../middlewares/auth.js";
const router = express.Router();
router.route("/courses").get(getAllCourses);
router
  .route("/createcourses")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);
router
  .route("/course/:id")
  .get(isAuthenticated, authorizedSubscribes, getCourseLecture)
  .post(isAuthenticated, authorizedAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizedAdmin, deleteCourse);

router
  .route("/lecture")
  .delete(isAuthenticated, authorizedAdmin, deleteLecture);

export default router;
