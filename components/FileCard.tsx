"use client";

import type { DriveFile } from "@/lib/driveClient";
import {
  freshClass,
  iconFor,
  ownerLabel,
  relTime,
  typeLabel,
  updatedLabel,
} from "@/lib/format";

export default function FileCard({
  file,
  dim = false,
  compact = false,
  whatsNew = false,
}: {
  file: DriveFile;
  dim?: boolean;
  compact?: boolean;
  whatsNew?: boolean;
}) {
  const owner = ownerLabel(file.owners);
  // Optional status only when present on the file object — do not infer from age.
  const status =
    typeof (file as DriveFile & { status?: string }).status === "string"
      ? (file as DriveFile & { status?: string }).status
      : undefined;

  if (whatsNew) {
    return (
      <a
        className={`file-card file-card-whatsnew${dim ? " dim-card" : ""}`}
        href={file.webViewLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="whatsnew-top">
          <span className="type-badge">{typeLabel(file.mimeType)}</span>
          {status === "Current" || status === "Review soon" || status === "Archived" ? (
            <span className={`status-badge status-${status.toLowerCase().replace(/\s+/g, "-")}`}>
              {status}
            </span>
          ) : null}
        </div>
        <div className="file-title">{file.name || "Untitled"}</div>
        <div className="file-meta file-meta-whatsnew">
          <span>{owner}</span>
          <span>{updatedLabel(file.modifiedTime)}</span>
        </div>
      </a>
    );
  }

  return (
    <a
      className={`file-card${dim ? " dim-card" : ""}${compact ? " file-card-compact" : ""}`}
      href={file.webViewLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="top-row">
        <span className="file-icon">{iconFor(file.mimeType)}</span>
        <span className="file-title">{file.name || "Untitled"}</span>
      </div>
      {compact ? (
        <div className="file-meta file-meta-compact">
          <span className="meta-owner">{owner}</span>
          <span className="meta-sep">·</span>
          <span>Updated {relTime(file.modifiedTime)}</span>
        </div>
      ) : (
        <div className="file-meta">
          <span className={`freshness ${freshClass(file.modifiedTime)}`} />
          Updated {relTime(file.modifiedTime)} · {owner}
        </div>
      )}
    </a>
  );
}
