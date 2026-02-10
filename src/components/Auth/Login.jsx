import { login } from "../../services/api";

export default function Login({ onLogin }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const data = await login(username, password);

    if (data.token) {
      document.cookie = `authToken=${data.token}; path=/`;
      onLogin();
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button>Login</button>
    </form>
  );
}
