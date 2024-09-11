import fs from "fs";
import path from "path";

export function ensureDirectoryExists(currentYear: number) {
  const uploadsDir = path.join(
    process.cwd(),
    "public",
    process.env.UPLOADS_DIRECTORY!,
    currentYear.toString()
  );

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  return uploadsDir;
}
