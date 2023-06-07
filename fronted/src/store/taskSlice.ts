import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id: string;
  _id: string;
  title: string;
  description: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const getallTasks = createAsyncThunk("tasks/getallTasks", async () => {
  const response = await axios.get("http://localhost:5000/api/task/getallTasks");
  return response.data;
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Partial<Task>) => {
    const response = await axios.post("http://localhost:5000/api/task/createTask", taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (taskData: Task) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/task/updateTask/${taskData._id}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update task.");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/deleteTask/${taskId}`);
      return taskId; // Return the taskId as the payload
    } catch (error) {
      throw new Error("Failed to delete task.");
    }
  }
);



const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getallTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(getallTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error occurred";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskId = action.payload;
        state.tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
      });
  },
});

export default taskSlice.reducer;
export type RootState = ReturnType<typeof taskSlice.reducer>;
