import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "Connected to MongoDB ✅" });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Connection failed ❌" }, { status: 500 });
  }
}
