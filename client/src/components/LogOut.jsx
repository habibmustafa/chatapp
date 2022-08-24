import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
   const navigate = useNavigate();
   const handleClick = async () => {
      localStorage.clear();
      navigate("/login");
   };

   return (
      <button
         className="p-2 bg-slate-600 text-yellow-50 rounded-lg mb-2"
         onClick={handleClick}
      >
         logOut
      </button>
   );
};

export default LogOut;
