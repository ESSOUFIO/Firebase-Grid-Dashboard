import { Alert, Button, Form } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const ResetPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const resetPassword = (e) => {
    e.preventDefault();
    setError(null);
    sendPasswordResetEmail(auth, emailRef.current.value)
      .then(() => {
        setMessage("Password reset email sent!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  console.log(message);
  return (
    <>
      <Form
        className="Form mt-4 mb-2"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={resetPassword}
      >
        <h4 className="text-center mb-4">Reset Password</h4>
        {error && <Alert variant={"danger"}>{error}</Alert>}
        {message && <Alert variant={"success"}>{message}</Alert>}
        {!message && (
          <>
            <Form.Group className="mb-3 col" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please put your email.."
                ref={emailRef}
                autoFocus
              />
            </Form.Group>

            <Form.Group>
              <Button className="my-3 w-100" type="submit">
                Reset Possword
              </Button>
            </Form.Group>
          </>
        )}
        <div className="text-center">
          <Link to={"/login"}>Login</Link>
        </div>
      </Form>
      <div className="text-center">
        <span>Need an account? </span>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    </>
  );
};

export default ResetPassword;
