import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <div className="signup-form-body" onSubmit={handleSubmit}>
      <form className="signup-form" onSubmit={handleSubmit}>
        {isLoading && <span className="loader"></span>}
        <p className="signup-heading">signup</p>
        <div className="signup-item">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="signup-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="signup-input"
          />

          <button disabled={isLoading} className="signup-button">
            Create new account
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
}
