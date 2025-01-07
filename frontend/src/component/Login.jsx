import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            role
        }
    }
`;

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // GraphQL mutation hook
    const [login] = useMutation(LOGIN_MUTATION);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { data } = await login({
                variables: {
                    email: formData.email,
                    password: formData.password,
                },
            });

            if (data && data.login) {
                const { token, role } = data.login;

                // Save token and role to localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                setMessage("Login successful!");

                // Redirect based on role
                const roleToPathMap = {
                    "Factory Manager": "/factory-dashboard",
                    "Logistics Manager": "/logistics-dashboard",
                    "Analyst": "/analyst-dashboard",
                    "Executives": "/executive-dashboard",
                    "Support": "/support-dashboard",
                    "External Users": "/external-dashboard",
                };

                navigate(roleToPathMap[role] || "/"); // Default to home if role doesn't match
            } else {
                setMessage("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setMessage(err.message || "An error occurred during login.");
        } finally {
            setLoading(false);
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
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login