import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem('role');

      // Redirect to the login page
      navigate('/login');
      alert("Logged out successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error during logout.");
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-6">Sidebar</h2>
      <Link to="/register" className="hover:text-gray-400">
        <button className="w-full px-4 py-2 mb-4 bg-blue-500 rounded hover:bg-blue-600">Create New user</button>
      </Link>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar