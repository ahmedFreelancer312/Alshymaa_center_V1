/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";

export async function GET(req: Request) {
    try {
        await connectDB()
        const students = await Student.find({}).populate("coursers")
        return new Response(JSON.stringify(students) , {status: 200})
    } catch (error) {
        console.error("Error fetching students:", error);
        return new Response("Failed to fetch students", { status: 500 });
    }
}