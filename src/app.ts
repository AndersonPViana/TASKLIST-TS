import "express-async-errors";
import * as express from "express";
import * as cors from "cors";
import * as logger from "morgan";

import { connectionServerDB } from "./config/db";
import { errorMiddleware } from "./app/middlewares/error";

export const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use(errorMiddleware);

connectionServerDB();
