import React, { useEffect, useState } from "react";
import TimesheetHeader from "./TimesheetHeader";
import TimesheetRow from "./TimesheetRow";
import { getDatabase, ref, onValue } from "firebase/database";
import "./Timesheet.css";

const SubmittedTimesheets = ({ user, useFirebase }) => {
  const [submittedTimeSheets, setSubmittedTimeSheets] = useState({});
  const [projects, setProjects] = useState({});

  useEffect(() => {
    if (useFirebase && user) {
      const db = getDatabase();
      const submittedTimeSheetsRef = ref(db, `submittedTimeSheets/${user}`);
      const projectsRef = ref(db, "projects");

      onValue(submittedTimeSheetsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSubmittedTimeSheets(data);
        } else {
          setSubmittedTimeSheets({});
        }
      });

      onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProjects(data);
        }
      });
    }
  }, [useFirebase, user]);

  return (
    <div className="submitted-timesheet">
      <h2>Submitted Timesheets</h2>
      {Object.keys(submittedTimeSheets).length > 0 ? (
        Object.entries(submittedTimeSheets).map(([weekStart, rows], index) => (
          <div key={index} className="timesheet-week-section">
            <h3>Timesheet for week starting: {weekStart}</h3>
            <table className="timesheet-table">
              <TimesheetHeader startDate={new Date(weekStart)} />
              <tbody>
                {rows.map((row, rowIndex) => (
                  <TimesheetRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    projects={projects}
                    isReadOnly={true}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No submitted timesheets available.</p>
      )}
    </div>
  );
};

export default SubmittedTimesheets;
