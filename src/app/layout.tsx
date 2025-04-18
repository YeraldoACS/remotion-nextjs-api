import type { Metadata } from "next";
import { SideNavbar } from "../components/Dashboard/SideNavbar";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

// Fontawesome import config for Next.js
import { config } from "@fortawesome/fontawesome-svg-core";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Bravanna",
  description: "Bravanna Video Rendering Dashboard",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}

        <main className="d-flex min-h-screen items-center">
          <SideNavbar />
          <Container
            className="py-4 ps-5 pe-4 mt-4"
            style={{ minHeight: "97vh" }}
            fluid>
            {children}
          </Container>
        </main>
      </body>
    </html>
  );
}


 // TODO: WHY THE SPINNER FOR LOADING WORKS THO?