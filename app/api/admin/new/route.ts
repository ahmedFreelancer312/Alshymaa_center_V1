import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Admin } from "@/models/admin"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const {name , email, password , role} = await req.json()
    await connectDB()

    const adminExist = await Admin.findOne({email})
    if(adminExist) return NextResponse.json(({message: "admin already exists"}), {status: 400})

        const hashedPassword = await bcrypt.hash(password , 10)
    const newAdmin = new Admin({name , email, password: hashedPassword, role})

    await newAdmin.save()
    return NextResponse.json({ message: "admin registered successfully" }, { status: 201 });

}