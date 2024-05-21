import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    timeEntries: [],

}

const timeTrackingSlice = createSlice ({
    name: "timeTracking",
    initialState,
    reducers: {
    addTimeEntry: (state, action) => {
            state.timeEntries.push(action.payload);
          },
    updateTimeEntry: (state, action)=>{
        const { id, newEntry } = action.payload;
        const index = state.timeEntries.findIndex(entry => entry.id === id);
        if (index !== -1) {
          state.timeEntries[index] = { ...state.timeEntries[index], ...newEntry };
        }
    },
    deleteTimeEntry: (state, action)=>{
        state.timeEntries.filter(entry=>entry.id !== action.payload);
    },
},  
})

export const {addTimeEntry,updateTimeEntry,deleteTimeEntry} = timeTrackingSlice.actions;
export default timeTrackingSlice.reducer;