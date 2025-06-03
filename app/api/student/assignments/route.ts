/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import "@/models/course";
import "@/models/assignment";
import { Types } from "mongoose";

// تعريف الأنواع (Interfaces)
interface AssignmentType {
  _id: Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  [key: string]: any;
}

interface CourseType {
  _id: Types.ObjectId;
  courseName: string;
  courseCode: string;
  assignments: AssignmentType[];
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

  try {
    const student = await Student.findOne({ academicId: session.user?.academicId })
      .populate({
        path: "courses",
        populate: {
          path: "assignments",
          model: "Assignment",
        },
      }) as PopulatedStudent | null;

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const allAssignments = student.courses.flatMap((course) =>
      course.assignments.map((assignment) => ({
        ...assignment.toObject?.() ?? assignment,
        courseName: course.courseName,
        courseCode: course.courseCode,
      }))
    );

    return NextResponse.json({
      assignments: allAssignments,
      totalAssignments: allAssignments.length,
    });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
