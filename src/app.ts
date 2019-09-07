/* tslint:disable:ordered-imports */
import "./env";
import "reflect-metadata";
import createDebug from "debug";
import express from "express";
import createLogger from "morgan";

import { ConnectionOptions, createConnection } from "typeorm";
import router from "./route";

const production = process.env.NODE_ENV === "development";

const app = express();
app.use(createLogger(production ? "combined" : "dev"));
app.use(router);

const debug = createDebug("task-api");
const port = Number(process.env.PORT || 3000);

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    extra: {
        poolSize: 5,
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
