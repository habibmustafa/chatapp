import React from "react";
import { useEffect } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { SideBar } from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
   const { user } = useSelector((state) => state.user);
   console.log(user);
   return (
      <div className="chat flex h-screen">
         <SideBar />
         <ChatContainer />
      </div>
   );
};

export default Dashboard;
