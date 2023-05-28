import * as actionTypes from "./actionsTypes";

export function taskCompleted(id) {
  return {
    type: actionTypes.taskType,
    payload: { id, completed: true },
  };
}
export function titleChanged(id) {
  return {
    type: actionTypes.taskType,
    payload: { id, title: `New title for ${id}` },
  };
}

export function taskDeletd(id) {
  return {
    type: actionTypes.deleteTask,
    payload: {id}
  }
}
