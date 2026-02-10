export default function TodoItem({ todo, onUpdate, onDelete }) {
  function editTodo() {
    const title = prompt("Edit title", todo.title);
    const description = prompt("Edit description", todo.description);
    if (title) onUpdate(todo.id, { title, description });
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={e => onUpdate(todo.id, { completed: e.target.checked })}
      />
      <strong>{todo.title}</strong> - {todo.description}
      <button onClick={editTodo}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>

      


    </li>
  );
}
