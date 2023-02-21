import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const Signup = () => {
  return (
    <Form className="my-4 Form">
      <Row>
        <Form.Group className="mb-3 col" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3 col" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3 col" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3 col" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>
      <Form.Group as={Row} className="mb-3 text-end">
        <Col>
          <Button type="submit">Sign Up</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Signup;
