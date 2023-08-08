import express from 'express';

class LoggerMiddleware {
    private static formatLogMessage(req: express.Request): string {
        const { method, originalUrl, ip } = req;
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${method} ${originalUrl} from ${ip}`;
    }

    static logRequest(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const logMessage = LoggerMiddleware.formatLogMessage(req);
        console.log(`Request: ${logMessage}`);
        next();
    }

    static logResponse(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const logMessage = LoggerMiddleware.formatLogMessage(req);
        console.log(`Response: ${logMessage}`);
        next();
    }
}

export default LoggerMiddleware;
