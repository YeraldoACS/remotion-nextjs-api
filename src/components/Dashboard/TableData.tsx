import { useRouter } from "next/navigation";
import { mockVideos } from "@app/src/data/mockData";
import styles from "./TableData.module.css";
import Table from 'react-bootstrap/Table';

interface Props {}

export default function TableData(props: Props) {
  const router = useRouter();

  return (
    <div>
      <Table striped bordered hover>
      <thead className="text-left">
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Title</th>
          <th className="border border-gray-300 p-2">Duration</th>
          <th className="border border-gray-300 p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {mockVideos.map((item) => (
          <tr key={item.id} className="border border-gray-300">
            <td className="p-2">{item.title}</td>
            <td className="p-2">{item.duration}</td>
            <td className="p-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push(`/preview/${item.id}`)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
        </Table>
    </div>
  );
}
