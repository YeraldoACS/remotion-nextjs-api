"use client";

import { Alert, Table } from "react-bootstrap";

export default function CsvFormatInstructions() {
  return (
    <Alert variant="light">
      <h5 className="mb-3">📄 CSV Upload Guidelines</h5>
      <p>
        Each <strong>row</strong> in the CSV represents a <strong>single quiz question</strong>.
        If multiple rows share the same <code>id</code>, they are grouped under the same video.
        This allows you to create a <strong>set of quiz questions</strong> for one video entry.
      </p>
      <p>
        The <code>answers</code> column should contain the options in list format, e.g.: {" "}
        <code>Option A; Option B; Option C</code>
      </p>

      <p className="mb-2">💡 <strong>Important:</strong> Each row must include all video metadata such as <code>title</code>, <code>description</code>, etc. — even if the values are repeated. If the metadata is inconsistent across rows, only the data from the last row will be used.</p>

      <h6>✅ Example</h6>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>backgrounVideoUrl</th>
            <th>durationInSeconds</th>
            <th>question</th>
            <th>answers</th>
            <th>correctAnswer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>basketball-game</td>
            <td>College Basketball Mania</td>
            <td>College Basketball Mania</td>
            <td>https://placehold.co/1920x1080</td>
            <td>3600</td>
            <td>Who won the 2021 NCAA championship?</td>
            <td>Baylor; Gonzaga; UCLA; Houston</td>
            <td>Baylor</td>
          </tr>
          <tr>
            <td>basketball-game</td>
            <td>College Basketball Mania</td>
            <td>College Basketball Mania</td>
            <td>https://placehold.co/1920x1080</td>
            <td>3600</td>
            <td>Which team upset #1 Purdue in 2023?</td>
            <td>Oral Roberts; Princenton; Fairleigh Dickinson; Saint Peter's</td>
            <td>Fairleigh Dickinson</td>
          </tr>
        </tbody>
      </Table>

      <p>
        The above will create <strong>one video entry</strong> titled <em>"College Basketball Mania"</em> with <strong>two quiz questions</strong>.
      </p>
    </Alert>
  );
}
