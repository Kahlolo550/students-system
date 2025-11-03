import { useState, useEffect } from "react";
import api from "../api";

export default function StudentForm({ editingStudent, onSaved }) {
  const [form, setForm] = useState({ name: "", email: "", course: "" });

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await api.put(`/students/${form.id}`, form);
      } else {
        await api.post("/students", form);
      }
      setForm({ name: "", email: "", course: "" });
      onSaved();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="course"
        value={form.course}
        onChange={handleChange}
        placeholder="Course"
        required
      />
      <button type="submit">
        {form.id ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}