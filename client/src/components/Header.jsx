import React from "react";

export const Header = () => {
   return (
      <div className="header p-6 border-b border-zinc-100 text-[#495057] text-[15px] leading-[22.5px] flex justify-between ">
         
         {/* name */}
         <div className="flex items-center gap-4">
            <div className="rounded-full w-[35px] h-[35px] bg-cover text-left">
               <img
                  className="rounded-full "
                  src="https://image.shutterstock.com/image-vector/profile-blank-icon-empty-photo-260nw-535853269.jpg"
                  alt=""
               />
            </div>
            <p className="cursor-pointer font-semibold leading-5">Doris Brown</p>
         </div>

         {/* right icons */}
         <div className="text-xl text-[#7a7f9a] text-center flex items-center gap-2">
            <button className="w-10 h-10 leading-10 hover:scale-110">
               <i className="ri-search-line"></i>
            </button>
            <button className="w-10 h-10 leading-10 hover:scale-110">
               <i className="ri-user-2-line"></i>
            </button>
            <button className="w-10 h-10 leading-10 hover:scale-110">
               <i className="ri-more-fill"></i>
            </button>
         </div>
      </div>
   );
};
