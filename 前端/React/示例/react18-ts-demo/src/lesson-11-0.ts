export {};
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
const counter = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
export const { increment } = counter.actions;
export const store = configureStore({ reducer: { counter: counter.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
store.dispatch(increment(2));
console.log(store.getState().counter.value);
