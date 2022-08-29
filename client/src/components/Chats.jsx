import React from "react";
import { User } from "./User";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Chats = () => {
   const [search, setSearch] = useState("");
   const { allUsers, chatUser } = useSelector((state) => state.user);

   return (
      <div className="chats">
         <div className="py-6 px-7">
            <h4 className="h4-size text-[21px] mb-6">Chats</h4>

            {/* search */}
            <div className="w-[333px] h-11 bg-[#e6ebf5] flex items-center rounded-[6.4px] mb-6 tablet:w-full">
               <span className="flex items-center justify-center ml-2 w-9 h-full">
                  <i className="ri-search-line search-icon text-lg leading-7 text-[#7a7f9a]"></i>
               </span>
               <input
                  type="search"
                  onChange={(e) => {
                     setSearch(e.target.value);
                  }}
                  value={search}
                  placeholder="Search messages or users"
                  className="w-full h-full bg-inherit text-[#495057] py-2 font-medium px-3 text-sm leading-5 rounded-[6.4px] outline-none"
               />
            </div>
         </div>

         {/* online check */}
         {/* later */}

         {/* recent */}
         <div className="recent px-3">
            <h5 className="text-[#495057] font-semibold leading-5 mb-4">
               Recent
            </h5>
            <div className="users max-h-[665px] overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 tablet:max-h-[620px]">
               {allUsers ? (
                  allUsers
                     .filter(
                        (name) =>
                           !name.username
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) || search === ""
                     )
                     .map((user) => (
                        <User key={user._id} user={user} chatUser={chatUser} />
                     ))
               ) : (
                  <div className="flex justify-center items-center h-[665px]">
                     Loading...
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
