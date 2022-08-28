import React from "react";
import { useEffect } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { SideBar } from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllUsers } from "../store/userSlice";
import { allUsersRoute, host } from "../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";
import { useRef } from "react";

const Dashboard = () => {
   const { user } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const socket = useRef();

   useEffect(() => {
      !user && navigate("/login");
   }, [user, navigate]);

   useEffect(() => {
      async function getFetch() {
         if (user) {
            const getAllUsers = await axios.get(`${allUsersRoute}/${user._id}`);
            return dispatch(
               setAllUsers(
                  getAllUsers.data
                  // .data.filter((item) => item._id !== user._id)
               )
            );
         }
      }
      getFetch();
   }, [user, dispatch]);

   useEffect(() => {
      if (user) {
         socket.current = io(host);
         socket.current.emit("add-user", user._id);
      }
   }, [user]);

   return (
      <div className="chat flex h-screen min-w-[280px] relative">
         <SideBar />
         <ChatContainer socket={socket} />
      </div>
   );
};

export default Dashboard;
