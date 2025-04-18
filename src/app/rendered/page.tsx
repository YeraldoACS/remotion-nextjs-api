import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rendered Videos | Bravanna",
  description: "Bravanna Video Rendering Dashboard",
};

export default function RenderedPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rendered Videos</h2>
    </div>
  );
}
