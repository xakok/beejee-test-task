import express from "express";
import auth from "../middleware/auth";
import jsonRoute from "../middleware/json-route";
import createTask from "./create-task";
import editTask from "./edit-task";
import getTasks from "./get-tasks";
import login from "./login";

const router = express.Router();

router.get("/", jsonRoute(getTasks));
router.post("/create/", express.urlencoded(), jsonRoute(createTask));
router.post("/edit/:id/", express.urlencoded(), auth, jsonRoute(editTask));
router.post("/login/", express.urlencoded(), jsonRoute(login));

export default router;
