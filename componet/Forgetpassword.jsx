
import React, { useState } from 'react'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {

 const [loading, setloading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setloading(true)
    try {
      const response = await fetch(`https://bank-bankend-w4oo.onrender.com/api/auth/forget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "OTP sent to your email!");
        localStorage.setItem("resetEmail", data.email);
        navigate("/reset");
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
    }finally{
        setloading(false)
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #ffffff;
        }

        .forgot-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #ffffff; 
        }

        .form {
          width: 100%;
          max-width: 420px;
          padding: 30px 28px;
          border-radius: 14px;
          background-color: #ffffff;
          box-shadow: 0 10px 28px rgba(0,0,0,0.15);
          font-family: 'Segoe UI', sans-serif;
        }

        .form h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #111827;
          font-size: 1.6rem;
        }

        .form div {
          margin-bottom: 18px;
        }

        .form label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
          color: #1f2937;
        }

        .form input[type="email"] {
          width: 100%;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          background: #f9fafb;
          transition: all 0.25s ease;
        }

        .form input[type="email"]:focus {
          border-color: #2563eb;
          background: #fff;
          box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
        }

        .error-message {
          color: #dc2626;
          font-size: 0.85rem;
          margin-top: 5px;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background-color: #111827;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform .15s ease, opacity .15s ease;
        }

        button:hover {
          opacity: .9;
          transform: translateY(-1px);
        }

        .back-to-login {
          text-align: center;
          margin-top: 15px;
          font-size: 0.9rem;
          color: #374151;
        }

        .back-to-login span {
          color: #2563eb;
          cursor: pointer;
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .form {
            padding: 24px 18px;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="forgot-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Forgot Password</h2>

          <div>
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <button type="submit" disabled ={loading}>{loading ? "sending" : "Send OTP"}</button>

          <div className="back-to-login">
            <p>
              Remembered your password?{" "}
              <span onClick={() => navigate("/login")}>Go back to Login</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
