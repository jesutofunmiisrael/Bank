import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Signup from "./componet/Signup";
import Login from "./componet/Login";
import Dashboard from "./componet/Dashboard";
import Protectedroute from "./componet/Protectedroute";
import Dashboardlayout from "./componet/Dashboardlayout";
import ForgotPassword from "./componet/Forgetpassword";
import ResetPassword from "./componet/Reset";



function App() {
  return (
<>
      <Toaster richColors position="top-right" closeButton visibleToasts={3} />

      <Routes>
    
        <Route path="/" element={<Navigate to="/signup" />} />

     
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgotPassword />} />
         <Route path="/reset" element={<ResetPassword />} />

        
   





      
        <Route
          path="/dashboard"
          element={
            <Protectedroute>
              <Dashboardlayout>
                <Dashboard />
              </Dashboardlayout>
            </Protectedroute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
