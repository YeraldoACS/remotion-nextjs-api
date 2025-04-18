"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import ImportTemplate from "./Import";

interface ImportVideoDataCsvProps {
  onImport?: (data: any[]) => void;
}

export default function ImportVideoDataCsv({ onImport }: ImportVideoDataCsvProps) {
  // States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Event handlers
  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <>
      <Button
        type="button"
        onClick={handleShow}
        variant="primary">
        Import from CSV
      </Button>

      {isModalOpen && (
        <ImportTemplate
          onImport={onImport}
          handleClose={handleClose}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
}
