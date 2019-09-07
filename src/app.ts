/* tslint:disable:ordered-imports */
import "reflect-metadata";
import "./env";
import createDebug from "debug";
import express from "express";
import createLogger from "morgan";
import { join } from "path";
import { ConnectionOptions, createConnection } from "typeorm";
import router from "./route";
import errorHandler from "./middleware/error-handler";
import HttpError from "./util/http-error";

const production = process.env.NODE_ENV === "development";

const app = express();
app.disable("x-powered-by");
app.enable("strict routing");
app.use(createLogger(production ? "combined" : "dev"));
app.use("/v2", router);
app.use((_req, _res, next: any) => {
    next(new HttpError(404));
});
app.use(errorHandler);

const debug = createDebug("task-api");
const port = Number(process.env.PORT || 3000);

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [join(__dirname, "entity", "*")],
    extra: {
        poolSize: process.env.DATABASE_POOL_SIZE || 5,
    },
};

createConnection(connectionOptions)
    .then(() => {
        app.listen(port, () => debug(`Listening on ${port}`));
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
