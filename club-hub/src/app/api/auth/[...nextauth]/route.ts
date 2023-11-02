import dbConnect from "@/lib/connectDB"; // Update the import path
import Student from "@/lib/models/Student"; // Update the import path
import Club from "@/lib/models/Club"; // Update the import path
import bcrypt from "bcrypt";

import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await dbConnect();

          const student = await Student.findOne({ email });
          if (!student) {
            const club = await Club.findOne({ email });
            if (!club) {
              return null; // Indicate invalid credentials
            } else {
              const passMatch = await bcrypt.compare(password, club.password);
              if (passMatch) {
                return {
                  email: club.email,
                  name: "club",
                  image: club.school,
                } as any;
              }
            }
          } else {
            const passMatch = await bcrypt.compare(password, student.password);
            if (passMatch) {
              return {
                email: student.email,
                name: "student",
                image: student.school,
              } as any;
            }
          }
          return null; // Indicate invalid credentials
        } catch (error) {
          console.log(error);
          return null; // Indicate an error occurred
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      return Promise.resolve(session);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
