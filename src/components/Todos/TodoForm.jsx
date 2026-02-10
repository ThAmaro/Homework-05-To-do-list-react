export default function TodoForm({ onAdd }) {
  function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    onAdd({ title, description });
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Todo</h2>
      <input name="title" placeholder="Title" required />
      <input name="description" placeholder="Description" />
      <button>Add</button>
    </form>
  );
}
