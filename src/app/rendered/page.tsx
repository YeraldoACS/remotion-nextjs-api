import { firestore } from "@app/firebase/admin/firebase-admin";
import Link from "next/link";
import { Container } from "react-bootstrap";

export default async function RenderedPage() {
  const snapshot = await firestore.collection("renders").orderBy("createdAt", "desc").get();
  // const renders = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));

  return (
    <Container
      fluid
      className="p-4"
      style={{ minHeight: "100vh" }}>
      <h1 className="text-2xl font-bold mb-4">Rendered Videos</h1>
      {/* <ul>
        {renders.map((render) => (
          <li key={render.id}>
            <Link
              href={render.url}
              target="_blank">
              {render.file}
            </Link>
          </li>
        ))}
      </ul> */}
    </Container>
  );
}
