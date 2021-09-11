import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Form from "../components/Form";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";

export default function SignUpForm() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agree, setAgree] = React.useState("");
  const { signup } = useAuth();
  const history = useHistory();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password Not Match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account");
    }
  }

  return (
    <div>
      <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
        <TextInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter name"
          icon="person"
        />

        <TextInput
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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

        <TextInput
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          placeholder="Confirm password"
          icon="lock_clock"
        />

        <Checkbox
          text="I agree to the Terms &amp; Conditions"
          onChange={(e) => setAgree(e.target.value)}
          required
          value={agree}
        />

        <Button disabled={loading} type="submit">
          <span>Submit</span>
        </Button>

        {error && <p className="error">{error}</p>}

        <div className="info">
          Already have an account? <Link to="/login">Login</Link> instead.
        </div>
      </Form>
    </div>
  );
}
