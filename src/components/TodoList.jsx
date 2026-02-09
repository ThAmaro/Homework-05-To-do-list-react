import TodoItem from './TodoItem';

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return <p>No todos yet. Add your first todo!</p>;
  }

  return (
    <ul id="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;