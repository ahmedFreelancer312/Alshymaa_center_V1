import { NextResponse } from "next/server";
import Student from "@/models/student";
import Course from "@/models/course";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    const { courseCode, courseName, department, instructor, faculty, academicLevel, description } = await req.json();
  
    try {
      await connectDB();
  
      const courseExist = await Course.findOne({ courseCode });
      if (courseExist) {
        return NextResponse.json({ message: "Course already exists" }, { status: 400 });
      }
  
      const course = await Course.create({
        courseCode,
        courseName,
        department,
        instructor,
        faculty,
        academicLevel,
        description,
      });
  
      const students = await Student.find({
        faculty,
        department,
        academicLevel,
        role: 'student'
      });
      
      const updatePromises = students.map(async (student) => {
        try {
            if (!student.courses.some((c: typeof course._id) => c.equals(course._id))) {
            student.courses.push(course._id as typeof student.courses[0]);
            await student.save();
            console.log(`Course added to student ${student.academicId}`);
            }
        } catch (error) {
          console.error(`Error updating student ${student.academicId}:`, error);
        }
      });
  
      await Promise.all(updatePromises);
  
      return NextResponse.json(
        { 
          message: "Course created and added to students successfully",
          addedTo: students.length
        }, 
        { status: 201 }
      );
  
    } catch (error) {
      console.error("Error in course creation:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }