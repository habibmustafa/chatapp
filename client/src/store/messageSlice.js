const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   messages: [],
   status: false,
};

const messageSlice = createSlice({
   name: "message",
   initialState,
   reducers: {
      setMessages: (state, action) => {
         state.messages = action.payload;
      },
      setStatus: (state, action) => {
         state.status = action.payload;
      },
   },
});

export const { setMessages, setStatus } = messageSlice.actions;
export default messageSlice.reducer;
