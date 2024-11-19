import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userLogin } from "../../services/userApi";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await userLogin(data);

      if (response && response.success) {
        navigate("/user/home");
        toast.success("Login successful");
      } else {
        toast.error(response?.message || "Login failed!!!");
        console.log("Login error:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error. Please try again.");
    }
  };

  return (
    <div className="hero bg-base-200 py-20">
      <div className="hero-content flex-col lg:flex-row lg:w-8/12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          {/* <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p> */}
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:w-6/12">
          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} 
                placeholder="email" 
                className="input input-bordered" 
                autoComplete="email" 
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} 
                placeholder="password" 
                className="input input-bordered" 
                autoComplete="current-password" 
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <label className="label">
                <Link to={"/signup"}>New User?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
