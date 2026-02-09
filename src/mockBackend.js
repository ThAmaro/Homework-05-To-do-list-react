// Simulação do backend para desenvolvimento
const mockTodos = {};
let mockUsers = {};
let currentId = 1;

export const mockApi = {
  async register(userData) {
    if (mockUsers[userData.username]) {
      return { error: 'User already exists' };
    }
    mockUsers[userData.username] = userData.password;
    return { success: true };
  },

  async login(userData) {
    if (mockUsers[userData.username] === userData.password) {
      return { token: `mock-token-${userData.username}` };
    }
    return { error: 'Invalid credentials' };
  },

  async getTodos(token) {
    const username = token.replace('mock-token-', '');
    return mockTodos[username] || [];
  },

  async addTodo(token, todo) {
    const username = token.replace('mock-token-', '');
    if (!mockTodos[username]) mockTodos[username] = [];
    const newTodo = { ...todo, id: currentId++, completed: false };
    mockTodos[username].push(newTodo);
    return newTodo;
  },

  async updateTodo(token, id, updates) {
    const username = token.replace('mock-token-', '');
    if (mockTodos[username]) {
      const index = mockTodos[username].findIndex(t => t.id === id);
      if (index !== -1) {
        mockTodos[username][index] = { ...mockTodos[username][index], ...updates };
      }
    }
  },

  async deleteTodo(token, id) {
    const username = token.replace('mock-token-', '');
    if (mockTodos[username]) {
      mockTodos[username] = mockTodos[username].filter(t => t.id !== id);
    }
  }
};