import Login from "./Login";
import Register from "./Register";

export default function AuthSection({ onLogin }) {
  return (
    <>
      <Register />
      <Login onLogin={onLogin} />
    </>
  );
}
