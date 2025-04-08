"use client";

import TemplatesPage from "./templates/page";
import { Container } from "react-bootstrap";

export default function Page() {
  return (
    <Container
      fluid
      className="p-4"
      style={{ minHeight: "100vh" }}>
      <TemplatesPage />
    </Container>
  );
}
