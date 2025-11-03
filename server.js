import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRouter from "./routes/students.js";
import { pool } from "./db.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/students", studentsRouter);

// Serve React static files
app.use(express.static(path.join(process.cwd(), "mapp/dist")));

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "mapp/dist/index.html"));
});

// Catch-all for React Router
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "mapp/dist/index.html"));
});

const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
}

startServer();