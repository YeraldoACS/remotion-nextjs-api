// components/Loading.tsx
import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-white text-dark"
    >
      <Row>
        <Col className="text-center">
          <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 lead fw-bold">Loading, please wait...</p>
        </Col>
      </Row>
    </Container>
  );
}
