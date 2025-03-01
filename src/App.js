import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://task-manager-backend-x2zb.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post(API_URL, { name: task }).then((res) => {
      setTasks([...tasks, res.data]);
      setTask("");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter((t) => t._id !== id));
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.name} <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
