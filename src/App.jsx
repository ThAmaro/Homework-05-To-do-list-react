import { useEffect, useState } from "react";
import AuthSection from "./components/Auth/AuthSection";
import TodoForm from "./components/Todos/TodoForm";
import TodoList from "./components/Todos/TodoList";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getToken
} from "./services/api";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (loggedIn) loadTodos();
  }, [loggedIn]);

  async function loadTodos() {
    const data = await fetchTodos();
    setTodos(data);
  }

  async function addTodo(todo) {
    await createTodo(todo);
    loadTodos();
  }

  async function handleUpdate(id, data) {
    await updateTodo(id, data);
    loadTodos();
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    loadTodos();
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      {!loggedIn ? (
        <AuthSection onLogin={() => setLoggedIn(true)} />
      ) : (
        <>
          <div className="logout-section">
  <button
    className="logout-btn"
    onClick={() => {
      document.cookie = "authToken=; Max-Age=0; path=/";
      setLoggedIn(false);
    }}
  >
    Logout
  </button>
</div>

          <TodoForm onAdd={addTodo} />
          <TodoList
            todos={todos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
