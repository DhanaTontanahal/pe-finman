import React, { useState, useEffect } from "react";
import TimesheetHeader from "./TimesheetHeader";
import TimesheetRow from "./TimesheetRow";
import SubmittedTimesheets from "./SubmittedTimesheets";
import { ToastContainer, toast } from "react-toastify";
import { startOfWeek, addDays, format } from "date-fns";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getWeekRange, generateWeekRanges } from "../../utils/dateUtils";
import "react-toastify/dist/ReactToastify.css";
import "./Timesheet.css";

const initialRow = (startDate) =>
  Array.from({ length: 7 }).map((_, i) => ({
    time: "00:00",
    date: format(addDays(startDate, i), "yyyy-MM-dd"),
  }));

const initialRows = (startDate) => [initialRow(startDate)];

const Timesheet = ({ useFirebase }) => {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("currentUserName"));
  const [weekRanges, setWeekRanges] = useState(generateWeekRanges(25, 25));
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (selectedWeek && useFirebase && user) {
      const db = getDatabase();
      const timeEntriesRef = ref(
        db,
        `timeEntries/${user}/${selectedWeek.start}`
      );
      onValue(timeEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedRows = Object.values(data).map((entry) => {
            return Array.isArray(entry)
              ? entry
              : initialRow(
                  startOfWeek(new Date(selectedWeek.start), {
                    weekStartsOn: 1,
                  })
                );
          });
          setRows(fetchedRows);
        } else {
          setRows(initialRows(new Date(selectedWeek.start)));
        }
      });
    }
  }, [useFirebase, user, selectedWeek]);

  const handleProjectSelect = (selection, rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = updatedRows[rowIndex].map((entry) => ({
      ...entry,
      projectClient: `${selection.project.name} ${
        selection.task ? `- ${selection.task.name}` : ""
      } - ${selection.client}`,
    }));
    setRows(updatedRows);
  };

  const handleTimeChange = (time, rowIndex, colIndex, selectedProject) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex].time = time;

    const timeEntry = updatedRows[rowIndex][colIndex];

    if (selectedProject) {
      const db = getDatabase();
      const entryRef = ref(
        db,
        `timeEntries/${user}/${selectedWeek.start}/${
          selectedProject.project.id
        }/${selectedProject.task ? selectedProject.task.id : "noTask"}`
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
    setRows([...rows, initialRow(new Date(selectedWeek.start))]);
  };

  const totalHours = (dayIndex) => {
    return rows.reduce(
      (total, row) => total + parseFloat(row[dayIndex]?.time || 0),
      0
    );
  };

  const handleSubmit = () => {
    const db = getDatabase();
    const timeEntriesRef = ref(
      db,
      `submittedTimeSheets/${user}/${selectedWeek.start}`
    );
    set(timeEntriesRef, rows)
      .then(() => toast.success("Timesheet submitted successfully!"))
      .catch((error) =>
        toast.error("Error submitting timesheet: " + error.message)
      );
  };

  const handleWeekChange = (event) => {
    const week = weekRanges.find((week) => week.start === event.target.value);
    setSelectedWeek(week);
    if (week) {
      setRows(initialRows(new Date(week.start)));
    }
  };

  const filteredWeekRanges = weekRanges.filter(
    (week) => week.start.includes(searchTerm) || week.end.includes(searchTerm)
  );

  return (
    <div className="timesheet-container">
      <ToastContainer />
      <h1>Timesheet</h1>
      <div className="week-selector">
        <input
          type="text"
          placeholder="Search week range"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedWeek ? selectedWeek.start : ""}
          onChange={handleWeekChange}
        >
          <option value="" disabled>
            Select a week
          </option>
          {filteredWeekRanges.map((week, index) => (
            <option key={index} value={week.start}>
              {week.label}
            </option>
          ))}
        </select>
      </div>
      {selectedWeek && (
        <table className="timesheet-table">
          <TimesheetHeader startDate={new Date(selectedWeek.start)} />
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
                selectedWeek={selectedWeek}
              />
            ))}
            <tr>
              <td>Total</td>
              {initialRow(new Date(selectedWeek.start)).map((_, index) => (
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
      )}
      <div className="timesheet-actions">
        {/* <button onClick={addNewRow}>Add new row</button> */}
        {/* <button>Copy last week</button> */}

        <button onClick={handleSubmit}>Submit Timesheet</button>
        <br />
      </div>
      <SubmittedTimesheets user={user} useFirebase={useFirebase} />
    </div>
  );
};

export default Timesheet;
