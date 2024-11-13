import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBotResponse } from '../api/botAPI';
import { saveChatHistory, loadChatHistory, clearChatHistory } from '../utils/localStorage';

export const recieveMessage = createAsyncThunk('chat/recieveMessage', async (message) => {
  const response = await getBotResponse(message);
  return response;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: loadChatHistory(),
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      saveChatHistory(state.messages);
    },
    clearChat: (state, action) => {
      state.messages = [];
      clearChatHistory();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recieveMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(recieveMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
        console.log(JSON.stringify(action.payload));
        saveChatHistory(state.messages);
      })
      .addCase(recieveMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.messages.pop();
        saveChatHistory(state.messages);
      });
  },
});

export const { addMessage } = chatSlice.actions;
export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
