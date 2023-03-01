import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signup } from "../firebase/auth";
import AlertComponent from "../components/AlertComponent";
import withProfileRedirect from "../utils/withProfileRedirect";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  // Alert
  const [error, setError] = useState(null);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const userName = firstName + " " + lastName;
    if (password !== passwordConf) {
      setError("Password Mismatch Exception");
      return;
    }
    try {
      await signup({ userName, password, email });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Form
        className="mt-4 Form"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={SubmitHandler}
      >
        <h4 className="text-center mb-4">Create a new account</h4>
        {error && <AlertComponent variant="danger" text={error} />}
        <Row>
          <Form.Group className="mb-3 col" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3 col" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              placeholder="6 digits min."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col" controlId="passwordConf">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype password"
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
      <div className="text-center mt-2">
        <span>Already have an account? </span>
        <Link to={"/login"}>Log in</Link>
      </div>
    </>
  );
};

export default withProfileRedirect(SignUp);
