import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/reviewRoutes.js"
import cors from "cors";
import db from "./db/db.js"

const app = express();

// Configure CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8000", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());

app.use("/", router);

const PORT = 4000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});