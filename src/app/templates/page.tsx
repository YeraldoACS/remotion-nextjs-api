import TableData from "@app/src/components/Dashboard/TableData";
import { Container } from "react-bootstrap";

interface Props {}

export default function TemplatesPage(props: Props) {
  return (
    <Container
      fluid
      className="p-4"
      style={{ minHeight: "100vh" }}>
      <h1 className="text-2xl font-bold mb-4">Templates</h1>
      <TableData />
    </Container>
  );
}
