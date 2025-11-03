import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import studentsRouter from "./routes/students.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/students", studentsRouter);

// --- Serve React frontend (Vite build in dist/) ---
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets
app.use(express.static(path.join(__dirname, "dist")));

// Root route (optional, React will handle it too)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Catch-all fallback for React Router (Express 5 safe)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
// ---------------------------------------------------

const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully");
        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to the database:", err);
        process.exit(1);
    }
}

startServer();