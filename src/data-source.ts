 import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as dotenv from "dotenv";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.PASSWORD,
    database: "taskList",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
