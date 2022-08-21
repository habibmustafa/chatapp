import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./config/Routing";
import 'remixicon/fonts/remixicon.css'


const App = () => {
   return (
      <BrowserRouter>
         <Routing />
      </BrowserRouter>
   );
};

export default App;
