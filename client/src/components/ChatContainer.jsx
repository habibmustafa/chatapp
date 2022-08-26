import { useState, useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { Header } from "./Header";
export const ChatContainer = () => {
   const [messages, setMessages] = useState([]);
   const scrollRef = useRef();

   const sendMessage = (e) => {
      setMessages([...messages, e]);
   };

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   return (
      <div className="chatcontainer flex-1 flex flex-col mr-0.5">
         <Header />

         {/* messages container */}
         <div className="messages flex-1 flex flex-col p-6 pb-1 gap-7 overflow-y-auto overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300">
            {/* message */}

            {messages?.map((message, i) => (
               <div
                  key={i}
                  ref={scrollRef}
                  className="flex items-end justify-end gap-2.5"
               >
                  {/*  flex-row-reverse */}
                  <div className="flex flex-col items-end gap-3.5">
                     {/* items-start */}
                     <div className="flex">
                        {/* flex-row-reverse */}

                        {/* icon */}
                        <span className="w-[15px] h-[15px] text-[#6159cb] text-[15px] leading-6 text-right inline-block">
                           <i className="ri-more-2-fill"></i>
                        </span>

                        {/* content */}
                        <div className="bg-[#f5f7fb] px-5 py-1.5 rounded-xl min-w-[90px]">
                           <p className="text-[15px] leading-6 text-[#212529] font-medium">
                              {message}
                           </p>
                           <span className="w-full text-[#7a7f9a] text-xs leading-[18px] inline-block text-left">
                              {/* text-right */}
                              10:02
                           </span>
                        </div>
                     </div>
                     <p className="text-[#495057] text-sm leading-5  font-medium">
                        {/* text-left */}
                        Patricia Smith
                     </p>
                  </div>

                  {/* profile */}
                  <div className="flex items-end rounded-full w-[35px] h-[35px] bg-cover text-right">
                     <img
                        className="rounded-full "
                        src="https://image.shutterstock.com/image-vector/profile-blank-icon-empty-photo-260nw-535853269.jpg"
                        alt=""
                     />
                  </div>
               </div>
            ))}
         </div>

         <ChatInput sendMessage={sendMessage} />
      </div>
   );
};
