import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup.string().required("OTP is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
        const [loading, setloading] = useState(false);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {

    const { email, otp, newPassword } = data;
setloading(true)
    try {
      const response = await fetch(`https://bank-bankend-w4oo.onrender.com/api/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const result = await response.json();
      console.log("Server returned:", result);

      if (result.message ) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Try again.");
      navigate("/login")
    }finally{
     setloading(false)
        }
  };

  return (
    <>
     <style>{`
  .form {
    max-width: 400px;
    margin: 100px auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', sans-serif;
  }

  .form h2 {
    text-align: center;
    margin-bottom: 25px;
    color: #222;
  }

  .form div {
    margin-bottom: 20px;
    position: relative;
  }

  .form label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  .form input[type="text"],
  .form input[type="password"],
  .form input[type="email"] {
    width: 100%;
    padding: 10px 40px 10px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .form input:focus {
    border-color: #007bff;
  }

  /* Show/Hide button styling */
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 35px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #007bff;
    user-select: none;
  }

  .toggle-password:hover {
    text-decoration: underline;
  }

  .error-message {
    color: red;
    font-size: 0.85rem;
    margin-top: 5px;
  }

  button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #080a0cff;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #080d12ff;
  }

  .back-to-login {
    text-align: center;
    margin-top: 15px;
    font-size: 0.9rem;
  }

  .back-to-login span {
    color: #007bff;
    cursor: pointer;
  }

  .back-to-login span:hover {
    text-decoration: underline;
  }

  /* 📱 MOBILE RESPONSIVENESS */
  @media (max-width: 480px) {
    .form {
      margin: 40px 15px;
      padding: 22px;
      max-width: 100%;
    }

    .form h2 {
      font-size: 1.3rem;
    }

    button {
      font-size: 0.95rem;
    }

    .toggle-password {
      top: 34px;
      font-size: 0.85rem;
    }
  }

  /* 📟 TABLETS */
  @media (max-width: 768px) {
    .form {
      margin-top: 60px;
    }
  }
`}</style>


      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Reset Password</h2>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div>
          <label>OTP</label>
          <input type="text" {...register("otp")} />
          {errors.otp && <p className="error-message">{errors.otp.message}</p>}
        </div>

        <div>
          <label>New Password</label>
          <input type={showPassword ? "text" : "password"}  {...register("newPassword")}
          
          />
  <span onClick={() => setShowPassword (prev => !prev)}>

               {showPassword ? "Hide" : "Show"}
          </span>
        
          {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
        </div>

        <button type="submit" disabled = {loading}>{loading ? "Reseting..." : "RESET PASSWORD"}</button>

        <div className="back-to-login">
          <p>
            Back to <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
