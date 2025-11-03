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
    <form onSubmit={handleSubmit} className="form-container">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="course" value={form.course} onChange={handleChange} placeholder="Course" />
      <button type="submit">{form.id ? "Update" : "Add"}</button>
    </form>
  );
}
