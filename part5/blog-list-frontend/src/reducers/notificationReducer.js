import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageType: null,
  message: null,
};

let timeoutId = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

// setNotification here is an action creator
export const { setNotification } = notificationSlice.actions;

export const notify = (messageType, message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification({ messageType, message }));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => dispatch(setNotification({ messageType: "", message: "" })),
      seconds * 1000
    );
  };
};

export default notificationSlice.reducer;
