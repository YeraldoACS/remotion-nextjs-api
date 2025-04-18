"use client";

import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { usePaginatedUserTemplates } from "@app/src/hooks/usePaginatedUserTemplates";
import { UserData } from "@app/src/lib/types";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserVideoDataTableTSCK() {
  const { data, loading, nextPage, hasNextPage } = usePaginatedUserTemplates();

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "title",
      header: "Name",
    },
    {
      accessorKey: "compositionId",
      header: "Composition ID",
    },
    {
      accessorKey: "duration",
      header: "Video Duration",
      cell: ({ getValue }) => `${getValue<number>()} seconds`,
    },
    {
      accessorKey: "fps",
      header: "FPS",
    },
    {
      id: "actions",
      accessorKey: "compositionId",
      header: "Actions",
      cell: ({ getValue }) => (
        <a
          href={`/preview/${getValue()}`}
          className="btn btn-sm btn-outline-primary"
          title="View as video">
          <FontAwesomeIcon icon={faFileVideo} />
        </a>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="position-relative">
      {loading && (
        <div
          className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-50"
          style={{ zIndex: 1 }}>
          <Spinner
            animation="border"
            variant="primary"
          />
        </div>
      )}

      <Table
        striped
        bordered
        hover
        className="bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-2">
        <Button
          onClick={nextPage}
          disabled={!hasNextPage || loading}
          variant="outline-primary">
          Load More
        </Button>
      </div>
    </div>
  );
}
