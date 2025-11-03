import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import api from "../api";

const StudentList = forwardRef(({ onEdit }, ref) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ fetchStudents }));

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="student-list">
      <h2>Students</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id} className="student-item">
              <div className="student-info">
                <strong>{s.name}</strong> — {s.course}
                <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>{s.email}</div>
              </div>
              <div className="student-actions">
                <button className="btn-edit" onClick={() => onEdit(s)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default StudentList;