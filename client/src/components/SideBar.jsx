import React from "react";
import { Link } from "react-router-dom";
import { Chats } from "./Chats";

export const SideBar = () => {
   return (
      <div className="sidebar flex h-screen">
         {/* sidemenu */}
         <div className="sidemenu shadow-lg max-w-[75px] w-full h-screen flex flex-col justify-between items-center p-4">
            {/* logo */}
            <div className="flex items-center gap-1 text-3xl text-[#7269ef] cursor-pointer">
               <i className="ri-chat-smile-2-fill"></i>
            </div>

            {/* center nav */}
            <div>
               <button className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer focus:bg-slate-200">
                  <i className="ri-user-2-line"></i>
               </button>
               <button className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer focus:bg-slate-200">
                  <i className="ri-message-3-line"></i>
               </button>
               <button className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer focus:bg-slate-200">
                  <i className="ri-group-line"></i>
               </button>
               <button className="text-2xl opacity-50 px-4 inline-block rounded-lg py-3 my-2 cursor-pointer focus:bg-slate-200">
                  <i className="ri-settings-2-line"></i>
               </button>
            </div>

            {/* bottom nav */}
            <button className="text-2xl opacity-50 px-4 inline-block rounded-lg py-2 my-2 cursor-pointer">
               <Link to="/login">
                  <i className="ri-logout-box-line"></i>
               </Link>
            </button>
         </div>

         {/* sidechange */}
         <div className="sidechange w-96 bg-[#f5f7fb]">
            <Chats />
         </div>
      </div>
   );
};
