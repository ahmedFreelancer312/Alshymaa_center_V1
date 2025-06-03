/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import Assignment from "@/models/assignment";
import Course from "@/models/course";
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
    const assignmentCode = formData.get('assignmentCode') as string;
    const courseCode = formData.get('courseCode') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dueDate = formData.get('dueDate') as string;

    const assignmentExist = await Assignment.findOne({ assignmentCode });
    if (assignmentExist) {
      return NextResponse.json({ message: "Assignment already exists" }, { status: 400 });
    }

    let fileUrl = null;
    
    if (file) {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'assignment_files',
            type: 'upload',
            public_id: `${assignmentCode}_${Date.now()}`,
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
      
      fileUrl = (uploadResult as any).secure_url;
    }

    const assignment = await Assignment.create({
      assignmentCode,
      courseCode,
      title,
      description,
      dueDate,
      fileUrl
    });

    const courses = await Course.find({ courseCode });
    const updatePromises = courses.map(async (course) => {
      try {
        if (!course.assignments.some((a: any) => a.equals(assignment._id))) {
          course.assignments.push(assignment._id);
          await course.save();
        }
      } catch (error) {
        console.error(`Error updating course ${course.courseCode}:`, error);
      }
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      {
        message: "Assignment created successfully",
        addedTo: courses.length,
        fileUrl: fileUrl
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in assignment creation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}