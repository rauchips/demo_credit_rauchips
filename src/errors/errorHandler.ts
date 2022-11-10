import { ApiError } from './errors';
import { Request, Response, NextFunction } from 'express';


const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError) {
        return res.status(err.status).json(err.message || { message: 'Something went wrong'});
    }
    return res.status(401).json({ message: 'You are not authorized, kindly signup OR login' });
}

export default ErrorHandler;