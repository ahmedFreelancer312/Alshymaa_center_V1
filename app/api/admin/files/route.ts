/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import File from "../../../../models/file";

export async function GET(req: Request) {
    try {
        await connectDB()
        const files = await File.find({})
         return new Response(JSON.stringify(files) , {status: 200})
    } catch (error) {
        console.error("Error fetching files:", error);
        return new Response("Failed to fetch files", { status: 500 });
    }
}

export async function DELETE(req : Request) {
    try {
        await connectDB()
        const {id} = await req.json()
        const file = await File.findByIdAndDelete(id)
        if(!file) {
            return NextResponse.json(({message : "file not found"}), { status: 404 });
        }
        return NextResponse.json(({message : "file deleted successfully"}), { status: 200 });
    } catch (error) {
                console.error("Error deleting file:", error);
        return new Response("Failed to delete file", { status: 500 });
    }
    
}