import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: errors.array()[0].msg,
    });
  }
  next();
};
