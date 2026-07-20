"use client";

import { signIn } from "next-auth/react";

export default function SignIn({ error }: { error?: string }) {
  return (
    <div className="signin-screen">
      <div className="signin-card">
        <div className="dot" />
        <h1>Orca Content Hub</h1>
        <p>
          Sign in with your Orca Security Google account to load your synced
          Drive content.
        </p>
        {error && (
          <div className="error-box" style={{ marginBottom: 16, textAlign: "left" }}>
            {error === "AccessDenied"
              ? "That account isn't on the orca.security domain."
              : `Sign-in error: ${error}`}
          </div>
        )}
        <button className="signin-btn" onClick={() => signIn("google")}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
