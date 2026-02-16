import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {

  const navigate = useNavigate()
   const [loading, setLoading] = useState(false);

  const handleLogout = async () =>{
       setLoading(true);
    try {
   const res =   await fetch("https://bank-bankend-w4oo.onrender.com/api/auth/logout",{
      method:"POST",
       headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
const result = await res.json()
      
 if (!result.success) {
        throw new Error(result.message || "Failed to logout");
      }


      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("LOGGED OUT SUCCESSFULLY ✅");

      navigate("/");
    } catch (error) {
       console.error(error);
      toast.error(error.message || "Logout failed");
    }
         finally {
      setLoading(false);
    }
  }



  return (
 <header className="header">
  <div className="header-container">
    <h1 className="logo">
      <span className="logo-check">🏦</span>
      <span className="logo-main">NEXA</span>
      <span className="logo-sub">BANK</span>
    </h1>
    



    <h4 className="logout" onClick={handleLogout}>Logout</h4>
  </div>
</header>
  )
}

export default Header
