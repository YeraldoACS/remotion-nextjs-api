// components/NotFound.tsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-white text-dark"
    >
      <Row>
        <Col className="text-center">
          <h1 className="display-4 fw-bold mb-3">404</h1>
          <p className="lead mb-4">This page could not be found.</p>
          <Button variant="primary" href="/">
            Go back home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
