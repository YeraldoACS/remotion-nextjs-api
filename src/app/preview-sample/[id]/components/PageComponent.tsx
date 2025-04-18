"use client";

import QuizDataPreview from "@app/src/components/Dashboard/QuizDataPreview";
import TemplateMetadataPreview from "@app/src/components/Dashboard/TemplateMetadataPreview";
import { RenderButton } from "@app/src/components/Remotion/RenderButton";
import { VideoPlayer } from "@app/src/components/Remotion/VideoPlayer";
import BackButton from "@app/src/components/UI/BackButton";
import { VideoData } from "@app/src/lib/types";
import { Row, Col } from "react-bootstrap";

export default function PageComponent({ id, videoData }: { id: string; videoData: VideoData }) {
  return (
    <div>
      {videoData && (
        <>
          <Row className="mb-5">
            <Col xs={9}>
              <div className="mb-5 d-inline-flex justify-content-center align-items-center gap-2">
                <BackButton from="library" />
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
    </div>
  );
}
