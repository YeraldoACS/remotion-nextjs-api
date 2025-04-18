import { Table } from "react-bootstrap";
import useFetchDocs from "@app/src/hooks/useFetchDocs";
import { UserData } from "@app/src/lib/types";
import { useEffect, useId, useState } from "react";

interface Props {
  data: UserData[];
}

export default function UserVideoDataTable({ data }: Props) {
  // const { data, loading, error } = useFetchDocs({ path: "userTemplates" });
  // let UserVideoData = data as UserData[];
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  let UserVideoData = data as UserData[];

  return (
    <Table
      striped
      bordered
      hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Composition ID</th>
          <th>Video Duration</th>
          <th>FPS</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {UserVideoData.length > 0 ? (
          UserVideoData.map((data, index) => (
            <tr key={index}>
              <td>{data.title}</td>
              <td>{data.compositionId}</td>
              <td>{data.duration} seconds</td>
              <td>{data.fps}</td>
              <td></td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={5}>No data available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
