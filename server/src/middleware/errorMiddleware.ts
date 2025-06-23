import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};