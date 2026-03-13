import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return new Response("Missing file param", { status: 400 });
  }

  const safeFile = path.basename(file);
  const iconPath = path.join(process.cwd(), "shell", "app-icons", safeFile);

  try {
    const data = await fs.readFile(iconPath);
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return new Response("Icon not found", { status: 404 });
  }
}

