import { configureStore } from "@reduxjs/toolkit";
import { bookSliceReducer } from "./bookSlice";
import { libraryReducer } from "./librarySlice";


const store = configureStore({
    reducer: {
        bookSlicer: bookSliceReducer,
        librarySlicer: libraryReducer
    }
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>