import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);
            setMessage("Login successful!");
            if (response.ok) {
                const data = await response.json();

                // Save token and role
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);

                // Redirect to the respective dashboard
                switch (data.role) {
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
            setMessage(err.response?.data?.message || "Error during login.");
        }
    };

    return (
        <div className="min-h-[590px] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${message === "Login successful!" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login