import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      success
      message
    }
  }
`;

function Sidebar({ menuItems }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token)

  const [logout, { loading }] = useMutation(LOGOUT_MUTATION, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token} ` : '', // Add the Authorization header
      },
    },
  });

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.data.logout.success) {
        // Clear local storage or any other client-side storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        // Redirect to login or home page
        navigate('/');
      } else {
        console.error('Logout failed:', response.data.logout.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error during logout.");
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-6">Sidebar</h2>
      <div>
      {menuItems.map((item, index) => (
        <Link key={index} to={item.link} className="hover:text-gray-400">
          <button className="w-full px-4 py-2 mb-2 bg-blue-500 rounded hover:bg-blue-600">
            {item.name}
          </button>
        </Link>
      ))}
      </div>
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