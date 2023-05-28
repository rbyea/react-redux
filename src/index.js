import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initiateStore } from "./store/store";
import * as actions from "./store/actions";

const store = initiateStore();

const App = () => {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completedTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const deletedTask = (taskId) => {
    store.dispatch(actions.taskDeletd(taskId));
  }
  return (
    <>
      <h1>app</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p> <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completedTask(el.id)}>Completed</button>
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
