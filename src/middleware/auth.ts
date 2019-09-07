import { NextFunction, Request, Response } from "express";
import HttpError from "../util/http-error";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "123";

export default function auth({ body: { username, password } }: Request, res: Response, next: NextFunction) {
    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
        next(new HttpError(401, "Invalid credentials"));
    }
    return [res, next];
}
