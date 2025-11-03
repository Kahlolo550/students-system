import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all students
router.get("/", async(req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM students");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// POST new student
router.post("/", async(req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({ error: "Name, email, and course are required" });
        }

        const [result] = await pool.query(
            "INSERT INTO students (name, email, course) VALUES (?, ?, ?)", [name, email, course]
        );

        res.status(201).json({ id: result.insertId, name, email, course });
    } catch (err) {
        console.error("Error creating student:", err);
        res.status(500).json({ error: "Failed to create student" });
    }
});

// UPDATE student
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({ error: "Name, email, and course are required" });
        }

        const [result] = await pool.query(
            "UPDATE students SET name=?, email=?, course=? WHERE id=?", [name, email, course, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ id, name, email, course });
    } catch (err) {
        console.error("Error updating student:", err);
        res.status(500).json({ error: "Failed to update student" });
    }
});

// DELETE student
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM students WHERE id=?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(204).send();
    } catch (err) {
        console.error("Error deleting student:", err);
        res.status(500).json({ error: "Failed to delete student" });
    }
});

export default router;