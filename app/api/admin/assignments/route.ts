/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Assignment from "../../../../models/assignment";

export async function GET(req: Request) {
    try {
        await connectDB()
        const assignments = await Assignment.find({})
        return new Response(JSON.stringify(assignments), {status: 200})
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return new Response("Failed to fetch assignments", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB()
        const {id} = await req.json()
        const assignment = await Assignment.findByIdAndDelete(id)
        if(!assignment) {
            return NextResponse.json({message: "Assignment not found"}, { status: 404 });
        }
        return NextResponse.json({message: "Assignment deleted successfully"}, { status: 200 });
    } catch (error) {
        console.error("Error deleting assignment:", error);
        return new Response("Failed to delete assignment", { status: 500 });
    }
}