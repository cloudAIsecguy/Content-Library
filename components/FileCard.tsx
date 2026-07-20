"use client";

import type { DriveFile } from "@/lib/driveClient";
import { iconFor, freshClass, relTime } from "@/lib/format";

export default function FileCard({ file, dim = false }: { file: DriveFile; dim?: boolean }) {
  const owner = file.owners?.[0]?.emailAddress?.split("@")[0] || file.owners?.[0]?.displayName || "unknown";
  return (
    <a
      className={`file-card${dim ? " dim-card" : ""}`}
      href={file.webViewLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="top-row">
        <span className="file-icon">{iconFor(file.mimeType)}</span>
        <span className="file-title">{file.name || "Untitled"}</span>
      </div>
      <div className="file-meta">
        <span className={`freshness ${freshClass(file.modifiedTime)}`} />
        Updated {relTime(file.modifiedTime)} · {owner}
      </div>
    </a>
  );
}
