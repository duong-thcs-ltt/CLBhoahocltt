export default function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    status: "ok",
    message: "CLB Hoá học THCS Lý Tự Trọng API",
  });
}
