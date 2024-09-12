import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';

export const LoginPage = () => {


  const {
    register,//usesubmit
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => { //parameter,for passing data
    try{
      console.log(data,'====data'); 

    const response = await axios({
      url:"http://localhost:4500/api/v1/user/login",
      method:"POST",
      data,
      withCredentials:true,     //cookies
    });
    console.log(response.data);

    }catch(error){
      if (error.response) {
        console.error("Backend error:", error.response.data); // Log the backend error
      } else {
        console.error("Unknown error:", error.message);
      }
      // console.error(error);
    }
};
 

  return (
    <div className="hero bg-base-200 py-20">
  <div className="hero-content flex-col lg:flex-row lg:w-8/12">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:w-6/12">
      <form className="card-body"onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required  /> 
          
          
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required  />
          <label className="label">
          
            <Link to={"/signup"}>New User?</Link>
          
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary"type="submit">Login</button>

        </div>
      </form>
    </div>
  </div>
</div>
  );
};



