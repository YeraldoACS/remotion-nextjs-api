// components/RenderButton.tsx
"use client";

import { useState } from "react";
import { Button, Card, Col, ProgressBar, Row, Toast, ToastContainer } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { VideoData } from "@app/src/lib/types";

interface RenderButtonProps {
  videoData: VideoData;
  compositionId: string;
}

export const RenderButton: React.FC<RenderButtonProps> = ({ videoData, compositionId }) => {
  const [isRendering, setIsRendering] = useState(false);
  const [hideStatus, setHideStatus] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [eta, setEta] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const handleRender = async () => {
    setIsRendering(true);
    setProgress(0);
    setEta(null);
    setOutputUrl(null);
    setError(null);

    try {
      const res = await fetch("/api/render/render2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoData, compositionId }),
      });

      const { renderId } = await res.json();
      console.log("Got renderId:", renderId);

      const sse = new EventSource(`/api/render/render-progress?renderId=${renderId}`);

      console.log("SSE state:", sse.readyState);

      sse.onopen = (evt) => {
        console.log("SSE connected");
      };

      sse.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setHideStatus(false);

        setProgress((data.renderedFrames / data.totalFrames) * 100);
        setElapsed(data.elapsed);
        setEta(data.eta);

        // Check if we have an output URL in the event data
        if (data.outputUrl) {
          setOutputUrl(data.outputUrl);
        }

        if (data.isDone) {
          sse.close();
          setIsRendering(false);
          setHideStatus(false);

          // If there was an error
          if (data.error) {
            setError(data.error);
            setHideStatus(true);
          }
        }
      };

      sse.onerror = () => {
        console.error("SSE connection error");
        sse.close();
        setError("SSE connection error");
        setIsRendering(false);
        setHideStatus(true);
      };
    } catch (error) {
      console.error("Error starting render:", error);
      setError("Failed to start rendering");
      setIsRendering(false);
      setHideStatus(true);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="render-controls d-flex justify-content-end">
      <div className="w-100 d-flex flex-column">
        <Button
          type="button"
          variant="primary"
          onClick={handleRender}
          disabled={isRendering}
          className="render-button ms-auto">
          {isRendering ? "Rendering..." : "Render Video"}
        </Button>

        {hideStatus === false && (
          <Row className="mt-5">
            <Col xs={12}>
              <ProgressBar
                className="mb-3"
                now={progress}
                variant={"info"}
                striped={isRendering}
                animated={true}
              />
            </Col>

            <Col
              xs={12}
              className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="text-center">
                    <h6 className="fw-bold mb-1">Elapsed Time</h6>
                    <div className="fs-5">{formatTime(elapsed)}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {eta !== null && (
              <Col
                xs={12}
                className="mb-3">
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className="text-center">
                      <h6 className="fw-bold mb-1">Estimated Time Left</h6>
                      <div className="fs-5">{formatTime(eta)}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        )}
      </div>

      {error && (
        <ToastContainer position="bottom-end">
          <Toast>
            <Toast.Header>
              <FontAwesomeIcon
                className="me-1"
                style={{ color: "red" }}
                icon={faTimes}
              />
              <strong className="me-auto">Render failed</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      {outputUrl && (
        <ToastContainer position="bottom-end">
          <Toast>
            <Toast.Header>
              <FontAwesomeIcon
                className="me-1"
                icon={faCheck}
              />
              <strong className="me-auto">Render complete!</strong>
            </Toast.Header>
            <Toast.Body>
              Download the video from the following{" "}
              <a
                href={outputUrl}
                download>
                link
              </a>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
};
