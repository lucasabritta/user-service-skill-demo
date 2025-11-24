import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (err.status) {
    return res.status(err.status).send({ error: err.message });
  }

  res.status(500).send({ error: 'Internal Server Error' });
}
