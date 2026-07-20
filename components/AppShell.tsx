"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import SignIn from "@/components/SignIn";
import HomeView from "@/components/views/HomeView";
import FavoritesView from "@/components/views/FavoritesView";
import RoleView from "@/components/views/RoleView";
import ArchiveView from "@/components/views/ArchiveView";
import LibraryHealthView from "@/components/views/LibraryHealthView";
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
        <TopBar
          userInitials={initials}
          onSearch={(term) => setSearchTerm(term)}
          hideSearch={view === "home" && !searchTerm}
        />
        <main className="view">
          {searchTerm ? (
            <SearchResultsView term={searchTerm} />
          ) : view === "home" ? (
            <HomeView setView={handleSetView} onSearch={(term) => setSearchTerm(term)} />
          ) : view === "favorites" ? (
            <FavoritesView />
          ) : view === "archive" ? (
            <ArchiveView />
          ) : view === "health" ? (
            <LibraryHealthView />
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
