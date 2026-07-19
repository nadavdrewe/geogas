import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  isAdminPanelConfigured,
  isAdminPanelRequestAuthorized,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 200 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
  ".pdf",
]);

const authorize = (request: Request): NextResponse | null => {
  if (!isAdminPanelConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  if (!isAdminPanelRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
};

const toPublicPath = (fileName: string) => `/uploads/${fileName}`;

const sanitizeFileName = (fileName: string): string => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");
};

const listUploads = async (): Promise<string[]> => {
  try {
    const files = await readdir(UPLOADS_DIR);
    return files.sort().reverse().map(toPublicPath);
  } catch {
    return [];
  }
};

export async function GET(request: Request) {
  const authorizationError = authorize(request);
  if (authorizationError) return authorizationError;

  const files = await listUploads();
  return NextResponse.json(
    { files },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(request: Request) {
  const authorizationError = authorize(request);
  if (authorizationError) return authorizationError;

  try {
    const formData = await request.formData();
    const upload = formData.get("file");

    if (!(upload instanceof File)) {
      return NextResponse.json(
        { error: "Form field `file` is required." },
        { status: 400 }
      );
    }

    if (upload.size === 0) {
      return NextResponse.json(
        { error: "Uploaded file is empty." },
        { status: 400 }
      );
    }

    if (upload.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 200MB." },
        { status: 400 }
      );
    }

    const safeOriginal = sanitizeFileName(upload.name || "upload.bin");
    const extension = path.extname(safeOriginal || "upload.bin");
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Use jpg, png, webp, gif, svg, mp4, webm, mov, m4v, or pdf.",
        },
        { status: 400 }
      );
    }

    const uniqueName = `${Date.now()}-${randomUUID().slice(0, 8)}${extension}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    await mkdir(UPLOADS_DIR, { recursive: true });
    const buffer = Buffer.from(await upload.arrayBuffer());
    await writeFile(filePath, buffer);

    const files = await listUploads();
    return NextResponse.json({
      ok: true,
      path: toPublicPath(uniqueName),
      files,
    });
  } catch {
    return NextResponse.json(
      { error: "Upload failed unexpectedly." },
      { status: 500 }
    );
  }
}
