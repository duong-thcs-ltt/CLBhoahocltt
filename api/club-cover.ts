import fs from "fs";
import path from "path";

const COVER_DATA_PATH = path.join("/tmp", ".club_cover.json");

export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const image = body.image;
      if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
        return res.status(400).json({ error: "Invalid base64 image format" });
      }
      fs.writeFileSync(COVER_DATA_PATH, JSON.stringify({ image, updatedAt: new Date().toISOString() }), "utf-8");
      return res.status(200).json({ success: true, url: image });
    }

    // GET
    if (fs.existsSync(COVER_DATA_PATH)) {
      const content = fs.readFileSync(COVER_DATA_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed?.image) {
        return res.status(200).json({ url: parsed.image });
      }
    }
    return res.status(200).json({ url: "/assets/students_chemistry_lab.jpg" });
  } catch (err) {
    return res.status(200).json({ url: "/assets/students_chemistry_lab.jpg" });
  }
}
