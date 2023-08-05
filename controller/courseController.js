import { Course } from "../models/Course.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import {Stats} from "../models/Stats.js"
export const getAllCourses = catchAsyncError(async (req, res, next) => {


  const keyword=req.query.keyword|| "";
  const category=req.query.category|| "";

  const courses = await Course.find({
    title:{
      $regex:keyword,
      $options:"i"
    },
    category:{
      $regex:category,
      $options:"i",
    }
  }).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add a lecture now",
  });
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Course Not Found", 404));

    course.views += 1;
    await course.save();

    res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    next(error);
  }
});

export const addLecture = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Course Not Found", 404));

    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      resource_type: "video",
    });
    course.lectures.push({
      title,
      description,
      video: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
    course.noOfVideos = course.lectures.length;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture added successfully in course",
    });
  } catch (error) {
    next(error);
  }
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Please add all fields", 404));
  await cloudinary.v2.uploader.destroy(course.poster.public_id);
  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];

    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
    console.log(singleLecture.video.public_id);
  }
  // await course.remove();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;
  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not Found", 404));

  const lecture = course.lectures.find((item) => {
    return item._id.toString() === lectureId.toString();
  });

  if (!lecture) {
    return next(new ErrorHandler("Lecture not Found", 404));
  }

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter((item) => {
    return item._id.toString() !== lectureId.toString();
  });

  course.noOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});


Course.watch().on("change",async()=>{
  const stats =await Stats.find({}).sort({createdAt:"desc"}).limit(1);

  const courses=await Course.find({});
  let totalViews=0;
  for (let i=0; i< courses.length; i++){
    const course=courses[i];
    totalViews += course.views;
  }

  stats[0].views=totalViews;
  stats[0].createdAt=new Date( Date.now());

  await stats[0].save();
})