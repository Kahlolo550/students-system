import express from "express";
import cors from "cors";
import studentsRouter from "./routes/students.js";

const app = express();

app.use(cors());
app.use(express.json()); // <-- critical for req.body

app.use("/students", studentsRouter);

app.listen(4000, () => {
    console.log("✅ Server running on http://localhost:4000");
});