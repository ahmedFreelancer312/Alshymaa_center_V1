import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/schedule";
import Student from "@/models/student";

export async function POST(req: Request) { 
    const { meetingCode, meetingTitle, startTime, endTime, department, faculty, instructor , academicLevel , description } = await req.json();

    try {
        await connectDB();
        const scheduleExist = await Schedule.findOne({meetingCode})
        if (scheduleExist) {
            return NextResponse.json({message: "Schedule already exists"}, {status: 400})
        }
        const schedule = await Schedule.create({
            meetingCode,
            meetingTitle,
            startTime,
            endTime,
            department,
            faculty,
            instructor,
            academicLevel,
            description
        });

        const students = await Student.find({
            faculty,
            department,
            academicLevel,
            role: 'student'
        })   

        const updatePromises = students.map(async (student)=> {
            try {
                if(!student.schedules.some((s : typeof schedule._id) => s.equals(schedule._id))) {
                    student.schedules.push(schedule._id);
                    await student.save();
                    console.log(`Schedule added to student ${student.academicId}`);
                }
            } catch (error) {
                console.error(`Error updating student ${student.academicId}:`, error);
            }
        })

              await Promise.all(updatePromises);
          
              return NextResponse.json(
                { 
                  message: "Schedule created and added to students successfully",
                  addedTo: students.length
                }, 
                { status: 201 }
              );


        } catch (error) {
          console.error("Error in Schedule creation:", error);
          return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
          );
        }
}