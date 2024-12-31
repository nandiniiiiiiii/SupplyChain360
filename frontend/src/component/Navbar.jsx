import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <nav className="bg-gray-800 text-white px-4 py-3">
            <ul className="flex justify-between items-center">
                <div className="flex gap-4">
                    <li>
                        <Link to="/" className="text-xl font-bold">
                            SupplyChain360
                        </Link>
                    </li>

                    {/* Show Register and Login links if not authenticated */}
                    <>
                        <li>
                            <Link to="/register" className="hover:text-gray-400">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-gray-400">
                                Login
                            </Link>
                        </li>
                    </>
                </div>
            </ul>
        </nav>

    );
}

export default Navbar