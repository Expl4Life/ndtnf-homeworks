import { Response, Request } from 'express';

export default function ErrorMiddleware(req: Request, res: Response): void {
    res.render("error/404", {
        title: "404 | страница не найдена",
        route: '/404',
        user: {}
    });
};
