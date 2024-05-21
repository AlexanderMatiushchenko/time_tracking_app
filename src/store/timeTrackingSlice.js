import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeEntries: [],
};

const timeTrackingSlice = createSlice({
    name: "timeTracking",
    initialState,
    reducers: {
        addTimeEntry: (state, action) => {
            state.timeEntries.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.timeEntries));
        },
        updateTimeEntry: (state, action) => {
            const { id, category, hours, date } = action.payload;
            const existingEntry = state.timeEntries.find(entry => entry.id === id);
            if (existingEntry) {
              existingEntry.category = category;
              existingEntry.hours = hours;
              existingEntry.date = date;
            }
          },
        deleteTimeEntry: (state, action) => {
            state.timeEntries = state.timeEntries.filter(entry => entry.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.timeEntries));
        },
    },
});

export const { addTimeEntry, updateTimeEntry, deleteTimeEntry } = timeTrackingSlice.actions;
export default timeTrackingSlice.reducer;
