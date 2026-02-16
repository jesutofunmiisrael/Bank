import React, { useState } from 'react'
import {yupResolver} from  "@hookform/resolvers/yup"
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import "./signup.css"
import { Link } from 'react-router-dom';








const SignupSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),

  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("https://bank-bankend-w4oo.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Signup failed");
      }
localStorage.setItem("token", result.token);
localStorage.setItem("user", JSON.stringify(result.user));


      toast.success(result.message || "Signup successful!");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
  

  

 
    <div className='auth'>
    <div className='auth-container'>
        <form className='auth-form' onSubmit={handleSubmit (onSubmit)}>

            <h1>Create Account</h1>
            <p>join us and start banking with us today</p>


            <div className='input'> 
                <label> FUll Name</label>

                <input type="text" placeholder='Enter your name'
                {...register("name")}/>

                {errors.name && <p className="error-message">{errors.name.message} </p>}
            </div>

   <div className='input'> 
                <label>Email</label>

                <input type="text" placeholder='you@gmail.com'
                {...register("email")}/>

                {errors.email && <p className="error-message">{errors.email.message} </p>}
            </div>

   <div className="input">
  <label>Password</label>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    {...register("password")}
  />

  <span
    className="toggle-password"
    onClick={() => setShowPassword(p => !p)}
  >
    {showPassword ? "🙈" : "👁"}
  </span>

  {errors.password && (
    <p className="error-message">{errors.password.message}</p>
  )}
</div>

            <button type='submit' disabled = {loading}>
                {loading ? "CREATING......." : "SIGN UP"}
            </button>

            <Link to="/login"> <p>Already have an account? <span>Login</span></p></Link>
        </form>
    </div>
    </div>

  )
}

export default Signup
