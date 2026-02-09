import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoSection({ 
  todos, 
  loading, 
  onLogout, 
  onAddTodo, 
  onUpdateTodo, 
  onDeleteTodo 
}) {
  return (
    <div id="todoSection">
      <div className="logout-section">
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <TodoForm onAddTodo={onAddTodo} />
      
      <div className="todos-section">
        <h2>Your Todos</h2>
        {loading ? (
          <p>Loading todos...</p>
        ) : (
          <TodoList 
            todos={todos}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        )}
      </div>
    </div>
  );
}

export default TodoSection;