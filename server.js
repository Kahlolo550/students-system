import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRouter from "./routes/students.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", studentsRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Health check route
app.get("/health", async(req, res) => {
    try {
        await pool.query("SELECT 1");
        res.status(200).json({ status: "Backend alive", db: "connected" });
    } catch {
        res.status(200).json({ status: "Backend alive", db: "disconnected" });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });

    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully");
        connection.release();
    } catch (err) {
        console.error("⚠️ Database connection failed:", err.message);
    }
}

startServer();