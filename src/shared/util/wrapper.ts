import { NextFunction, Request, Response } from 'express';

export const warpAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
