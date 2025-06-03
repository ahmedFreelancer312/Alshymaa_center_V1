/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { NextResponse } from "next/server";

// ✅ GET - Get course by ID
export async function GET(
  req: Request,
  context: any
) {
  try {
    await connectDB();
    const { id } = context.params;
    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ PATCH - Update course by ID
export async function PATCH(
  req: Request,
  context: any
) {
  try {
    await connectDB();
    const { id } = context.params;
    const updates = await req.json();

    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCourse) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ 
      message: "Course updated",
      course: updatedCourse 
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
