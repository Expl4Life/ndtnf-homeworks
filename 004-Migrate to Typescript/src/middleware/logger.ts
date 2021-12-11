import fs from 'fs';
import os from 'os';
import { Request, Response, NextFunction } from 'express';

export default function Logger(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const userAgent = req.get("user-agent");
    const now: Date = new Date();
    const hour: number = now.getHours();
    const minutes: number = now.getMinutes();
    const seconds: number = now.getSeconds();

    const data: string = `${hour}:${minutes}:${seconds} ${method}: ${url} user-agent: ${userAgent}`;
    console.log(data);

    fs.appendFile("server.log", data + os.EOL, (err: any) => {
        if (err) throw err;
    });
    next();
};
