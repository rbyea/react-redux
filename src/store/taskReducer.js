import { taskType, deleteTask } from "./actionsTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskType:
      const newArray = [...state];
      const arrayIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[arrayIndex] = {
        ...newArray[arrayIndex],
        ...action.payload,
      };

      return newArray;
    case deleteTask:
      const arrayFilter = state.filter(
        (el) => el.id !== action.payload.id
      );

      return arrayFilter;

    default:
      return state;
  }
}
