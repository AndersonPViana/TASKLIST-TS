import { Router } from "express";

import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import TaskController from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const routes = Router();

routes.post("/users", UserController.create);

routes.post("/sessions", SessionController.create);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.post("/tasks", TaskController.create);