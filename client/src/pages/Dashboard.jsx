import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {
   host,
   allUsersRoute,
   sendMessageRoute,
   recieveMessageRoute,
} from "../utils/APIRoutes";
import LogOut from "../components/LogOut";
// import UsersSidebar from "../components/UsersSidebar";
import axios from "axios";

// const socket = io(host);

const App = () => {
   const [value, setValue] = useState("");
   const [messages, setMessages] = useState([]);
   const [user, setUser] = useState(false);
   const [chatUser, setChatUser] = useState(false);
   const [allUsers, setAllUsers] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem("user")) {
         navigate("../login");
      } else {
         setUser(JSON.parse(localStorage.user));
      }
   }, [navigate]);

   useEffect(() => {
      async function getFetch() {
         if (user) {
            const getAllUsers = await axios.get(allUsersRoute);
            return setAllUsers(
               getAllUsers.data.filter((item) => item._id !== user._id)
            );
         }
      }
      getFetch();
   }, [user]);

   useEffect(() => {
      async function getFetch2() {
         const response = await axios.post(recieveMessageRoute, {
            from: user._id,
            to: chatUser._id,
         });
         setMessages(response.data);
      }
      getFetch2();
   }, [chatUser]);

   console.log("dashboard");
   console.log(messages);

   // useEffect(() => {
   //    socket.on("connect", () => console.log(socket.id));

   //    socket.on("chat", (data) => {
   //       setMessages([...messages, data]);
   //    });
   // }, [messages]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (value) {
         await axios.post(sendMessageRoute, {
            from: user._id,
            to: chatUser._id,
            message: value,
         });
      }
      setValue("");
      // socket.emit("chat", value);
      // setValue("");
   };

   return (
      <div className="flex items-center justify-center flex-col h-full w-2/5 mx-auto">
         <LogOut />
         <div className="w-full flex gap-3">
            <div className="bg-slate-100 mb-2 overflow-y-auto min-w-[220px]">
               {allUsers.length
                  ? allUsers.map((user) => (
                       <div
                          onClick={() => setChatUser(user)}
                          className="py-2 px-4 hover:bg-cyan-200 cursor-pointer"
                          key={user._id}
                       >
                          {user.username}
                       </div>
                    ))
                  : null}
            </div>
            <div className="bg-slate-100 mb-2 w-full h-[400px] overflow-auto ">
               {messages.length
                  ? messages.map((message, i) => (
                       <p
                          key={i}
                          className="text-lg p-3 mb-1 font-semibold even:bg-slate-200"
                       >
                          {message.message}
                       </p>
                    ))
                  : null}
            </div>
         </div>
         <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full flex justify-between gap-2"
         >
            <input
               onChange={(e) => setValue(e.target.value)}
               value={value}
               className="bg-slate-200 px-4 py-2 rounded-lg w-full"
               type="text"
               placeholder="write..."
            />
            <button className="bg-slate-200 px-4 py-2 rounded-lg">
               Submit
            </button>
         </form>
      </div>
   );
};

export default App;
