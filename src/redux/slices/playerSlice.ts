import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// INTERFACES

interface FilterSliceState {
  score: number;
  level: 0;
  polyline: number[][] | null;
  difficult: string;
}

const initialState: FilterSliceState = {
  score: 0,
  level: 0,
  polyline: null,
  difficult: 'normal',
};

const filterSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addPoints(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    setNextLevel(state) {
      state.level++;
    },
    setPolyline(state, action) {
      state.polyline = action.payload;
    },
    setDifficult(state, action) {
      state.difficult = action.payload;
    },
    resetLevel(state) {
      state.level = 0;
    },
    resetScore(state) {
      state.score = 0;
    },
  },
});
export const { addPoints, setNextLevel, setPolyline, setDifficult, resetLevel, resetScore } =
  filterSlice.actions;
export default filterSlice.reducer;
