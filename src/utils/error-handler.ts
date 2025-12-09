import { Request, Response, NextFunction } from 'express';
import { logger } from './log-service';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    logger.error(err);

    if (err.status) {
        return res.status(err.status).send({ error: err.message });
    }

    res.status(500).send({ error: 'Internal Server Error' });
}
