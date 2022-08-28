import {configureStore} from "@reduxjs/toolkit"
import user from "./userSlice"
import message from "./messageSlice"

export const store = configureStore({
   reducer: {
      user,
      message
   }
})