import { Request, RequestHandler } from "express";

type RouteHandler<Message> = (req: Request) => Promise<Message>;

export default function jsonRoute<Message>(handler: RouteHandler<Message>): RequestHandler {
    return async (req, res, next): Promise<void> => {
        try {
            const message = await handler(req);
            res.json({ status: "ok", message });
        } catch (e) {
            next(e);
        }
    };
}
