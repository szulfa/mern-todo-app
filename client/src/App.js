import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { getDeviceId } from "./utils/deviceId";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const deviceId = getDeviceId();

  // Fetch todos on page load
  useEffect(() => {
    axios
      .get(`https://mern-todo-app-1-hlbp.onrender.com/api/todos?deviceId=${deviceId}`)
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, [deviceId]);

  // Add new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    axios
      .post("https://mern-todo-app-1-hlbp.onrender.com/api/todos", { title, deviceId })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));

    setTitle("");
  };

  // Toggle completed
  const handleUpdate = (id) => {
    axios
      .put(`https://mern-todo-app-1-hlbp.onrender.com/api/todos/${id}`, { deviceId })
      .then(res => {
        const updated = todos.map(todo => todo._id === id ? res.data : todo);
        setTodos(updated);
      })
      .catch(err => console.log(err));
  };

  // Delete todo
  const handleDelete = (id) => {
    axios
      .delete(`https://mern-todo-app-1-hlbp.onrender.com/api/todos/${id}`, { data: { deviceId } })
      .then(() => {
        const remaining = todos.filter(todo => todo._id !== id);
        setTodos(remaining);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>My To-Do App</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <label className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUpdate(todo._id)}
              />
              <span className="todo-title">{todo.title}</span>
            </label>
            <button className="delete" onClick={() => handleDelete(todo._id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
