import React, { useState, useEffect } from "react";
import TimesheetHeader from "./TimesheetHeader";
import TimesheetRow from "./TimesheetRow";
import { ToastContainer, toast } from "react-toastify";
import { startOfWeek, addDays, format } from "date-fns";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import "react-toastify/dist/ReactToastify.css";
import "./Timesheet.css";

const initialRow = Array.from({ length: 7 }).map((_, i) => ({
  time: "00:00",
  date: format(
    addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i),
    "yyyy-MM-dd"
  ),
}));

const Timesheet = ({ useFirebase }) => {
  const [rows, setRows] = useState([initialRow]);
  const [submittedRows, setSubmittedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("currentUserName");
      if (useFirebase && user) {
        const db = getDatabase();
        const timeEntriesRef = ref(db, `timeEntries/${user}`);
        onValue(timeEntriesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const fetchedRows = Object.values(data).map((entry) => {
              // Ensure each entry is an array
              return Array.isArray(entry) ? entry : initialRow;
            });
            setRows(fetchedRows);
          }
        });

        const submittedTimeEntriesRef = ref(db, `submittedTimeSheets/${user}`);
        onValue(submittedTimeEntriesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const fetchedSubmittedRows = Object.values(data).map((entry) => {
              return Array.isArray(entry) ? entry : initialRow;
            });
            setSubmittedRows(fetchedSubmittedRows);
          }
        });
      }
    };
    fetchData();
  }, [useFirebase]);

  const handleProjectSelect = (selection, rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = updatedRows[rowIndex].map((entry) => ({
      ...entry,
      projectClient: `${selection.project.name} ${
        selection.task ? `- ${selection.task.name}` : ""
      } - ${selection.project.client}`,
    }));
    setRows(updatedRows);
  };

  const handleTimeChange = (time, rowIndex, colIndex, selectedProject) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex].time = time;

    const timeEntry = updatedRows[rowIndex][colIndex];
    const user = localStorage.getItem("currentUserName");

    if (selectedProject) {
      const db = getDatabase();
      const entryRef = ref(
        db,
        `timeEntries/${user}/${timeEntry.date}/${selectedProject.project.id}/${
          selectedProject.task ? selectedProject.task.id : "noTask"
        }`
      );
      set(entryRef, timeEntry)
        .then(() => toast.success("Time saved successfully!"))
        .catch((error) => toast.error("Error saving time: " + error.message));
    } else {
      toast.error("Please select a project first!");
    }

    setRows(updatedRows);
  };

  const addNewRow = () => {
    setRows([...rows, initialRow]);
  };

  const totalHours = (dayIndex) => {
    return rows.reduce(
      (total, row) => total + parseFloat(row[dayIndex].time || 0),
      0
    );
  };

  const handleSubmit = () => {
    const user = localStorage.getItem("currentUserName");
    const db = getDatabase();
    const timeEntriesRef = ref(db, `submittedTimeSheets/${user}`);
    set(timeEntriesRef, rows)
      .then(() => toast.success("Timesheet submitted successfully!"))
      .catch((error) =>
        toast.error("Error submitting timesheet: " + error.message)
      );
  };

  return (
    <div className="timesheet-container">
      <ToastContainer />
      <h1>Timesheet</h1>
      <table className="timesheet-table">
        <TimesheetHeader />
        <tbody>
          {rows.map((row, index) => (
            <TimesheetRow
              key={index}
              row={row}
              rowIndex={index}
              handleProjectSelect={handleProjectSelect}
              handleTimeChange={handleTimeChange}
              useFirebase={useFirebase}
              isReadOnly={false}
            />
          ))}
          <tr>
            <td>Total</td>
            {initialRow.map((_, index) => (
              <td key={index}>{totalHours(index).toFixed(2)}</td>
            ))}
            <td>
              {rows
                .reduce(
                  (total, row) =>
                    total +
                    row.reduce(
                      (sum, entry) => sum + parseFloat(entry.time || 0),
                      0
                    ),
                  0
                )
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="timesheet-actions">
        <button onClick={addNewRow}>Add new row</button>
        <button>Copy last week</button>
        <button onClick={handleSubmit}>Submit Timesheet</button>
      </div>
      <div className="submitted-timesheet">
        <h2>Submitted Timesheets</h2>
        {submittedRows.length > 0 ? (
          <table className="timesheet-table">
            <TimesheetHeader />
            <tbody>
              {submittedRows.map((entry, index) => (
                <TimesheetRow
                  key={index}
                  row={entry}
                  rowIndex={index}
                  handleProjectSelect={handleProjectSelect}
                  handleTimeChange={handleTimeChange}
                  useFirebase={useFirebase}
                  isReadOnly={true}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No timesheet entries available.</p>
        )}
      </div>
    </div>
  );
};

export default Timesheet;
