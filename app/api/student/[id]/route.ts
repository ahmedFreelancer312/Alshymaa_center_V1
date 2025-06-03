/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import Student from "@/models/student";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// ✅ GET courses of logged-in student
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const student = await Student.findOne({ academicId: session.user?.academicId });

  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ courses: student.courses || [] });
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
