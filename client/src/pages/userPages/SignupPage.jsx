import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userSignup } from "./../../services/userApi";

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    try {
      const response = await userSignup(userData);

      if (response && response.success) {
        toast.success("Signup successful");
        navigate("/user/home");
      } else {
        toast.error(response?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed: Please try again");
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:ml-12">
          <form className="card-body" onSubmit={handleSubmit(handleSignup)}>
            <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>

            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="input input-bordered"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <label className="label mt-4">
              <span className="label-text-alt">
                Already have an account?{" "}
                <Link to="/login" className="link link-hover text-primary">
                  Log in here
                </Link>
              </span>
            </label>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Welcome Text on the Left */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join Us!</h1>
          <p className="py-6 text-lg">
            Create an account to enjoy our services and get started with your
            journey.
          </p>
        </div>
      </div>
    </div>
  );
};

// import React from "react";
// import { Link } from 'react-router-dom';

// export const SignupPage = () => {
//   return (
//     <div className="hero bg-base-200 min-h-screen">
//   <div className="hero-content flex-col lg:flex-row-reverse">
//     <div className="text-center lg:text-left">
//       <h1 className="text-5xl font-bold">Sign-up now!</h1>
//       <p className="py-6">
//         Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
//         quasi. In deleniti eaque aut repudiandae et a id nisi.
//       </p>
//     </div>
//     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//       <form className="card-body">
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Name</span>
//           </label>
//           <input type="text" placeholder="name" className="input input-bordered" required />
//         </div>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Email</span>
//           </label>
//           <input type="Email" placeholder="Email" className="input input-bordered" required />
//         </div>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Password</span>
//           </label>
//           <input type="password" placeholder="password" className="input input-bordered" required />
//           <label className="label">
//             <Link to={'/login'}>Existing User?</Link>
           
//           </label>



//         </div>
//         <div className="form-control mt-6">
//           <button className="btn btn-primary">login</button>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>
//   );
// };
// import React from "react";
// import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { userSignup } from "./../../services/userApi";

// export const SignupPage = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   return (
//     <div className="hero bg-base-200 min-h-screen">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold">Sign-up now!</h1>
//           <p className="py-6">
//             Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
//             quasi. In deleniti eaque aut repudiandae et a id nisi.
//           </p>
//         </div>
//         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//           <form className="card-body" onSubmit={handleSubmit}>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Name</span>
//               </label>
//               <input type="text" placeholder="name" className="input input-bordered" required autoComplete="name" />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input type="email" placeholder="Email" className="input input-bordered" required autoComplete="email" />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input type="password" placeholder="password" className="input input-bordered" required autoComplete="new-password" />
//               <label className="label">
//                 <Link to={'/login'}>Existing User?</Link>
//               </label>
//             </div>
//             <div className="form-control mt-6">
//               <button type="submit" className="btn btn-primary">Sign up</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
