export function iconFor(mime?: string): string {
  if (!mime) return "📄";
  if (mime.includes("spreadsheet")) return "📊";
  if (mime.includes("presentation")) return "📽️";
  if (mime.includes("folder")) return "📁";
  if (mime.includes("document")) return "📝";
  if (mime.includes("pdf")) return "📕";
  return "📄";
}

export function typeLabel(mime?: string): string {
  if (!mime) return "Other";
  if (mime.includes("presentation")) return "Presentation";
  if (mime.includes("spreadsheet")) return "Spreadsheet";
  if (mime.includes("document")) return "Document";
  if (mime.includes("pdf")) return "PDF";
  if (mime.includes("video")) return "Video";
  if (mime.includes("folder")) return "Folder";
  return "Other";
}

export function daysAgo(iso?: string): number {
  if (!iso) return 9999;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

export function freshClass(iso?: string): string {
  const d = daysAgo(iso);
  if (d <= 90) return "fresh-green";
  if (d <= 180) return "fresh-amber";
  return "fresh-red";
}

export function relTime(iso?: string): string {
  const d = daysAgo(iso);
  if (d <= 0) return "today";
  if (d === 1) return "1 day ago";
  if (d < 30) return `${d} days ago`;
  if (d < 365) return `${Math.floor(d / 30)} mo ago`;
  return `${Math.floor(d / 365)} yr ago`;
}

/** Homepage "What's New" date phrasing. */
export function updatedLabel(iso?: string): string {
  const d = daysAgo(iso);
  if (!iso || d >= 9999) return "Updated date unavailable";
  if (d <= 0) return "Updated today";
  if (d === 1) return "Updated yesterday";
  if (d < 30) return `Updated ${d} days ago`;
  if (d < 365) {
    const mo = Math.floor(d / 30);
    return mo === 1 ? "Updated 1 month ago" : `Updated ${mo} months ago`;
  }
  const yr = Math.floor(d / 365);
  return yr === 1 ? "Updated 1 year ago" : `Updated ${yr} years ago`;
}

export function ownerLabel(
  owners?: { displayName?: string; emailAddress?: string }[]
): string {
  const owner = owners?.[0];
  const name =
    owner?.displayName?.trim() ||
    owner?.emailAddress?.split("@")[0]?.trim() ||
    "";
  return name || "Owner unavailable";
}
