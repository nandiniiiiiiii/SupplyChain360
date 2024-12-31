import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from './component/Register'
import Login from './component/Login'
import FactoryManager from "./pages/FactoryManager";
import Home from "./pages/Home"
import Unauthorized from "./pages/Unauthorized"
import LogisticsManager from "./pages/LogisticsManager"
import Support from "./pages/Support"
import ExternalUser from "./pages/ExternalUsers"
import Analyst from "./pages/Analyst"
import Executives from "./pages/Executives"
import ProtectedRoute from "./context/ProtectedRoute"

function App() {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Map roles to respective dashboards
  const roleRedirectMap = {
    "Factory Manager": "/factory-dashboard",
    "Logistics Manager": "/logistics-dashboard",
    "Analyst": "/analyst-dashboard",
    "Executives": "/executive-dashboard",
    "Support": "/support-dashboard",
    "External Users": "/external-dashboard",
  };

  // Redirect to the respective dashboard if the user has a token
  const redirectToDashboard = () => {
    if (token && userRole) {
      return roleRedirectMap[userRole] || "/unauthorized";
    }
    return null; // Allow access to the home page
  };

  return (
    <>
      <Router>
          {/* Public Routes */}
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to={redirectToDashboard()} replace={true} />
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/factory-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Factory Manager']}>
                  <FactoryManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logistics-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Logistics Manager']}>
                  <LogisticsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analyst-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Analyst']}>
                  <Analyst />
                </ProtectedRoute>
              }
            />
            <Route
              path="/executive-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Factory Manager', 'Logistics Manager', 'Analyst', 'Support', 'External Users']}>
                  <Executives />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Support']}>
                  <Support />
                </ProtectedRoute>
              }
            />
            <Route
              path="/external-dashboard"
              element={
                <ProtectedRoute allowedRoles={['External Users']}>
                  <ExternalUser />
                </ProtectedRoute>
              }
            />
          </Routes>
      </Router>
    </>
  )
}

export default App
