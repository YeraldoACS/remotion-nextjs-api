import type { Metadata } from "next";
import { SideNavbar } from "../components/Dashboard/SideNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
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

        <main className="d-flex h min-h-screen items-center">
          <SideNavbar collapsed={false} />
          {children}
        </main>
      </body>
    </html>
  );
}
