// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Request, Response, NextFunction } from 'express';

class LoggerMiddleware {
    private static formatLogMessage(req: Request): string {
        const { method, originalUrl, ip } = req;
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${method} ${originalUrl} from ${ip}`;
    }

    static logRequest(req: Request, res: Response, next: NextFunction): void {
        const logMessage = LoggerMiddleware.formatLogMessage(req);
        console.log(`Request: ${logMessage}`);
        next();
    }

    static logResponse(req: Request, res: Response, next: NextFunction): void {
        const logMessage = LoggerMiddleware.formatLogMessage(req);
        console.log(`Response: ${logMessage}`);
        next();
    }
}

export default LoggerMiddleware;
