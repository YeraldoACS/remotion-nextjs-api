"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { CSSProperties } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps {
  style?: CSSProperties;
  from?: string;
}

export default function BackButton({ style, from = "/" }: BackButtonProps) {
  const router = useRouter();

  return (
    <>
      <Button
        style={{
          ...style,
        }}
        type="button"
        variant="light"
        onClick={() => router.push(`/${from}`)}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="fa-fw"
        />
      </Button>
    </>
  );
}
