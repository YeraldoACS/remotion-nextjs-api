"use client";
import { ListGroup, Nav } from "react-bootstrap";
import Link from "next/link";
import routesDefinition from "@app/src/components/Dashboard/routesDefinition";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isExpanded: boolean;
}

export function NavBar({ isExpanded = true }: NavbarProps) {
  const pathname = usePathname();

  return (
    <Nav
      className="flex-column align-items-start w-100"
      style={{ width: `${isExpanded ? "14rem" : "auto"}` }}>
      <ListGroup className="w-100">
        {routesDefinition().map((route, index) => (
          <ListGroup.Item
            key={`nav-item-${index.toString()}`}
            action
            active={pathname === route.path}
            className="border-0 rounded-0">
            <Link
              href={route.path}
              className="nav-link py-2"
              style={{ color: "inherit" }}>
              {route.icon}
              <span className={`ms-2 small ${!isExpanded ? "d-none" : "d-inline"}`}>{route.name}</span>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Nav>
  );
}
