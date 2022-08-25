import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { data } = await axios.post(registerRoute, {
         username,
         email,
         password,
      });

      if (data.status) {
         toast.success("Registration Successful");
         navigate("../login");
      } else {
         toast.error(data.message);
      }
   };

   return (
      <div className="register h-full bg-[#f7f7ff]">
         <div className="wrapper flex justify-center flex-col items-center h-full">
            {/* logo */}
            <div className="flex items-center gap-1 text-2xl text-[#7269ef] mb-12">
               <i className="ri-chat-smile-2-fill"></i>
               <span className="text-slate-700 font-semibold">ChatAPP</span>
            </div>

            {/* content */}
            <div className="flex flex-col items-center mb-6">
               <h4 className="text-lg font-semibold text-[#495057]">Sing up</h4>
               <p className="text-[#7a7f9a]">Get your Chatvia account now.</p>
            </div>

            {/* card */}
            <div className="flex flex-col break-words bg-white rounded-lg p-9 mb-6 w-full max-w-[450px]">
               <form method="post" onSubmit={handleSubmit}>
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
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           className="w-full px-4 outline-0 border-0 text-sm font-medium"
                           type="email"
                           id="email"
                           name="email"
                           placeholder="Enter Email"
                        />
                     </div>
                  </div>

                  <div className="mb-4">
                     <label
                        className="mb-2 block font-semibold"
                        htmlFor="username"
                     >
                        Username
                     </label>
                     <div className="w-full mx-auto flex border-[1px] rounded-sm ">
                        <span className="px-[15px] py-3 text-sm text-slate-500 bg-slate-100 flex items-center justify-center">
                           <i className="ri-user-2-line"></i>
                        </span>
                        <input
                           onChange={(e) => setUsername(e.target.value)}
                           value={username}
                           className="w-full px-4 outline-0 border-0 text-sm font-medium"
                           type="text"
                           id="username"
                           name="username"
                           placeholder="Enter Username"
                        />
                     </div>
                  </div>

                  <div className="mb-6">
                     <label
                        className="mb-2 block font-semibold"
                        htmlFor="Password"
                     >
                        Password
                     </label>
                     <div className="w-full mx-auto flex border-[1px] rounded-sm ">
                        <span className="px-[15px] py-3 text-sm text-slate-500 bg-slate-100 flex items-center justify-center">
                           <i className="ri-lock-2-line"></i>
                        </span>
                        <input
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           className="w-full px-4 outline-0 border-0 text-sm font-medium"
                           type="password"
                           id="password"
                           name="password"
                           placeholder="Enter Password"
                        />
                     </div>
                  </div>

                  <div className="mb-4">
                     <button
                        className="w-full flex justify-center items-center p-2 rounded-[4px] transition-all bg-[#7269ef] text-white hover:bg-[#6159cb]"
                        type="submit"
                     >
                        Sing up
                     </button>
                  </div>
               </form>
            </div>

            {/* text footer */}
            <div className="mt-12 text-center text-[15px] font-medium text-gray-700">
               <p className="mb-4">
                  Already have an account?{" "}
                  <Link className="text-[#7269ef]" to="/login">
                     Signin
                  </Link>
               </p>
               <p>© 2022 ChatAPp. Crafted with by habibmustafa</p>
            </div>
         </div>
      </div>
   );
};

export default Register;
