import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";

const UsersSidebar = ({ user }) => {
   const [users, setUsers] = useState("");

   useEffect(() => {
      async function getFetch() {
         if (user) {
            const allUsers = await axios.get(allUsersRoute);
            return setUsers(
               allUsers.data.filter((item) => item._id !== user._id)
            );
         }
      }
      getFetch();
   }, [user]);

   return (
      <div className="bg-slate-100 mb-2 overflow-y-auto min-w-[220px]">
         {users.length
            ? users.map((user) => (
                 <div
                    className="py-2 px-4 hover:bg-cyan-200 cursor-pointer"
                    key={user._id}
                 >
                    {user.username}
                 </div>
              ))
            : null}
      </div>
   );
};

export default UsersSidebar;
