import { configureStore } from "@reduxjs/toolkit";
import reducerTask from "./reducers/taskReducer";

export const store = configureStore({
    reducer: {
        task: reducerTask,
    },
});

export default store;

