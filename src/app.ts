/* tslint:disable:ordered-imports */
import "./env";
import "reflect-metadata";
import createDebug from "debug";
import express from "express";
import createLogger from "morgan";

// import {Connection, ConnectionOptions, createConnection} from "typeorm";
import router from "./route";

const production = process.env.NODE_ENV === "development";

/*const connectionOptions: ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    extra: {

    },
};*/

const app = express();
app.use(createLogger(production ? "combined" : "dev"));
app.use(router);

const debug = createDebug("task-api");
const port = Number(process.env.PORT || 3000);
app.listen(port, () => debug(`Listening on ${port}`));
