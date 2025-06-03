import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { Admin } from "@/models/admin";
import { Student } from "@/models/student";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "student-credentials", // Student Provider ID
      name: "Student Credentials",
      credentials: {
        academicId: { label: "Academic ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const student = await Student.findOne({ academicId: credentials?.academicId });
        if (!student) {
          throw new Error("No student found with this Academic ID");
        }

        if (student.status === "Inactive") {
          throw new Error("Your account is inactive. Please contact support.");
        }

        const isCorrect = await bcrypt.compare(credentials!.password, student.password);
        if (!isCorrect) {
          throw new Error("Password is incorrect");
        }

        return {
          id: student._id.toString(),
          name: student.name,
          academicId: student.academicId,
          role: "student",
        };
      },
    }),

    CredentialsProvider({
      id: "admin-credentials", // Admin Provider ID
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const admin = await Admin.findOne({ email: credentials?.email });
        if (!admin) {
          throw new Error("No admin found with this email");
        }

        const isCorrect = await bcrypt.compare(credentials!.password, admin.password);
        if (!isCorrect) {
          throw new Error("Password is incorrect");
        }

        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.academicId = user.academicId;
        
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.academicId = token.academicId as string;
      }
      return session;
    },
  },
};
