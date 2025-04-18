"use client";

import QuizDataPreview from "@app/src/components/Dashboard/QuizDataPreview";
import TemplateMetadataPreview from "@app/src/components/Dashboard/TemplateMetadataPreview";
import { RenderButton } from "@app/src/components/Remotion/RenderButton";
import { VideoPlayer } from "@app/src/components/Remotion/VideoPlayer";
import BackButton from "@app/src/components/UI/BackButton";
import { VideoData } from "@app/src/lib/types";
import { Row, Col } from "react-bootstrap";
import { notFound } from "next/navigation";
import useFetchDoc from "@app/src/hooks/useFetchDoc";
import Loading from "@app/src/components/UI/Loading";

export default function PageComponent({ id }: { id: string }) {
  const { data, loading, error } = useFetchDoc({ path: "userTemplates", docID: id });
  if (loading) return <Loading />;
  if (error) notFound();

  const videoData = data as VideoData;

  return (
    <>
      {videoData && (
        <>
          <Row className="mb-5">
            <Col xs={9}>
              <div className="mb-5 d-inline-flex justify-content-center align-items-center gap-2">
                <BackButton from="templates" />
                <h2 className="mb-0">{videoData.title}</h2>
              </div>
              <VideoPlayer
                videoData={videoData}
                compositionId={videoData.compositionId}
              />
            </Col>
            <Col xs={3}>
              <RenderButton
                compositionId={videoData.compositionId}
                videoData={videoData}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12}>
              <h4 className="mb-4">Overview</h4>
              <TemplateMetadataPreview data={videoData} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h4 className="mb-4">Quiz Data</h4>
              <QuizDataPreview quizData={videoData.quizData} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
