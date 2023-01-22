import "reflect-metadata"
import { DataSource } from "typeorm"
import { Note } from "./entity/Note"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "database",
    synchronize: true,
    logging: false,
    entities: [Note],
    subscribers: [],
    migrations: [],
})
