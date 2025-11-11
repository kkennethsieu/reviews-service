import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/reviewRoutes.js"
import cors from "cors";
import db from "./db/db.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", router);

const PORT = 4000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});