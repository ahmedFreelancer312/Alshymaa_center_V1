import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  fileCode: string;
  courseCode: string;
  fileName: string;
  fileDescription: string;
  fileUrl: string;
}

export const filesSchema = new Schema<IFile>(
  {
    fileCode: {
      type: String,
      required: true,
      unique: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileDescription: {
      type: String,
      required: true,
    },
    fileUrl: { 
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const File = mongoose.models.File || mongoose.model("File", filesSchema);

export default File;