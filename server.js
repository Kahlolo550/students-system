import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRouter from "./routes/students.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/students", studentsRouter);

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        await pool.query("SELECT 1");
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:");
        console.error(err); // <-- full error logged
        process.exit(1);
    }
}

// catch unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise);
    console.error("Reason:", reason);
});

// catch uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception thrown:");
    console.error(err);
    process.exit(1);
});

startServer();