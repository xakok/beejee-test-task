import express from "express";
import jsonRoute from "../middleware/json-route";
import getTasks from "./get-tasks";

const router = express.Router();

router.get("/", jsonRoute(getTasks));

export default router;
