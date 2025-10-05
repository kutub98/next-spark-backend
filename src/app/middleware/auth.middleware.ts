import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modules/User/user.model';
import config from '../config';
export interface AuthRequest extends Request {
  user?: { userId: string; role?: string };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      userId: string;
    };

    const user = await User.findOne({ _id: decoded.userId, tokens: token });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = { userId: decoded.userId, role: user.role };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (token) {
        await User.updateOne({ tokens: token }, { $pull: { tokens: token } });
      }
      return res.status(401).json({ success: false, message: 'Token expired' });
    }

    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const requireRole = (roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: 'Authentication required' });
      }
      if (!roles.includes(req.user.role ?? '')) {
        return res
          .status(403)
          .json({ success: false, message: 'Insufficient permissions' });
      }
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: 'Access denied' });
    }
  };
};
