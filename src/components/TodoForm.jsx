import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="form-section">
      <h2>Add Todo</h2>
      <form id="todoForm" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="title" 
          placeholder="Title" 
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="text" 
          id="description" 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default TodoForm;