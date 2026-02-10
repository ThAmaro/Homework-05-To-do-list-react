import { register } from "../../services/api";

export default function Register() {
  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const data = await register(username, password);
    alert(data.error || "User registered!");
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button>Register</button>
    </form>
  );
}
