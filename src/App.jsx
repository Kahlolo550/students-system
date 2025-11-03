import { useState, useRef } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const studentListRef = useRef();

  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    if (studentListRef.current) {
      studentListRef.current.fetchStudents();
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Student Management</h1>
        <button className="btn-add" onClick={handleAddClick}>Add Student</button>
      </div>

      <StudentList onEdit={handleEdit} ref={studentListRef} />

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
            <StudentForm editingStudent={editingStudent} onSaved={handleSaved} />
          </div>
        </div>
      )}
    </div>
  );
}
