import React from "react";
import { addMessage, getData } from "../firebase";

const Dashboard = () => {
   const handleClick = async () => {
      // await addMessage({
      //    text: "alma",
      // });
      getData()
   };

   return (
      <div className="h-full flex justify-center items-center">
         <button
            onClick={handleClick}
            className="w-40 flex justify-center items-center p-2 rounded-[4px] bg-[#766fd8] text-white hover:bg-[#6159cb]"
            type="button"
         >
            yoxlama
         </button>
      </div>
   );
};

export default Dashboard;
