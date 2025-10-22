import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | { id: string; email?: string };
}

const JWT_SECRET = "your_secret_key_here";

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    req.user = decoded; // ✅ No more error
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
