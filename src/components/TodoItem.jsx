import { useState } from 'react';

function TodoItem({ todo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleToggleComplete = () => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdateTodo(todo.id, { 
        title: editTitle, 
        description: editDescription 
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.completed || false}
        onChange={handleToggleComplete}
      />

      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-input"
          />
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="btn-save">Save</button>
            <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </div>
          <div className="todo-description">
            {todo.description}
          </div>
        </div>
      )}

      <div className="todo-actions">
        {!isEditing && (
          <button 
            className="btn-edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button 
          className="btn-delete"
          onClick={() => onDeleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;