import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DEFAULT_USER_ROLE, isUserRole } from "@/types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
        return false; // Redirect unauthenticated users to /login
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = isUserRole(user.role) ? user.role : DEFAULT_USER_ROLE;
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
