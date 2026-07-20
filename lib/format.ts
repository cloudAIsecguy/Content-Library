export function iconFor(mime?: string): string {
  if (!mime) return "📄";
  if (mime.includes("spreadsheet")) return "📊";
  if (mime.includes("presentation")) return "📽️";
  if (mime.includes("folder")) return "📁";
  if (mime.includes("document")) return "📝";
  if (mime.includes("pdf")) return "📕";
  return "📄";
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
