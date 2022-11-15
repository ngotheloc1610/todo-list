/* Redux-Toolkit */
import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "todoList",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      // localStorage.setItem("todoList", JSON.stringify(state));
    },
    updateTodo: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.priority = action.payload.priority;
          item.description = action.payload.description;
          item.date = action.payload.date;
        }
      });
      // localStorage.setItem("todoList", JSON.stringify(state));
    },
    removeTodo: (state, action) => {
      const item = state.filter((item) => item.id !== action.payload);
      // localStorage.setItem("todoList", JSON.stringify(item));
      return state.filter((item) => item.id !== action.payload);
    },
    clearList: (state) => {
      // localStorage.setItem("todoList", JSON.stringify(state));
      return (state = []);
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  },
});
