/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextResponse } from "next/server";

// ✅ GET - Get student by ID
export async function GET(
  req: Request,
  context: any 
) {
  try {
    await connectDB();
    const { id } = context.params;
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ PATCH - Update student by ID
export async function PATCH(
  req: Request,
  context: any
) {
  try {
    await connectDB();
    const { id } = context.params;
    const updates = await req.json();

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStudent) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student updated" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
