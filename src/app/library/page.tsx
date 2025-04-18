// "use client";

import TableData from "@app/src/components/Dashboard/VideosTable";
import { Metadata } from "next";

interface Props {}

export const metadata: Metadata = {
  title: "Library | Bravanna",
  description: "Bravanna Video Rendering Dashboard",
};

export default function TemplatesPage(props: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Library</h2>
      <TableData />
    </div>
  );
}
