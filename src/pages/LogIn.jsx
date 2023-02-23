import React, { useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    //* const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");

        // Signed in
        // const user = userCredential.user;
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Form
        className="Form mt-4 mb-2"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={SubmitHandler}
      >
        <h4 className="text-center mb-4">Login to your account</h4>

        <Row>
          {error && <Alert variant={"danger"}>{error}</Alert>}
          <Form.Group className="mb-3 col" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Button className="my-3 w-100" type="submit">
              Log In
            </Button>
          </Form.Group>
        </Row>
        <div className="text-center mb-2">
          <Link to={"/reset-password"}>Forgot Password?</Link>
        </div>
      </Form>
      <div className="text-center">
        <span>Need an account? </span>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    </>
  );
};

export default LogIn;
