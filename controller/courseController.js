import {Course} from '../models/Course.js'
import { catchAsyncError } from '../middlewares/catchAsyncError.js';

export const getAllCourses=catchAsyncError(async(req,res,next)=>{
    const courses=await Course.find();
    res.status(200).json({
        success:true,
        courses,
    });
});