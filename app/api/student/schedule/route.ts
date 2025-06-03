/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import "@/models/schedule";

export async function GET(req: Request) {

    const session = await getServerSession(authOptions);
    
    if(!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const student = await Student.findOne({academicId: session.user?.academicId}).populate("schedules")

    if(!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ schedules: student.schedules || [] });

}