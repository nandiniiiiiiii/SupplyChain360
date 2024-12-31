import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

  }, [navigate]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div>This is the home page.</div>
    </>
  )
}

export default Home