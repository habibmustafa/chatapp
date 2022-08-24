import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes";

const socket = io(host);

const App = () => {
   const [value, setValue] = useState("");
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      socket.on("connect", () => console.log(socket.id));

      socket.on("chat", (data) => {
         setMessages([...messages, data]);
      });
   }, [messages]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      socket.emit("chat", value);
      setValue("");
      // await fetch("http://localhost:5000");
   };

   return (
      <div className="flex items-center justify-center flex-col h-full w-2/5 mx-auto">
         <div className="bg-slate-100 mb-2 w-full h-[400px] overflow-auto ">
            {messages.length
               ? messages.map((message, i) => (
                    <p
                       key={i}
                       className="text-lg p-3 mb-1 font-semibold even:bg-slate-200"
                    >
                       {message}
                    </p>
                 ))
               : null}
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
