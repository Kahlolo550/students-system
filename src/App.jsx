import { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

export default function App() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management System</h1>
      <StudentForm
        editingStudent={editingStudent}
        onSaved={() => {
          setEditingStudent(null);
          setRefresh(!refresh);
        }}
      />
      <StudentList key={refresh} onEdit={setEditingStudent} />
    </div>
  );
}