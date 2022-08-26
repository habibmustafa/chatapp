import React from "react";
import { Link } from "react-router-dom";

export const User = () => {
   return (
      <>
         <Link
            to="#"
            className="rounded-1 text-[15px] text-[#7a7f9a] leading-[22.5px] py-4 px-5 flex justify-between gap-4 transition-all duration-200 hover:bg-[#e6ebf5]"
         >
            <div className="rounded-full w-[35px] h-[35px] bg-cover text-left">
               <img
                  className="rounded-full "
                  src="https://image.shutterstock.com/image-vector/profile-blank-icon-empty-photo-260nw-535853269.jpg"
                  alt=""
               />
            </div>
            <div className="flex-1 ">
               <h5 className="font-semibold text-[15px] text-[#495057] leading-[18px] mb-1">
                  Patrick Hendricks
               </h5>
               <p className="text-sm leading-5">okay sure</p>
            </div>
            <div className="text-[11px] leading-4 h-full ">02:50</div>
         </Link>
      </>
   );
};
