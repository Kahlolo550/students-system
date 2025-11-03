import { useEffect, useState } from "react";
import api from "../api";

export default function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id} className="flex justify-between border-b py-2">
            <span>{s.name} — {s.course}</span>
            <div>
              <button onClick={() => onEdit(s)} className="mr-2 text-blue-500">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}