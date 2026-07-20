"use client";

import { useEffect, useState } from "react";
import { fetchDrive, type DriveFile } from "@/lib/driveClient";
import FileCard from "./FileCard";

function Skeletons({ n }: { n: number }) {
  return (
    <div className="card-grid">
      {Array.from({ length: n }).map((_, i) => (
        <div className="skeleton" key={i} />
      ))}
    </div>
  );
}

export default function QuerySection({
  label,
  query,
  pageSize = 6,
  orderBy,
  hideFolders = false,
  dim = false,
  showRefresh = true,
}: {
  label?: string;
  query: string;
  pageSize?: number;
  orderBy?: string;
  hideFolders?: boolean;
  dim?: boolean;
  showRefresh?: boolean;
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
      {files === null && !error && <Skeletons n={3} />}
      {error && <div className="error-box">{error}</div>}
      {files && files.length === 0 && !error && (
        <div className="empty">No matching content found in Drive yet for this category.</div>
      )}
      {files && files.length > 0 && (
        <div className="card-grid">
          {files.map((f) => (
            <FileCard file={f} key={f.id} dim={dim} />
          ))}
        </div>
      )}
    </>
  );

  if (!label) return body;

  return (
    <div className="section">
      <div className="section-head">
        <h2>{label}</h2>
        {showRefresh && (
          <button className="refresh-btn" onClick={() => setNonce((n) => n + 1)}>
            Refresh
          </button>
        )}
      </div>
      {body}
    </div>
  );
}
