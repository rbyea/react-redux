import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.services";
const initialState = [{id: 1, title: "test", completed: false}];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    set(action) {
      return action.payload;
    },
    update(state, action) {
      const arrayIndex = state.findIndex((el) => el.id === action.payload.id);
      state[arrayIndex] = {
        ...state[arrayIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, set } = actions;

export const getTasks = () => async (dispatch) => {
  try {
    const resp = await todosService.fetch();
    dispatch(set(resp));
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export const сompletedTask = (id) => (getState, dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeletd(id) {
  return remove({ id });
}

export default taskReducer;
