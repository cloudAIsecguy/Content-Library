import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_DOMAIN = "orca.security";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/drive.readonly",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    // Restrict sign-in to the company Workspace domain.
    async signIn({ profile }) {
      const email = (profile as { email?: string } | undefined)?.email;
      if (!email) return false;
      return email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`);
    },
    // Persist the Google OAuth access token (and refresh token) on the JWT.
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : undefined;
      }
      // Access token is still valid.
      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }
      // Expired — try to refresh it.
      if (!token.refreshToken) return token;
      try {
        const url = "https://oauth2.googleapis.com/token";
        const body = new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken as string,
        });
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
        const refreshed = await res.json();
        if (!res.ok) throw refreshed;
        token.accessToken = refreshed.access_token;
        token.accessTokenExpires = Date.now() + refreshed.expires_in * 1000;
      } catch (err) {
        console.error("Failed to refresh Google access token", err);
        token.error = "RefreshAccessTokenError";
      }
      return token;
    },
    // Expose the access token to the client session so API routes can use it.
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).error = token.error;
      return session;
    },
  },
  pages: {
    error: "/auth-error",
  },
};
