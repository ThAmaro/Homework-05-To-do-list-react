const API_URL = "http://localhost:3000";

export function getToken() {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith("authToken="))
    ?.split("=")[1];
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function fetchTodos() {
  const token = getToken();
  const res = await fetch(`${API_URL}/todos`, {
    headers: { Authorization: token }
  });
  return res.json();
}

export async function createTodo(todo) {
  const token = getToken();
  await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(todo)
  });
}

export async function updateTodo(id, data) {
  const token = getToken();
  await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  });
}

export async function deleteTodo(id) {
  const token = getToken();
  await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });
}
