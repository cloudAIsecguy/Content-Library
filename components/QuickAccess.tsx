"use client";

import { useEffect, useState } from "react";
import { fetchDrive } from "@/lib/driveClient";

type PreviewState =
  | { kind: "loading" }
  | { kind: "title"; title: string; href?: string }
  | { kind: "empty"; message: string }
  | { kind: "placeholder"; message: string };

interface StoredAsset {
  id?: string;
  name?: string;
  title?: string;
  webViewLink?: string;
  href?: string;
}

function readStoredList(key: string): StoredAsset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function titleFromStored(item: StoredAsset | undefined): PreviewState {
  if (!item) return { kind: "empty", message: "No favorites yet" };
  const title = (item.name || item.title || "").trim();
  if (!title) return { kind: "empty", message: "No favorites yet" };
  return {
    kind: "title",
    title,
    href: item.webViewLink || item.href,
  };
}

function QuickCard({
  icon,
  title,
  description,
  preview,
  action,
  onOpen,
}: {
  icon: string;
  title: string;
  description: string;
  preview: PreviewState;
  action: string;
  onOpen?: () => void;
}) {
  const previewBody =
    preview.kind === "loading" ? (
      <div className="quick-preview muted">Loading...</div>
    ) : preview.kind === "title" ? (
      preview.href ? (
        <a
          className="quick-preview title"
          href={preview.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {preview.title}
        </a>
      ) : (
        <div className="quick-preview title">{preview.title}</div>
      )
    ) : (
      <div className="quick-preview muted">{preview.message}</div>
    );

  if (onOpen) {
    return (
      <button type="button" className="quick-card quick-card-preview quick-card-clickable" onClick={onOpen}>
        <div className="quick-card-head">
          <span className="quick-icon" aria-hidden>
            {icon}
          </span>
          <div>
            <div className="quick-title">{title}</div>
            <div className="quick-desc">{description}</div>
          </div>
        </div>
        <div className="quick-preview-area">{previewBody}</div>
        <div className="quick-cta">{action}</div>
      </button>
    );
  }

  return (
    <div className="quick-card quick-card-preview">
      <div className="quick-card-head">
        <span className="quick-icon" aria-hidden>
          {icon}
        </span>
        <div>
          <div className="quick-title">{title}</div>
          <div className="quick-desc">{description}</div>
        </div>
      </div>
      <div className="quick-preview-area">{previewBody}</div>
      <div className="quick-cta">{action}</div>
    </div>
  );
}

export default function QuickAccess({ onOpenFavorites }: { onOpenFavorites?: () => void }) {
  const [favorites, setFavorites] = useState<PreviewState>({ kind: "loading" });
  const [recent, setRecent] = useState<PreviewState>({ kind: "loading" });
  const [newest, setNewest] = useState<PreviewState>({ kind: "loading" });

  useEffect(() => {
    const favs = readStoredList("content-hub:favorites");
    const recents = readStoredList("content-hub:recent");

    setFavorites(
      favs.length
        ? titleFromStored(favs[0])
        : { kind: "empty", message: "No favorites yet" }
    );
    setRecent(
      recents.length
        ? (() => {
            const item = recents[0];
            const title = (item.name || item.title || "").trim();
            if (!title) return { kind: "empty" as const, message: "No recent activity" };
            return {
              kind: "title" as const,
              title,
              href: item.webViewLink || item.href,
            };
          })()
        : { kind: "empty", message: "No recent activity" }
    );

    let cancelled = false;
    fetchDrive("trashed = false", 1, "createdTime desc").then((res) => {
      if (cancelled) return;
      const file = res.files.find((f) => !f.mimeType.includes("folder")) || res.files[0];
      if (!file?.name) {
        setNewest({ kind: "empty", message: "No new content" });
        return;
      }
      setNewest({
        kind: "title",
        title: file.name,
        href: file.webViewLink,
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="section home-section">
      <div className="section-head">
        <h2>Quick Access</h2>
      </div>
      <div className="quick-grid">
        <QuickCard
          icon="⭐"
          title="Favorites"
          description="Content you have saved"
          preview={favorites}
          action="View favorites →"
          onOpen={onOpenFavorites}
        />
        <QuickCard
          icon="🕒"
          title="Recent"
          description="Continue where you left off"
          preview={recent}
          action="View recent →"
        />
        <QuickCard
          icon="🆕"
          title="New"
          description="Recently published content"
          preview={newest}
          action="View new content →"
        />
        <QuickCard
          icon="🔥"
          title="Popular"
          description="Most-used GTM content"
          preview={{ kind: "placeholder", message: "Popularity tracking coming soon" }}
          action="View popular →"
        />
      </div>
    </div>
  );
}
