import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from './customError';

export const errorHandler: ErrorRequestHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }

    next();
};
