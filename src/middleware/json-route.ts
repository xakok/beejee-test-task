import { Request, RequestHandler } from "express";
import HttpError from "../util/http-error";

type RouteHandler<Message> = (req: Request) => Promise<Message>;

export default function jsonRoute<Message>(handler: RouteHandler<Message>): RequestHandler {
    return (req, res) => {
        handler(req)
            .then((message): void => {
                res.json({
                    status: "ok",
                    message,
                });
            })
            .catch((e: HttpError | Error) => {
                console.error(e);
                if (e instanceof HttpError) {
                    res.status(e.statusCode).json({
                        status: "error",
                        message: e.data || e.message,
                    });
                } else {
                    res.status(500).json({
                        status: "error",
                        message: e.message || "Internal Server Error",
                    });
                }
            });
    };
}
