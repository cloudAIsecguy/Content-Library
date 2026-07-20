"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import SignIn from "@/components/SignIn";
import HomeView from "@/components/views/HomeView";
import RoleView from "@/components/views/RoleView";
import ArchiveView from "@/components/views/ArchiveView";
import SubmitView from "@/components/views/SubmitView";
import SearchResultsView from "@/components/views/SearchResultsView";
import type { ViewKey } from "@/lib/types";

export default function AppShell() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [view, setView] = useState<ViewKey>("home");
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  if (status === "loading") {
    return <div className="signin-screen" />;
  }

  if (!session) {
    return <SignIn error={searchParams?.get("error") || undefined} />;
  }

  const userName = session.user?.name || session.user?.email || "?";
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function handleSetView(v: ViewKey) {
    setSearchTerm(null);
    setView(v);
  }

  return (
    <div id="app">
      <Sidebar view={view} setView={handleSetView} />
      <div className="content">
        <div className="banner">
          Role pages are wired to the real folders inside your Content Library Drive folder. The
          mapping of folder → role is a first-pass guess — see Housekeeping on Home and the note
          in Legacy Archive for what needs a human decision. Global search queries your whole
          Drive.
        </div>
        <TopBar userInitials={initials} onSearch={(term) => setSearchTerm(term)} />
        <main className="view">
          {searchTerm ? (
            <SearchResultsView term={searchTerm} />
          ) : view === "home" ? (
            <HomeView setView={handleSetView} />
          ) : view === "archive" ? (
            <ArchiveView />
          ) : view === "submit" ? (
            <SubmitView />
          ) : (
            <RoleView roleKey={view} />
          )}
        </main>
      </div>
    </div>
  );
}
