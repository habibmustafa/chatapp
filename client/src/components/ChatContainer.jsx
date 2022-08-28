import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatInput } from "./ChatInput";
import { Header } from "./Header";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { setStatus } from "../store/messageSlice";

export const ChatContainer = ({ socket }) => {
   const [messages, setMessages] = useState([]);
   const scrollRef = useRef();
   const [arrivalMessage, setArrivalMessage] = useState(null);

   const { user, chatUser } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   // real time
   const time = `${new Date().getHours()}:${new Date().getMinutes()}`;

   // send messages
   const sendMessage = async (e) => {
      if (!e) {
         return false;
      }

      await axios.post(sendMessageRoute, {
         from: user._id,
         to: chatUser._id,
         message: e,
      });

      socket.current.emit("send-msg", {
         to: chatUser._id,
         from: user._id,
         msg: e,
      });

      const msgs = [...messages];
      msgs.push({
         fromSelf: true,
         message: e,
         time,
      });
      setMessages(msgs);
   };

   // receive messages
   useEffect(() => {
      setMessages("");

      async function getFetch() {
         const response = await axios.post(recieveMessageRoute, {
            from: user._id,
            to: chatUser._id,
         });
         setMessages(response.data);
      }
      getFetch();

      if (socket.current) {
         socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg, time });
         });
      }
   }, [chatUser, user, socket, time]);

   useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage]);

   // scroll down
   useEffect(() => {
      scrollRef.current?.scrollIntoView();
      if (messages.length > 0) {
         dispatch(setStatus(messages[messages.length - 1]));
      }
   }, [messages, dispatch]);

   // tablet:absolute tablet:-right-full
   // bunu duzelt animasiya
   return (
      <div className={`chatcontainer flex-1 flex h-full flex-col bg-white mr-0.5 transition-all duration-300 relative tablet:absolute tablet:z-10 tablet:w-full ${chatUser ? "tablet:-translate-x-0" : "tablet:hidden"}`}>
         <Header />

         {/* messages container */}
         <div className="messages flex-1 flex flex-col p-6 pb-1 gap-7 overflow-y-auto overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300">
            {/* message */}
            {messages ? (
               messages.map((message, i) => (
                  <div
                     key={i}
                     ref={scrollRef}
                     className={`flex items-end justify-end gap-2.5 ${
                        !message.fromSelf && "flex-row-reverse"
                     }`}
                  >
                     {/*  flex-row-reverse */}
                     <div
                        className={`flex flex-col gap-4 ${
                           !message.fromSelf ? "items-start" : "items-end"
                        }`}
                     >
                        {/* items-start */}
                        <div
                           className={`flex ${
                              !message.fromSelf && "flex-row-reverse"
                           }`}
                        >
                           {/* flex-row-reverse */}

                           {/* icon */}
                           <span className="w-[15px] h-[15px] text-[#6159cb] text-[15px] leading-6 text-right inline-block">
                              <i className="ri-more-2-fill"></i>
                           </span>

                           {/* content */}
                           <div
                              className={`px-5 py-1.5 rounded-xl min-w-[90px] max-w-lg flex flex-col items-start bg-[#f5f7fb] text-[#212529] ${
                                 !message.fromSelf &&
                                 "items-end bg-[#7269ef] text-white"
                              }`}
                           >
                              <p className="text-[15px] leading-6 font-medium break-all">
                                 {message.message}
                              </p>
                              <span
                                 className={`w-full text-[#7a7f9a] text-xs leading-[18px] inline-block ${
                                    !message.fromSelf &&
                                    "text-[#ffffff80] text-right"
                                 }`}
                              >
                                 {message.time}
                              </span>
                           </div>
                        </div>
                        <p className="text-[#495057] text-sm leading-5 font-medium">
                           {/* text-left */}
                           {message.fromSelf
                              ? user.username
                              : chatUser.username}
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
               ))
            ) : (
               <div className="text-3xl flex items-center justify-center h-full">
                  Loading...
               </div>
            )}
         </div>

         <ChatInput sendMessage={sendMessage} />
      </div>
   );
};
