/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import File from "../../../../../models/file";
import Course from "../../../../../models/course";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileCode = formData.get('fileCode') as string;
    const courseCode = formData.get('courseCode') as string;
    const fileName = formData.get('fileName') as string;
    const fileDescription = formData.get('fileDescription') as string;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const fileExist = await File.findOne({ fileCode });
    if (fileExist) {
      return NextResponse.json({ message: "File already exists" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'course_files',
          type: 'upload', 
      public_id: `${fileCode}_${Date.now()}`, 
      access_mode: 'public',
      format: 'pdf',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const readable = new Readable();
      readable.push(uint8Array);
      readable.push(null);
      readable.pipe(uploadStream);
    });

    if (!uploadResult) {
      throw new Error('Cloudinary upload failed');
    }

    const newFile = await File.create({
      fileCode,
      courseCode,
      fileName,
      fileDescription,
      fileUrl: (uploadResult as any).secure_url
    });

    const courses = await Course.find({ courseCode });
    const updatePromises = courses.map(async (course) => {
      try {
        if (!course.files.some((f: any) => f.equals(newFile._id))) {
          course.files.push(newFile._id);
          await course.save();
        }
      } catch (error) {
        console.error(`Error updating course ${course.courseCode}:`, error);
      }
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      {
        message: "File uploaded to Cloudinary and added to Courses successfully",
        addedTo: courses.length,
        fileUrl: (uploadResult as any).secure_url
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}