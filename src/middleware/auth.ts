import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import HttpError from "../util/http-error";

export default function auth({ body: { token } }: Request, _res: Response, next: NextFunction) {
    try {
        verify(token, process.env.SECRET_KEY!);
    } catch (e) {
        return next(new HttpError(401, "Invalid auth token"));
    }
    next();
}
