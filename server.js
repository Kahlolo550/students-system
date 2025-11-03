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
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Bakery backend is alive!' });
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

const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
}

startServer();