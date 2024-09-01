import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";

interface Note {
  title: string;
  text: string;
}


interface NoteState {
  notes: string[];
}

const initialState: NoteState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<string>) => {
      state.notes.push(action.payload);
    },
    clearNotes: (state) => {
      state.notes = [];
    },
  },
});

export const { addNote, clearNotes } = notesSlice.actions;

const store = configureStore({
  reducer: {
    [notesSlice.name]: notesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
