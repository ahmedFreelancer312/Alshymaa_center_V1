/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import Schedule from "../../../../../models/schedule";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    await connectDB();
    const { id } = context.params;
    const schedule = await Schedule.findById(id);

    if (!schedule) {
      return NextResponse.json({ message: "schedule not found" }, { status: 404 });
    }

    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: any) {
  try {
    const { id } = context.params;
    const updates = await req.json();

    const updateSchedule = await Schedule.findByIdAndUpdate(id, updates, { new: true });

    if (!updateSchedule) {
      return NextResponse.json({ message: "Schedule not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Schedule updated" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
