/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Course from "@/models/course";
import { connectDB } from "@/lib/mongodb";

import "@/models/file";
import "@/models/assignment";

export async function GET(
  request: Request,
  context: any
) {
  try {
    await connectDB();

    const course = await Course.findById(context.params.id)
      .populate("files")
      .populate("assignments");

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
