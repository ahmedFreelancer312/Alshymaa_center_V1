/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import "@/models/course";
import "@/models/file";
import { Types } from "mongoose";

interface FileType {
  _id: Types.ObjectId;
  filename: string;
  url: string;
  [key: string]: any;
}

interface CourseType {
  _id: Types.ObjectId;
  courseName: string;
  courseCode: string;
  files: FileType[];
}

interface PopulatedStudent {
  _id: Types.ObjectId;
  academicId: string;
  courses: CourseType[];
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const student = await Student.findOne({ academicId: session.user?.academicId })
    .populate({
      path: "courses",
      populate: {
        path: "files",
        model: "File",
      },
    }) as PopulatedStudent | null;

  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  const allFiles = student.courses.flatMap((course) =>
    course.files.map((file) => ({
      ...file.toObject?.() ?? file,
      courseName: course.courseName,
      courseCode: course.courseCode,
    }))
  );

  return NextResponse.json({
    files: allFiles,
    totalFiles: allFiles.length,
  });
}
