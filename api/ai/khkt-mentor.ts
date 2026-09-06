import type { Request, Response } from "express";
import app from "../../server";

export default function handler(req: Request, res: Response) {
  if (req.url && !req.url.startsWith("/api")) {
    req.url = "/api/ai/khkt-mentor";
  }
  return app(req, res);
}
