import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import withGuard from "../utils/withGuard";
import AlertComponent from "../components/AlertComponent";
import { updateUserDocument } from "../firebase/user";
import PhotoImage from "../components/ProfileImage";

const Profile = () => {
  const [userDocument, setUserDocument] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const params = useParams();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", params.id), (doc) => {
      if (doc.exists()) {
        setUserDocument(doc.data());
      }
    });
    return unsub;
  }, [params.id]);

  if (!userDocument) {
    return null;
  }

  const formHandler = ({ target }) => {
    setUserDocument({
      ...userDocument,
      [target.id]: target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await updateUserDocument({ uid: params.id, ...userDocument });
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="my-4 d-flex justify-content-center gap-3">
      <PhotoImage id={params.id} />

      <Form onSubmit={submitHandler}>
        {!!error && <AlertComponent variant={"danger"} text={error} />}
        {success && (
          <AlertComponent variant={"success"} text={"Successfully updated"} />
        )}
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              value={userDocument.name}
              onChange={formHandler}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={userDocument.email}
              onChange={formHandler}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            id="adress"
            value={userDocument.adress}
            onChange={formHandler}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              id="city"
              value={userDocument.city}
              onChange={formHandler}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              id="state"
              value={userDocument.state}
              onChange={formHandler}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              id="zip"
              value={userDocument.zip}
              onChange={formHandler}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              id="phone"
              value={userDocument.phone}
              onChange={formHandler}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Specialty</Form.Label>
            <Form.Select
              id="specialty"
              value={userDocument.specialty}
              onChange={formHandler}
            >
              <option disabled></option>
              <option>Mecanic</option>
              <option>Electric</option>
              <option>Programming</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Ip</Form.Label>
            <Form.Control
              id="ip"
              type="text"
              value={userDocument.ip}
              onChange={formHandler}
            />
          </Form.Group>
        </Row>
        <div className="text-end my-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default withGuard(Profile);
