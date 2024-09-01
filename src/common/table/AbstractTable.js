import React from "react";
import "./AbstractTable.css";

const AbstractTable = ({ columns, data }) => {
  return (
    <table className="abstract-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.Header}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.Header}>
                {typeof column.accessor === "function"
                  ? column.accessor(row)
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AbstractTable;
