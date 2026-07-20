"use client";

import { useState } from "react";

export default function TopBar({
  userInitials,
  onSearch,
  hideSearch = false,
}: {
  userInitials: string;
  onSearch: (term: string) => void;
  hideSearch?: boolean;
}) {
  const [term, setTerm] = useState("");
  return (
    <div className="topbar">
      {!hideSearch && (
        <div className="search-wrap">
          <span className="icon">⌕</span>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && term.trim()) onSearch(term.trim());
            }}
            placeholder="Search content... (e.g. AWS migration, Wiz battlecard, ROI calculator)"
          />
        </div>
      )}
      <div className="topbar-right">
        <span className="pill pill-quiet">
          <span className="pill-dot" aria-hidden />
          Synced
        </span>
        <div className="avatar">{userInitials}</div>
      </div>
    </div>
  );
}
