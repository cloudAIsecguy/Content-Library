"use client";

import { useEffect, useState } from "react";
import { fetchDrive, type DriveFile } from "@/lib/driveClient";
import { iconFor, ownerLabel, relTime, typeLabel } from "@/lib/format";

function descriptionFor(file: DriveFile): string {
  const type = typeLabel(file.mimeType);
  return `${type} from your Content Library — recently updated in Drive.`;
}

export default function FeaturedSection() {
  const [file, setFile] = useState<DriveFile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Future: replace this auto-pick with manually curated featured content
    // (e.g. a fixed Drive file ID or config chosen by GTM leadership).
    fetchDrive("trashed = false", 8, "modifiedTime desc").then((res) => {
      if (cancelled) return;
      const pick =
        res.files.find((f) => f.name && f.webViewLink && !f.mimeType.includes("folder")) ||
        null;
      setFile(pick);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !file?.webViewLink) return null;

  const owner = ownerLabel(file.owners);

  return (
    <div className="section home-section">
      <div className="section-head">
        <h2>Featured</h2>
      </div>
      <a
        className="featured-card"
        href={file.webViewLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="featured-top">
          <span className="featured-badge">Featured</span>
          <span className="featured-type">
            <span className="file-icon" aria-hidden>
              {iconFor(file.mimeType)}
            </span>
            {typeLabel(file.mimeType)}
          </span>
        </div>
        <div className="featured-title">{file.name}</div>
        <p className="featured-desc">{descriptionFor(file)}</p>
        <div className="featured-meta">
          <span>{owner}</span>
          <span className="meta-sep">·</span>
          <span>Updated {relTime(file.modifiedTime)}</span>
        </div>
        <div className="featured-cta">Open asset →</div>
      </a>
    </div>
  );
}
