import { useRef, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const listRef = useRef();
  const [editingStudent, setEditingStudent] = useState(null);

  const handleSaved = () => {
    listRef.current.fetchStudents();
    setEditingStudent(null);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <h2>Student Management</h2>
        <div className="nav-links">
          <a href="#form">Add Student</a>
          <a href="#list">View Students</a>
        </div>
      </nav>

      {/* Form */}
      <section id="form">
        <StudentForm editingStudent={editingStudent} onSaved={handleSaved} />
      </section>

      {/* List */}
      <section id="list">
        <StudentList ref={listRef} onEdit={setEditingStudent} />
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Student System 
      </footer>
    </div>
  );
}