import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import configureStore from "./store/store";
import {
  сompletedTask,
  titleChanged,
  taskDeletd,
  loadingTasks,
  getTasks,
  getTasksLoadingStatus,
  addTask,
} from "./store/task";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const data = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    dispatch(loadingTasks());
  }, [dispatch]);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deletedTask = (taskId) => {
    dispatch(taskDeletd(taskId));
    if (taskId === 201) {
      setDisabled(false);
    }
  };

  const createTask = () => {
    dispatch(
      addTask({
        title: "Create Title",
        completed: false,
      })
    );
    setDisabled(true);
  };

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>app</h1>

      <button onClick={createTask} disabled={disabled}>
        Add Task
      </button>

      <ul>
        {data.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p> <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(сompletedTask(el.id))}>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
