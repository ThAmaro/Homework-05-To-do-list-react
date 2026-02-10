function TodoItem({ todo, onUpdate, onDelete }) {
  function handleToggle() {
    onUpdate(todo.id, { completed: !todo.completed });
  }

  function handleEdit() {
    const title = prompt("Edit title", todo.title);
    if (!title) return;

    const description = prompt("Edit description", todo.description);
    if (!description) return;

    onUpdate(todo.id, { title, description });
  }

  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />

        <div className="todo-content">
          <div className="todo-title">{todo.title}</div>
          <div className="todo-description">{todo.description}</div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          type="button"
          className="btn-edit"
          onClick={handleEdit}
        >
          Edit
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
