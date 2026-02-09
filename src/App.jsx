import { useState, useEffect, use } from 'react';
import './App.css';
import Header from './components/Header';
import AuthSection from './components/AuthSection';
import TodoSection from './components/TodoSection';

const API_URL = 'http://localhost:3000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      loadTodos(token);
    }
  }, []);

  useEffect(() => {
  if (isAuthenticated && todos.length > 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}, [todos, isAuthenticated]);

useEffect(() => {
  if (isAuthenticated) {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }
}, [isAuthenticated]);
  
  const getAuthToken = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.startsWith('authToken='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const loadTodos = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: { "Autorization": token}
      });

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    } 
    setLoading(false);
  };

  const handleLogin = () => {
    document.cookie = "authToken=valid-token; path=/";
    setIsAuthenticated(false);
    setTodos([]);
  };

  const handleLoginSucess = (token) => {
    document.cookie = `authToken=${token}; path=/`;
    setIsAuthenticated(true);
    loadTodos(token);
  };

  const handleAddTodo = async (newTodo) => {
    const token = getAuthToken();
    try {
      await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Autorization": token
        },
        body: JSON.stringify(newTodo)
      });
      loadTodos(token);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  
  const handleUpdateTodo = async (id, updates) => {
    const token = getAuthToken();
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": token 
        },
        body: JSON.stringify(updates)
      });
      loadTodos(token);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  
  const handleDeleteTodo = async (id) => {
    const token = getAuthToken();
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      });
      loadTodos(token);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      
      {isAuthenticated ? (
        <TodoSection
          todos={todos}
          loading={loading}
          onLogout={handleLogout}
          onAddTodo={handleAddTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      ) : (
        <AuthSection onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;