import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import configureStore from "./store/store";
import {
  сompletedTask,
  titleChanged,
  taskDeletd,
  getTasks,
} from "./store/task";

const store = configureStore();

const App = () => {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    store.dispatch(getTasks())
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  console.log(state);

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deletedTask = (taskId) => {
    store.dispatch(taskDeletd(taskId));
  };

  return (
    <>
      <h1>app</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p> <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(сompletedTask(el.id))}>
              Completed
            </button>
            <button onClick={() => changeTitle(el.id)}>ChangeTitle</button>
            <button onClick={() => deletedTask(el.id)}>DeleteTask</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
