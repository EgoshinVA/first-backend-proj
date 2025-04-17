import {NextFunction, Request, Response} from "express";

const users = [
    {id: 1, name: 'Dima', login: 'Dima', password: '123'},
    {id: 2, name: 'Vasya', login: 'Vasya', password: '555555'}];

export function authGuardMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body.token === '123') {
        next()
    } else {
        res.status(401).json({errors: [{error: 'Incorrect token value'}]})
    }
} //todo relocate token to basic