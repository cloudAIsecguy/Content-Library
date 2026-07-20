"use client";

import { useState } from "react";

export default function TopBar({
  userInitials,
  onSearch,
}: {
  userInitials: string;
  onSearch: (term: string) => void;
}) {
  const [term, setTerm] = useState("");
  return (
    <div className="topbar">
      <div className="search-wrap">
        <span className="icon">⌕</span>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && term.trim()) onSearch(term.trim());
          }}
          placeholder="Search all content… (e.g. Upwind, onboarding, ROI)"
        />
      </div>
      <div className="topbar-right">
        <span className="pill">● Drive connected</span>
        <div className="avatar">{userInitials}</div>
      </div>
    </div>
  );
}
