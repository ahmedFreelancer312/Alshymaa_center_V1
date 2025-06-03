/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const student = await Student.findOne({ academicId: session.user?.academicId })
    .select("-courses -schedules -password -role -status")
    .lean();

  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student, { status: 200 });
}


// Update student profile
// This route handles the update of the student profile
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { phone, password } = await req.json();

  const updateData: { phone?: string; password?: string } = {};

  if (phone) updateData.phone = phone;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { academicId: session.user?.academicId },
    { $set: updateData },
    { new: true }
  ).select("-courses -schedules -password -role -status");

  if (!updatedStudent) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(updatedStudent, { status: 200 });
}
