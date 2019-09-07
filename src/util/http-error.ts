import { STATUS_CODES } from "http";

export default class HttpError extends Error {
    public constructor(
        public readonly statusCode: number,
        public readonly data?: any,
    ) {
        super(STATUS_CODES[statusCode] || "Unknown error");
    }
}
