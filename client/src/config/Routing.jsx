import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routing = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </>
   );
};

export default Routing;
