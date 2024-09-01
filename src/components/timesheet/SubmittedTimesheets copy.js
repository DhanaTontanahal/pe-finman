// SubmittedTimesheets.js
import React, { useEffect, useState } from "react";
import TimesheetHeader from "./TimesheetHeader";
import TimesheetRow from "./TimesheetRow";
import { getDatabase, ref, onValue } from "firebase/database";
import { getWeekRange } from "../../utils/dateUtils"; // Import the utility function
import "./Timesheet.css";

const SubmittedTimesheets = ({ user, useFirebase }) => {
  const [submittedRows, setSubmittedRows] = useState([]);
  const [projects, setProjects] = useState({});
  const [weekRange, setWeekRange] = useState({ start: "", end: "" });

  useEffect(() => {
    if (useFirebase && user) {
      const db = getDatabase();
      const submittedTimeEntriesRef = ref(db, `submittedTimeSheets/${user}`);
      const projectsRef = ref(db, "projects");

      onValue(submittedTimeEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedSubmittedRows = Object.values(data).map((entry) => {
            return Array.isArray(entry) ? entry : [];
          });
          setSubmittedRows(fetchedSubmittedRows);
        }
      });

      onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProjects(data);
        }
      });

      // Calculate the week range for the current date
      const { start, end } = getWeekRange(new Date());
      setWeekRange({ start, end });
    }
  }, [useFirebase, user]);

  return (
    <div className="submitted-timesheet">
      <h2>Submitted Timesheets</h2>
      <h3>
        Time sheet for this week: {weekRange.start} to {weekRange.end}
      </h3>
      {submittedRows.length > 0 ? (
        <table className="timesheet-table">
          <TimesheetHeader />
          <tbody>
            {submittedRows.map((entry, index) => (
              <TimesheetRow
                key={index}
                row={entry}
                rowIndex={index}
                projects={projects}
                isReadOnly={true}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No timesheet entries available.</p>
      )}
    </div>
  );
};

export default SubmittedTimesheets;
