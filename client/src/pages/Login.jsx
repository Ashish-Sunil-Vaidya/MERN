import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="login-form-body" onSubmit={handleSubmit}>
      <form className="login-form" onSubmit={handleSubmit}>
        {isLoading && <span className="loader"></span>}
        <p className="login-heading">Login</p>
        <div className="login-item">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="login-input"
          />

          <button disabled={isLoading} className="login-button">
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
}
