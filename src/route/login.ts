import { Request } from "express";
import { sign } from "jsonwebtoken";
import HttpError from "../util/http-error";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "123";

export default async function login({ body: { username, password } }: Request) {
    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
        throw new HttpError(401);
    }
    const token = sign({ username }, process.env.SECRET_KEY!, { expiresIn: ""});
    return { token };

}
