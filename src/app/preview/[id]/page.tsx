"use-client";
import * as React from "react";
import { VideoPlayer } from "@app/src/components/Remotion/VideoPlayer";
import { mockVideos } from "@app/src/data/mockData";
import { Container } from "react-bootstrap";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = React.use(params);
  const video = mockVideos.find((v) => v.id === id);
  if (!video) return <div>Not found</div>;

  return (
    <Container
      fluid
      className="p-4"
      style={{ minHeight: "100vh" }}>
      <h1>{video.title}</h1>
      <VideoPlayer videoData={video} />
    </Container>
  );
}
