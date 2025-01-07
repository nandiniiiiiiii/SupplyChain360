import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";

// GraphQL Mutation for Registration
const REGISTER_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!, $role: String!) {
    register(username: $username, email: $email, password: $password, role: $role) {
        message
        token
        user {
            username
            email
            password
            role
      }
    }
  }
`;

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "", // Ensure this matches the value type expected by the dropdown
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Apollo Mutation Hook
    const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const { data } = await register({
                variables: formData,
            });
            console.log("hello", data)

            setMessage(data.register.message || "Registration successful!");

            if (data && data.register.token) {
                const token = data.register.token;
                const role = data.register.user.role.trim()

                // Save token and role
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                // Redirect to the respective dashboard based on the role
                switch (role) {
                    case 'Factory Manager':
                        navigate('/factory-dashboard');
                        break;
                    case 'Logistics Manager':
                        navigate('/logistics-dashboard');
                        break;
                    case 'Analyst':
                        navigate('/analyst-dashboard');
                        break;
                    case 'Executives':
                        console.log(role)
                        navigate('/executive-dashboard');
                        break;
                    case 'Support':
                        navigate('/support-dashboard');
                        break;
                    case 'External Users':
                        navigate('/external-dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                alert('Registration failed!');
            }
        } catch (err) {
            setMessage(err.message || "Error during registration.");
            console.error("Error during registration:", err);
        }
    };

    return (
        <div className="min-h-[590px] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* Role Dropdown */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Factory Manager">Factory Manager</option>
                            <option value="Logistics Manager">Logistics Manager</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Executives">Executives</option>
                            <option value="Support">Support</option>
                            <option value="External Users">External Users</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${message === "Registration successful!"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>

    );
};

export default Register