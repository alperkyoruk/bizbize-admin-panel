import { useState } from "react";
import { useAuth } from "../../security/AuthProvider";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginAction } = useAuth();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    loginAction(input);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-name">Username:</label>
        <input
          type="text"
          id="user-name"
          name="username"
          aria-invalid="false"
          onChange={handleInput}
        />
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
      </div>
      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
