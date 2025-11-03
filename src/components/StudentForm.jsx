import { useState, useEffect } from "react";
import api from "../api";

export default function StudentForm({ editingStudent, onSaved }) {
  const [form, setForm] = useState({ name: "", email: "", course: "" });

  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
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
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mr-2"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 mr-2"
      />
      <input
        name="course"
        value={form.course}
        onChange={handleChange}
        placeholder="Course"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        {form.id ? "Update" : "Add"}
      </button>
    </form>
  );
}