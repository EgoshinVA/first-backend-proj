import {NextFunction, Request, Response} from "express";

export function authGuardMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body.token === '123') {
        next()
    } else {
        res.send(401)
    }
}