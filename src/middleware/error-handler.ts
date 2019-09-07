import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, _1: Request, res: Response, _2: NextFunction) {
    console.error(err);
    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.data || err.message || "Unknown error",
    });
}
