import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./config/Routing";
import { Toaster } from "react-hot-toast";
import 'remixicon/fonts/remixicon.css'


const App = () => {
   return (
      <BrowserRouter>
         <Toaster position="top-right" />
         <Routing />
      </BrowserRouter>
   );
};

export default App;
