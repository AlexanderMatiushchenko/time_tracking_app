import {configureStore} from "@reduxjs/toolkit"
import  timeTrackingReducer from "./timeTrackingSlice"

export const store = configureStore({
    reducer: {
        timeTracking: timeTrackingReducer,
    }
})
