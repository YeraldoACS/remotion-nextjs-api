"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavBar } from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BrandTitle from "./BrandTitle";

export function SideNavbar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="d-flex">
      <div className="position-relative">
        <div className="d-flex flex-column min-vh-100 h-100 bg-white text-dark shadow border-end">
          <div className="d-flex align-items-center">
            <BrandTitle isExpanded={expanded} />
            <Button
              variant="link"
              size="sm"
              className="m-1"
              onClick={() => setExpanded(!expanded)}>
              {expanded ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
            </Button>
          </div>
          <hr className="w-100 mb-0" />

          <NavBar isExpanded={expanded} />
        </div>
      </div>
    </div>
  );
}
