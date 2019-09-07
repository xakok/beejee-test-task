import { Request } from "express";
import { sign } from "jsonwebtoken";
import HttpError from "../util/http-error";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "123";
const AUTH_TOKEN_TTL = 24 * 60 * 60;

export default async function login({ body: { username, password } }: Request) {
    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
        throw new HttpError(401, "Invalid credentials");
    }
    const expires = Math.floor(new Date().getTime() / 1000) + AUTH_TOKEN_TTL;
    const token = sign({ exp: expires }, process.env.SECRET_KEY!);
    return { token, expires };
}
