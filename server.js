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

// Root route to avoid 502 on /
app.get("/", (req, res) => {
    res.send("✅ Server is running successfully");
});

const PORT = process.env.PORT || 5000;


async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully");
        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to the database:");
        console.error(err);
        process.exit(1);
    }
}

startServer();