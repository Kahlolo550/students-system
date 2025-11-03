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

  useEffect(() => { fetchStudents(); }, []);

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
      {loading ? <p>Loading students...</p> :
        students.length === 0 ? <p>No students found.</p> :
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              {s.name} — {s.course} ({s.email})
              <button onClick={() => onEdit(s)}>Edit</button>
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
});

export default StudentList;
