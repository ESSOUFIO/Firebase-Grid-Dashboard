import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    auth.currentUser?.email && setEmail(auth.currentUser.email);
    auth.currentUser?.displayName && setUserName(auth.currentUser.displayName);
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== passwordConf) {
      setError("Password Mismatch Exception");
      return;
    }

    if (auth.currentUser.email !== email) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          setMessage("Profile updated!");
        })
        .catch((error) => {
          setError(error.message);
        });
    }

    if (password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          setMessage("Profile updated!");
        })
        .catch((error) => {
          setError(error.message);
        });
    }

    if (userName !== auth.currentUser.displayName) {
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => {
          setMessage("Profile updated!");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <>
      <Form
        className="Form mt-3 mb-2"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={SubmitHandler}
      >
        <h4 className="text-center mb-4">Update your profile</h4>
        {error && <Alert variant={"danger"}>{error}</Alert>}
        {message && <Alert variant={"success"}>{message}</Alert>}
        {!message && (
          <>
            <Row>
              <Form.Group className="mb-3 col" controlId="userName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                  placeholder="Leave black to keep the same"
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
                  placeholder="Leave black to keep the same"
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group>
                <Button className="my-2 w-100" type="submit">
                  Update Profile
                </Button>
              </Form.Group>
            </Row>
          </>
        )}
      </Form>
      <Row className="text-center">
        <Link to={-1}>Cancel</Link>
      </Row>
    </>
  );
};

export default Dashboard;
