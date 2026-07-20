"use client";

import { signOut } from "next-auth/react";
import type { ViewKey } from "@/lib/types";

const NAV_ROLES: { key: ViewKey; label: string }[] = [
  { key: "se", label: "Sales Engineers" },
  { key: "ae", label: "Account Executives" },
  { key: "cs", label: "Customer Success" },
];

export default function Sidebar({
  view,
  setView,
}: {
  view: ViewKey;
  setView: (v: ViewKey) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="dot" />
        <div>
          <div className="brand-title">Content Hub</div>
          <div className="brand-sub">Orca Security · GTM</div>
        </div>
      </div>
      <nav className="navlist">
        <button
          className={`nav-item${view === "home" ? " active" : ""}`}
          onClick={() => setView("home")}
        >
          <span className="nav-icon">⌂</span> Home
        </button>
        <div className="nav-label">By Role</div>
        {NAV_ROLES.map((r) => (
          <button
            key={r.key}
            className={`nav-item${view === r.key ? " active" : ""}`}
            onClick={() => setView(r.key)}
          >
            <span className="nav-icon">◆</span> {r.label}
          </button>
        ))}
        <div className="nav-label">Library</div>
        <button
          className={`nav-item${view === "archive" ? " active" : ""}`}
          onClick={() => setView("archive")}
        >
          <span className="nav-icon">▤</span> Legacy Archive
        </button>
        <button
          className={`nav-item${view === "submit" ? " active" : ""}`}
          onClick={() => setView("submit")}
        >
          <span className="nav-icon">＋</span> Submit New Asset
        </button>
      </nav>
      <div className="sidebar-footer">
        <div>
          <span className="sync-dot" />
          Synced with Google Drive
        </div>
        <button className="signout-btn" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
