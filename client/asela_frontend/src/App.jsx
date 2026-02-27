import { useEffect, useState } from 'react'
import './App.css'
import Form from './component/Form'
import StudentList from './component/StudentList'
import { Routes, Route, NavLink } from 'react-router-dom'

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleStudentAdded = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    const navStyle = ({ isActive }) => ({
      padding: '10px 15px',
      backgroundColor: isActive ? '#4c51bf' : '#667eea',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: isActive ? 'bold' : 'normal',
      transition: 'all 0.3s ease'
    });

    return (
      <>
        <div style={{ padding: '20px' }}>
          <h1>Student Management System</h1>
          
          <div style={{ marginBottom: '20px' }}>
            <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <NavLink 
                to="/" 
                style={navStyle}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/students" 
                style={navStyle}
              >
                View Students
              </NavLink>
              <NavLink 
                to="/add-student" 
                style={navStyle}
              >
                Add Student
              </NavLink>
            </nav>
          </div>

          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Welcome to Student Management System</h2>
                <p>Use the navigation menu above to view or add students</p>
              </div>
            } />
            <Route path="/students" element={<StudentList onStudentAdded={refreshTrigger} />} />
            <Route path="/add-student" element={<Form onStudentAdded={handleStudentAdded} />} />
          </Routes>
        </div>
      </>
    )
}

export default App
