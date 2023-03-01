import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../firebase/auth";
import AlertComponent from "../components/AlertComponent";
import withProfileRedirect from "../utils/withProfileRedirect";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    let user = null;
    try {
      setError(null);
      user = await login(email, password);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }

    if (user) {
      setTimeout(() => {
        <Navigate to={"/"} replace={true} />;
      }, 1000);
    }
  };
  return (
    <>
      <Form
        className="mt-4 p-4 Form"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={SubmitHandler}
      >
        <h4 className="text-center mb-4">Login to your account</h4>
        <Row>
          {error && <AlertComponent variant={"danger"} text={error} />}
          {success && (
            <AlertComponent
              variant={"success"}
              text={"Logged in successfully"}
            />
          )}
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
            <Button className="mt-3 w-100" type="submit">
              Log In
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <div className="text-center mt-2">
        <span>Do you not have an account? </span>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    </>
  );
};

export default withProfileRedirect(LogIn);
