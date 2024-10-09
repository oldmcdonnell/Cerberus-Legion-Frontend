import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context";
import { getToken, fetchUser } from "./api";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';

const Login: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Use the navigate hook

  useEffect(() => {
    console.log('THE TOKEN', state?.accessToken);
  }, [state?.accessToken]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Pass the dispatch function along with the username and password to getToken
      const accessToken = await getToken({ dispatch, username, password });
      if (accessToken) {
        const user = await fetchUser({ accessToken }); // Fetch user details
        dispatch({ type: "SET_USER", payload: user });
        navigate('/'); // Navigate to home page on success
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Login;
