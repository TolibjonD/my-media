import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request: Request) {
  const token = request.cookies.get("google_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  // Initialize the OAuth2 client with credentials
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_REDIRECT_URI
  );

  // Set the credentials (access token) for the OAuth client
  oauth2Client.setCredentials(JSON.parse(token));

  // Initialize the Google Photos API
  const photos = google.photoslibrary("v1");

  // Fetch media items using mediaItems.list method
  const res = await photos.mediaItems.list({
    auth: oauth2Client,
    pageSize: 10,
  });

  // Return media items
  return NextResponse.json(res.data.mediaItems || []);
}
