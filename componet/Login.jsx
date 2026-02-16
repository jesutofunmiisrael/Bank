
import { Link } from 'react-router-dom'
import React, { useState } from "react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./login.css"

const LoginSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const onSubmit = async (data) => {
  setCreating(true);
  try {
    const response = await fetch(
      `https://bank-bankend-w4oo.onrender.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

 if (response.status === 200) {
  
localStorage.setItem("token", result.token);
localStorage.setItem("user", JSON.stringify(result.user));


  toast.success(result.message || "Welcome!");
  navigate("/dashboard");

    } else if (response.status === 401 || response.status === 403) {
      toast.error(result.message || "Email or password incorrect");
    } else {
      toast.error(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Network error or server is down");
  } finally {
    setCreating(false);
  }
};







  
  return (



 <div className="auth">
  <div className="auth-container">
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
  

      <h1>Welcome Back</h1>
      <p className="subtitle">Login to continue creating</p>

   
      <div className="input">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
           autoComplete="username"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="input">
        <label>Password</label>
        <input
          type={ShowPassword? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
           autoComplete="current-password"

        />

        <span
          className="toggle-password"
          onClick={() => setShowPassword(p => !p)}
        >
          {ShowPassword ? "🙈" : "👁"}
        </span>

        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={Creating} style={{}}>
        {Creating ? "logging in..." : "LOGIN"}
      </button>

  <Link to = "/forget">     <p style={{color: ""}}>Forget password?</p></Link>
       
  <Link to= "/signup">    <p className="login-text">
       Don't have an account <span>signup</span>
      </p></Link>
    </form>
  </div>
</div>


  )
}

export default Login