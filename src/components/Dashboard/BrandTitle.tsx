import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Nav } from "react-bootstrap";

interface BrandTitleProps {
  isExpanded: boolean;
}

export default function BrandTitle({ isExpanded = true }: BrandTitleProps) {
  return (
    <Nav
      className="flex-column align-items-start p-3"
      style={{ width: `${isExpanded ? "14rem" : "auto"}` }}>
      <Link
        href="/"
        className="nav-link text-muted">
        <FontAwesomeIcon icon={faHouse} />

        <span className={`ms-2 fw-bold small ${!isExpanded ? "d-none" : "d-inline"}`}>Bravanna</span>
      </Link>
    </Nav>
  );
}
