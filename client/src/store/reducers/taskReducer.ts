import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../interface/interface";
import axios from "axios";

export const getTask: any = createAsyncThunk<Task[], { filter?: string }, {}>(
    "task/getTask",
    async ({ filter }) => {
        const response = await axios.get("http://localhost:8080/tasks");
        const tasks: Task[] = response.data;

        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'incomplete':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    }
);


export const addTask:any = createAsyncThunk<Task, Task, {}>(
    "task/addTask",
    async (task: Task) => {
        const response = await axios.post("http://localhost:8080/tasks", task);
        return response.data;
    }
);

export const updateTask:any = createAsyncThunk<Task, Task, {}>(
    "task/updateTask",
    async (task: Task) => {
        const response = await axios.put(`http://localhost:8080/tasks/${task.id}`, task);
        return response.data;
    }
);

export const deleteTask:any = createAsyncThunk<number, number, {}>(
    "task/deleteTask",
    async (id: number) => {
        await axios.delete(`http://localhost:8080/tasks/${id}`);
        return id;
    }
);



const reducerTask = createSlice({
    name: "task",
    initialState: [] as Task[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTask.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                return state.filter((task) => task.id !== action.payload);
            });
    }
});

export default reducerTask.reducer;
