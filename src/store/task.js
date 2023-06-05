import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.services";
import { setErrors } from "./errors";
const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    update(state, action) {
      const arrayIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[arrayIndex] = {
        ...state.entities[arrayIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    taskRequested(state, action) {
      state.isLoading = false;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    add(state, action) {
      state.entities.unshift(action.payload);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequestFailed, taskRequested, add } =
  actions;

export const loadingTasks = (id) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const resp = await todosService.fetch();
    dispatch(recived(resp));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setErrors(error.message));
  }
};

export const addTask = (newTask) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const resp = await todosService.add(newTask);
    console.log(resp);
    dispatch(add(resp));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setErrors(error.message));
  }
};

export const сompletedTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeletd(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
// export const getTaskAddNew = () => (state) => state.tasks.entities;

export default taskReducer;
