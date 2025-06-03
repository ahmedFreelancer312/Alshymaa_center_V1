/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB()
        const courses = await Course.find({})
        return new Response(JSON.stringify(courses) , {status: 200})
    } catch (error) {
        console.error("Error fetching courses:", error);
        return new Response("Failed to fetch courses", { status: 500 });
    }
}

export async function DELETE(req: Request) {

    try {
        await connectDB()
        const { id } = await req.json()
        const course = await Course.findByIdAndDelete(id)
        if (!course) {
            return NextResponse.json(({message : "Course not found"}), { status: 404 });
        }
        return NextResponse.json(({message : "Course deleted successfully"}), { status: 200 });

    } catch (error) {
        console.error("Error deleting course:", error);
        return new Response("Failed to delete course", { status: 500 });
    }

}
