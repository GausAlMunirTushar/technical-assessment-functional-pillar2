import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DEFAULT_USER_ROLE, isUserRole } from "@/types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (email && password) {
          return {
            id: "1",
            name: email.split("@")[0] || "User",
            email: email,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = isUserRole(user.role) ? user.role : DEFAULT_USER_ROLE;
      }
      if (trigger === "update" && session && typeof session === "object" && "role" in session) {
        const newRole = (session as { role: unknown }).role;
        if (isUserRole(newRole)) {
          token.role = newRole;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = isUserRole(token.role) ? token.role : DEFAULT_USER_ROLE;
      }
      return session;
    },
  },
});
