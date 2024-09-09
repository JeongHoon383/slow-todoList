import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "../../utils"; // 2초 지연 함수

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

export const __deleteToDo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ToDo 추가 액션 처리
    builder
      .addCase(__addToDo.pending, (state) => {
        state.loading = true; // 로딩 상태 설정
      })
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(__addToDo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(__deleteToDo.pending, (state) => {
        state.loading = true;
      })
      .addCase(__deleteToDo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((todo) => todo.id !== action.payload); // 해당 id의 ToDo 삭제
      })
      .addCase(__deleteToDo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
