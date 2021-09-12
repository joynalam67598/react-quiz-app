import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();
  const history = useHistory();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to Login");
    }
  }

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter email"
        icon="alternate_email"
      />

      <TextInput
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        placeholder="Enter password"
        icon="lock"
      />

      <Button disabled={loading} type="submit">
        <span>Submit</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
