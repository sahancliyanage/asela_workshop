import React, { useEffect, useState } from 'react'

function StudentList({ onStudentAdded }) {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  // READ - Fetch all students
  useEffect(() => {
    fetchStudents();
  }, [onStudentAdded]); 

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/students');
      const result = await response.json();
      
      if (result.success) {
        setStudents(result.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - Start editing
  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({
      name: student.name,
      age: student.age,
      course: student.course
    });
  };

  // UPDATE - Save changes
  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      const result = await response.json();

      if (result.success) {
        setEditingId(null);
        fetchStudents();
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // UPDATE - Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // DELETE - Remove student
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/students/${id}`, {
          method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
          fetchStudents();
        }
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading && students.length === 0) {
    return <div><h1>Loading students...</h1></div>;
  }

  return (
    <div>
      <h2>Student List ({students.length})</h2>
      
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No students found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                
                {editingId === student.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editData.age}
                        onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editData.course}
                        onChange={(e) => setEditData({ ...editData, course: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                  </>
                )}

                <td style={{ textAlign: 'center' }}>
                  {editingId === student.id ? (
                    <>
                      <button 
                        onClick={() => handleSaveEdit(student.id)}
                        style={{ marginRight: '5px', backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        style={{ backgroundColor: 'gray', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleEdit(student)}
                        style={{ marginRight: '5px', backgroundColor: 'blue', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
