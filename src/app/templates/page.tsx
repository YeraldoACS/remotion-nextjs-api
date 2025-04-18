import ImportVideoDataCsv from "@app/src/components/Dashboard/ImportCsv/ImportMain";
import UserVideoDataTableTSCK from "@app/src/components/Dashboard/UserVideoDataTableTSCK";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates | Bravanna",
  description: "Bravanna Video Rendering Dashboard",
};

export default function TemplatesPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-2xl font-bold">User Data</h2>
        <ImportVideoDataCsv />
      </div>
      <UserVideoDataTableTSCK />
    </div>
  );
}
