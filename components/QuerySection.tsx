"use client";

import { useEffect, useState } from "react";
import { fetchDrive, type DriveFile } from "@/lib/driveClient";
import FileCard from "./FileCard";

function Skeletons({ n, whatsNew = false }: { n: number; whatsNew?: boolean }) {
  return (
    <div className={`card-grid${whatsNew ? " card-grid-whatsnew" : ""}`}>
      {Array.from({ length: n }).map((_, i) => (
        <div className={`skeleton${whatsNew ? " skeleton-whatsnew" : ""}`} key={i} />
      ))}
    </div>
  );
}

export default function QuerySection({
  label,
  description,
  query,
  pageSize = 6,
  orderBy,
  hideFolders = false,
  dim = false,
  showRefresh = true,
  compactCards = false,
  whatsNewCards = false,
}: {
  label?: string;
  description?: string;
  query: string;
  pageSize?: number;
  orderBy?: string;
  hideFolders?: boolean;
  dim?: boolean;
  showRefresh?: boolean;
  compactCards?: boolean;
  whatsNewCards?: boolean;
}) {
  const [files, setFiles] = useState<DriveFile[] | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setFiles(null);
    setError(undefined);
    fetchDrive(query, pageSize, orderBy).then((res) => {
      if (cancelled) return;
      const files = hideFolders
        ? res.files.filter((f) => !f.mimeType.includes("folder"))
        : res.files;
      setFiles(files);
      setError(res.error);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pageSize, orderBy, hideFolders, nonce]);

  const body = (
    <>
      {files === null && !error && (
        <Skeletons n={whatsNewCards || compactCards ? 6 : 3} whatsNew={whatsNewCards} />
      )}
      {error && <div className="error-box">{error}</div>}
      {files && files.length === 0 && !error && (
        <div className="empty">No matching content found yet.</div>
      )}
      {files && files.length > 0 && (
        <div className={`card-grid${whatsNewCards ? " card-grid-whatsnew" : ""}`}>
          {files.map((f) => (
            <FileCard
              file={f}
              key={f.id}
              dim={dim}
              compact={compactCards}
              whatsNew={whatsNewCards}
            />
          ))}
        </div>
      )}
    </>
  );

  if (!label) return body;

  return (
    <div className={`section${whatsNewCards ? " home-section" : ""}`}>
      <div className="section-head">
        <div className="section-head-text">
          <h2>{label}</h2>
          {description && <p className="section-desc">{description}</p>}
        </div>
        {showRefresh && (
          <button type="button" className="refresh-btn" onClick={() => setNonce((n) => n + 1)}>
            Refresh
          </button>
        )}
      </div>
      {body}
    </div>
  );
}
