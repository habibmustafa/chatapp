import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate()
   const handleSubmit = async (e) => {
      e.preventDefault();
      const {data} = await axios.post(loginRoute, {
         email,
         password
      })
      if (data.status === false) {
         toast.error(data.message);
       }
       if (data.status === true) {
         toast.success("Login Successful");
         
         navigate("/dashboard");
       }
   };

   return (
      <div className=" h-full bg-[#f7f7ff]">
         <div className="wrapper h-full">
            <div className="flex justify-center flex-col items-center h-full">
               {/* logo */}
               <div className="flex items-center gap-1 text-2xl text-[#7269ef] mb-12">
                  <i className="ri-chat-smile-2-fill"></i>
                  <span className="text-slate-700 font-semibold">ChatAPP</span>
               </div>

               {/* content */}
               <div className="flex flex-col items-center mb-6">
                  <h4 className="text-lg font-semibold text-[#495057]">
                     Sing in
                  </h4>
                  <p className="text-[#7a7f9a]">
                     Sing in to coutinue to ChatAPP
                  </p>
               </div>

               <div className="flex flex-col break-words bg-white rounded-lg p-9 mb-6 w-full max-w-[450px]">
                  
                  {/* card */}
                  <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <label
                           className="mb-2 block font-semibold"
                           htmlFor="email"
                        >
                           Email
                        </label>
                        <div className="w-full mx-auto flex border-[1px] rounded-sm ">
                           <span className="px-[15px] py-3 text-sm text-slate-500 bg-slate-100 flex items-center justify-center">
                              <i className="ri-mail-line"></i>
                           </span>
                           <input
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                              value={email}
                              className="w-full px-4 outline-0 border-0"
                              type="email"
                              id="email"
                              placeholder="Enter Email"
                           />
                        </div>
                     </div>

                     <div className="mb-6 relative">
                        <label
                           className="mb-2 inline-block font-semibold"
                           htmlFor="Password"
                        >
                           Password
                        </label>
                        <a href="%" className="absolute right-0 text-sm">
                           Forgot password?
                        </a>
                        <div className="w-full mx-auto flex border-[1px] rounded-sm ">
                           <span className="px-[15px] py-3 text-sm text-slate-500 bg-slate-100 flex items-center justify-center">
                              <i className="ri-lock-2-line"></i>
                           </span>
                           <input
                              onChange={(e) => {
                                 setPassword(e.target.value);
                              }}
                              value={password}
                              className="w-full px-4 outline-0 border-0"
                              type="password"
                              id="password"
                              placeholder="Enter Password"
                           />
                        </div>
                     </div>

                     <div className="mb-4">
                        <button
                           className="w-full flex justify-center items-center p-2 rounded-[4px] bg-[#766fd8] text-white hover:bg-[#6159cb]"
                           type="submit"
                        >
                           Sing in
                        </button>
                     </div>
                  </form>
               </div>

               {/* text footer */}
               <div className="mt-12 text-center">
                  <p className="mb-4">
                     Don't have an account?{" "}
                     <Link className="text-blue-600" to="/register">
                        Signup now
                     </Link>
                  </p>
                  <p>© 2022 ChatAPp. Crafted with by habibmustafa</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
