import React, { useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConf) {
      setError("Password Mismatch Exception");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            setError(error.message);
          });
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
        <h4 className="text-center mb-3">Create a new account</h4>
        {error && <Alert variant={"danger"}>{error}</Alert>}
        <Row>
          <Form.Group className="mb-3 col" controlId="userName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Form.Group className="mb-3 col" controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Confirmation"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Button className="my-2 w-100" type="submit">
              Sign Up
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <div className="text-center">
        <span>Have you already an account? </span>
        <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
};

export default SignUp;
