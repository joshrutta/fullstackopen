import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: null,
};

let timeoutId = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const { messageType, message } = action.payload;
      return { messageType, message };
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const notify = (messageType, message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification({ messageType, message }));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => dispatch(setNotification({ message: "" })),
      seconds * 1000
    );
  };
};

export default notificationSlice.reducer;
