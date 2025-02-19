import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error("🔥 Error caught in middleware:", err);

  if (!res.headersSent) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

