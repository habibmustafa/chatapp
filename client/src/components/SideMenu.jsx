import React from "react";

const SideMenu = () => {
   return (
      <div className="sidemenu shadow-lg max-w-[75px] w-full h-screen flex flex-col justify-between items-center p-4">
         {/* logo */}
         <div className="flex items-center gap-1 text-3xl text-[#7269ef] cursor-pointer">
            <i className="ri-chat-smile-2-fill"></i>
         </div>

         {/* center nav */}
         <div>
            <div tabIndex='5' className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer focus:bg-slate-200">
               <i className="ri-user-2-line"></i>
            </div>
            <div className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer">
               <i className="ri-message-3-line"></i>
            </div>
            <div className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer">
               <i className="ri-group-line"></i>
            </div>
            <div className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer">
               <i className="ri-settings-2-line"></i>
            </div>
         </div>

         {/* bottom nav */}
         <div className="text-2xl opacity-50 px-4 inline-block rounded-lg py-2 my-2 cursor-pointer">
            <i className="ri-logout-box-line"></i>
         </div>
      </div>
   );
};

export default SideMenu;
