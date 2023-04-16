import React, { ChangeEvent, FC, useState } from "react";
import TodoTask from "./Task";
import { ITask } from "./Interfaces";
import "./App.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [timeline, setTimeline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setTimeline(+event.target.value);
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, timeline: timeline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setTimeline(0);
  };

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };
  return (
    <div className="app">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task Name"
            name="task"
            onChange={handleChange}
            value={task}
          />
          <input
            type="number"
            placeholder="Timeline ?"
            name="timeline"
            onChange={handleChange}
            value={timeline}
          />
        </div>
        <button onClick={addTask}>Add task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} deleteTask={deleteTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
