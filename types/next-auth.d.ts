import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      academicId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    academicId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    academicId?: string;
  }
}
