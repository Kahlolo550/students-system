import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRouter from "./routes/students.js";
import { pool } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/students", studentsRouter);

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all fallback for SPA
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/students")) {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
    } else {
        next();
    }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:");
        console.error(err);
        process.exit(1);
    }
}

startServer();