import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/reviewRoutes.js";
import cors from "cors";
import db from "./db/db.js";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/reviews", router);

const PORT = 3003;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
