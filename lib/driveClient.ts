export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  modifiedTime?: string;
  createdTime?: string;
  owners?: { displayName?: string; emailAddress?: string }[];
  parents?: string[];
}

interface DriveListResponse {
  files?: DriveFile[];
  error?: string;
}

const cache = new Map<string, DriveFile[]>();

export async function fetchDrive(
  q: string,
  pageSize = 8,
  orderBy?: string
): Promise<{ files: DriveFile[]; error?: string }> {
  const cacheKey = JSON.stringify({ q, pageSize, orderBy });
  const cached = cache.get(cacheKey);
  if (cached) return { files: cached };

  try {
    const res = await fetch("/api/drive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, pageSize, orderBy }),
    });
    const data: DriveListResponse = await res.json();
    if (!res.ok) {
      return { files: [], error: data.error || `Drive request failed (${res.status})` };
    }
    const files = data.files || [];
    cache.set(cacheKey, files);
    return { files };
  } catch (err) {
    return { files: [], error: String(err) };
  }
}
