import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Server-side proxy to Google Drive API v3 files.list, using the signed-in
// user's own OAuth token (drive.readonly scope). Keeps the token off the
// client entirely.
export async function POST(req: NextRequest) {
  const session = (await getServerSession(authOptions)) as
    | { accessToken?: string; error?: string }
    | null;

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  if (session.error === "RefreshAccessTokenError") {
    return NextResponse.json(
      { error: "Session expired, please sign in again" },
      { status: 401 }
    );
  }

  let body: { q?: string; pageSize?: number; orderBy?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const params = new URLSearchParams({
    q: body.q || "trashed = false",
    pageSize: String(body.pageSize ?? 10),
    fields:
      "files(id,name,mimeType,webViewLink,modifiedTime,createdTime,owners(displayName,emailAddress),parents)",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });
  if (body.orderBy) params.set("orderBy", body.orderBy);

  const driveRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
    { headers: { Authorization: `Bearer ${session.accessToken}` } }
  );

  if (!driveRes.ok) {
    const errText = await driveRes.text();
    return NextResponse.json(
      { error: `Drive API error: ${errText}` },
      { status: driveRes.status }
    );
  }

  const data = await driveRes.json();
  return NextResponse.json(data);
}
