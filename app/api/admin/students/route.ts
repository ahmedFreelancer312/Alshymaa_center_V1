/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB()
        const students = await Student.find({})
        return new Response(JSON.stringify(students) , {status: 200})
    } catch (error) {
        console.error("Error fetching students:", error);
        return new Response("Failed to fetch students", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB()
        const { id } = await req.json()
        const student = await Student.findByIdAndDelete(id)
        if (!student) {
            return NextResponse.json(({message : "Student not found"}), { status: 404 });
        }
        return new Response("Student deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting student:", error);
        return new Response("Failed to delete student", { status: 500 });
    }
}

