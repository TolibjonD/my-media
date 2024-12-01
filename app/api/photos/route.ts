import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request: Request) {
  const token = request.cookies.get("google_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials(JSON.parse(token));

  const photos = google.photoslibrary({ version: "v1", auth: oauth2Client });
  const res = await photos.mediaItems.list({ pageSize: 10 });

  return NextResponse.json(res.data.mediaItems || []);
}
