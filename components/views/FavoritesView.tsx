"use client";

import { useEffect, useState } from "react";

interface StoredAsset {
  id?: string;
  name?: string;
  title?: string;
  webViewLink?: string;
  href?: string;
}

function readFavorites(): StoredAsset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("content-hub:favorites");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function FavoritesView() {
  const [items, setItems] = useState<StoredAsset[] | null>(null);

  useEffect(() => {
    setItems(readFavorites());
  }, []);

  const list = items || [];

  return (
    <>
      <h1 className="pagetitle">Favorites</h1>
      <p className="pagesub">Save frequently used GTM assets for quick access.</p>

      {items === null ? (
        <div className="empty">Loading…</div>
      ) : list.length === 0 ? (
        <div className="empty">You have not saved any content yet.</div>
      ) : (
        <div className="card-grid">
          {list.map((item, i) => {
            const title = (item.name || item.title || "").trim() || "Untitled";
            const href = item.webViewLink || item.href;
            const key = item.id || `${title}-${i}`;
            if (href) {
              return (
                <a
                  key={key}
                  className="file-card"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="top-row">
                    <span className="file-icon">⭐</span>
                    <span className="file-title">{title}</span>
                  </div>
                </a>
              );
            }
            return (
              <div key={key} className="file-card">
                <div className="top-row">
                  <span className="file-icon">⭐</span>
                  <span className="file-title">{title}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
