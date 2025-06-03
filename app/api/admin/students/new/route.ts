import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Student } from "@/models/student"
import bcrypt from "bcryptjs"

export async function POST (req : Request) {
    const {name, academicId, password, faculty, department, academicLevel , coursers , schedules , phone , role , status} = await req.json()
    await connectDB()

    const studentExist = await Student.findOne({academicId})
    if(studentExist) return NextResponse.json(({message: "Student already exists"}), {status: 400})

    const hashedPassword = await bcrypt.hash(password , 10)

    const newStudent = new Student({name, academicId, password: hashedPassword , faculty, department , academicLevel, coursers , schedules, phone , role , status})
    await newStudent.save()

    return NextResponse.json({ message: "Student registered successfully" }, { status: 201 });
}