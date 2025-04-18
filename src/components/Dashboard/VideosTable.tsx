import { mockVideos } from "@app/src/data/mockData";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";

export default function TableData() {
  return (
    <div>
      <Table
        striped
        bordered
        hover>
        <thead className="text-left">
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Composition ID</th>
            <th className="border border-gray-300 p-2">Video Duration</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {mockVideos.map((item) => (
            <tr
              key={item.id}
              className="border border-gray-300">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.duration} Seconds</td>
              <td className="p-2">
                <a
                  href={`/preview-sample/${item.id}`}
                  className="btn btn-sm btn-outline-primary"
                  title="View as video">
                  <FontAwesomeIcon icon={faFileVideo} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
