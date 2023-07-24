import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      console.log("No token found");
      return next(new ErrorHandler("Not Logged in", 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
  
      const user = await User.findById(decoded._id);
      console.log("User found:", user);
  
      if (!user) {
        console.log("User not found");
        return next(new ErrorHandler("User not found", 404));
      }
  
      req.user = user;
      next();
    } catch (err) {
      console.log("Token verification error:", err);
      return next(new ErrorHandler("Invalid Token", 401));
    }
  });
  


  
export const authorizedAdmin = catchAsyncError(async (req, res, next) => {
  if(req.user.role !=="admin")
  return next(
    new ErrorHandler(
      `${req.user.role} is not allowed to access this resource`,403
    )
    
  )
  next()
});


