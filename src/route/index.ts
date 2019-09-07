import express from "express";
import jsonRoute from "../middleware/json-route";
import getTasks from "./get-tasks";

const router = express.Router();

router.get("/", jsonRoute(getTasks));
router.get("/env", (_, res) => {
    res.json(process.env);
});

export default router;
