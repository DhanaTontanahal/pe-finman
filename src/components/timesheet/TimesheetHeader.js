import React from "react";
import { startOfWeek, addDays, format } from "date-fns";
import "./TimesheetHeader.css";

const TimesheetHeader = () => {
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  return (
    <thead>
      <tr>
        <th>Project</th>
        {Array.from({ length: 7 }).map((_, i) => (
          <th key={i}>
            {format(addDays(startOfCurrentWeek, i), "EEE, dd MMM")}
          </th>
        ))}
        <th>Total</th>
      </tr>
    </thead>
  );
};

export default TimesheetHeader;
