import express from "express";
import { env } from "./config/config.service.js";
import { dbConnection } from "./db/connection.js";
import bookRouter from "./module/book/book.controller.js";
import logRouter from "./module/logs/blog.controller.js";
import createRouter from "./module/creation/creaation.controller.js";
const app = express();
app.use(express.json());
// database connection 
const client = await dbConnection()
export const database = client.db("lib");

// collection to use it in api 
export const bookModel = database.collection("books")
// auth collection 
export const authorModel = database.collection("authors")
// blog collection to use it 
export const logModel = database.collection("blog")

// crete db router
app.use("/db", createRouter)
// book router 
app.use("/books", bookRouter)
// blog router 
app.use('/logs', logRouter)


app.all("/*path", (req, res) => {
    res.status(404).json({
        message: "wrong path"
    });
});

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
});
