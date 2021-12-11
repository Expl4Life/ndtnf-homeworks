import { Response, NextFunction } from 'express';

export default function IsAuth(req: any, res: Response, next: NextFunction): void { 
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect('/user/login');
    }
    next()
};