const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
   status: '',
}

const messageSlice = createSlice({
   name: "message",
   initialState,
   reducers: {
      setStatus: (state, action) => {
         state.status = action.payload
      }
   }
})

export const {setStatus} = messageSlice.actions
export default messageSlice.reducer