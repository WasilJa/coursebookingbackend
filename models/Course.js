import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter Course title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title can't exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter Course title"],
    minLength: [20, "Title must be at least 20 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  noOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    required:true,
  },
  createdBy: {
    type: Number,
    required:[true,"Enter course creator name"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
export const Course = mongoose.model("Course", schema);
