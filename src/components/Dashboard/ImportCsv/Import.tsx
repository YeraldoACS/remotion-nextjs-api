"use client";

import { useMemo, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { DownloadSampleCsv } from "./DownloadSampleCsv";
import Papa from "papaparse";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@app/firebase/client/firebase";
import { serverTimestamp } from "firebase/firestore";
import CsvFormatInstructions from "./CsvFormatInstructions";
import { CSVTemplateData, VideoData } from "@app/src/lib/types";
import { mapToObject } from "@app/src/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";

const baseStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

interface ImportTemplateProps {
  isModalOpen: boolean;
  handleClose: () => void;
  onImport?: (data: any[]) => void;
}

export default function ImportTemplate({ isModalOpen, handleClose, onImport }: ImportTemplateProps) {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "csv/xls": [".csv"] },
    // maxFiles: 1,
  });
  const [dropzoneError, setDropzoneError] = useState<null | string>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  // Event handlers
  const handleImportCsv = () => {
    const updateTemplateData = async (formattedData: any) => {
      setIsImporting(true);

      const formattedDataToObject = mapToObject(formattedData);

      if (Object.keys(formattedDataToObject).length > 0) {
        // Writing to Firestore
        try {
          for (const [key, value] of Object.entries(formattedDataToObject)) {
            const videoData = value as VideoData;
            const ref = doc(db, "userTemplates", key);
            await setDoc(ref, videoData, { merge: true });
            const summaryRef = doc(db, "userTemplates", "summary");
            await setDoc(
              summaryRef,
              {
                [videoData.id]: {
                  id: videoData.id,
                  compositionId: videoData.id,
                },
              },
              { merge: true }
            );
          }

          handleClose();
        } catch (error) {
          console.log("🚀 ~ updateTableData ~ error:", error);
          throw error;
        } finally {
          setIsImporting(false);
        }
      }
    };

    const joinRowsWithSameId = (rows: CSVTemplateData[]) => {
      const storedRows = new Map<string, VideoData>();
      const rowsId = new Map<string, string>();

      rows.forEach((row) => {
        rowsId.set(row.id, row.id);
      });

      rowsId.forEach((id) => {
        const quizData: any[] = [];

        // ✅ Only include rows with the current ID
        const matchingRows = rows.filter((row) => row.id === id);

        matchingRows.forEach((row) => {
          quizData.push({
            question: row.question,
            correctAnswer: row.correctAnswer,
            answers: row.answers.split(";"),
          });
        });

        if (matchingRows.length > 0) {
          const row = matchingRows[0]; // use the first matching row for static fields
          let videoDuration = Number(row.duration);
          if (isNaN(videoDuration)) videoDuration = 3600;

          storedRows.set(id, {
            title: row.title,
            description: row.description,
            id: row.id,
            backgroundVideoUrl: row.backgroundVideoUrl,
            fps: 30,
            duration: videoDuration,
            compositionId: row.id,
            createdAt: serverTimestamp(),
            backgroundColor: "",
            quizData: quizData,
          });
        }
      });

      return {
        rowsId,
        storedRows,
      };
    };

    try {
      const parseFiles = (files: any) => {
        Promise.all(
          [...files].map(
            (file) =>
              new Promise((resolve, reject) =>
                Papa.parse(file, {
                  header: true,
                  skipEmptyLines: true,
                  complete: resolve,
                  error: reject,
                })
              )
          )
        )
          .then(async (results: any[]) => {
            for (const result of results) {
              if (result.data) {
                const importedData = result.data as CSVTemplateData[];
                const formattedData = joinRowsWithSameId(importedData);
                await updateTemplateData(formattedData.storedRows);
              }
            }
          })
          .catch((err) => console.log("Something went wrong:", err));
      };

      parseFiles(acceptedFiles);
    } catch (error: any) {
      setDropzoneError(`Error importing data. ${error?.message}`);
    }
  };

  return (
    <Modal
      show={isModalOpen}
      size="xl"
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Dynamic Template</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <p>Upload a CSV file containing your template information. Ensure that your file follows the specified format. You can also download a sample template to help you get started:</p>
          <DownloadSampleCsv />
        </div>
        <CsvFormatInstructions />
        <div
          id="fileupload-dropzone"
          className="d-flex flex-column"
          style={{ height: "20rem" }}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>

          <aside className="pt-3">
            {acceptedFileItems.length > 0 && (
              <div>
                <p>Accepted files</p>
                <ul>{acceptedFileItems}</ul>
              </div>
            )}
            {fileRejectionItems.length > 0 && (
              <div>
                <p>Rejected files</p>
                <ul>{fileRejectionItems}</ul>
              </div>
            )}
          </aside>

          {dropzoneError && <Alert variant="warning">{dropzoneError}</Alert>}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="button"
          disabled={isImporting}
          onClick={handleImportCsv}>
          {isImporting && (
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              className="me-1"
            />
          )}
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
