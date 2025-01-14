import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
import { LogInput } from "../components/LogInput";

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
         navigate("/");
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
                  <LogInput
                     label="email"
                     children="Email"
                     placeholder="Enter Email"
                     icon="ri-mail-line"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <LogInput
                     label="username"
                     children="Username"
                     placeholder="Enter Username"
                     icon="ri-user-2-line"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  <LogInput
                     label="password"
                     children="Password"
                     placeholder="Enter Password"
                     icon="ri-lock-2-line"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="mb-4 mt-6">
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
