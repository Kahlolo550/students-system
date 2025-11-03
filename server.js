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
        await pool.query("SELECT 1"); // test connection
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
}

startServer();