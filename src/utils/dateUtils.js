// import { startOfWeek, addDays, subWeeks, addWeeks, format } from "date-fns";

// export const getWeekRange = (date) => {
//   const start = startOfWeek(date, { weekStartsOn: 1 });
//   const end = addDays(start, 6);
//   return { start: format(start, "yyyy-MM-dd"), end: format(end, "yyyy-MM-dd") };
// };

// export const generateWeekRanges = (pastWeeks, futureWeeks) => {
//   const currentDate = new Date();
//   const ranges = [];

//   for (let i = pastWeeks; i > 0; i--) {
//     const pastDate = subWeeks(currentDate, i);
//     const range = getWeekRange(pastDate);
//     ranges.push({ ...range, label: `Week of ${range.start} (Past)` });
//   }

//   const currentRange = getWeekRange(currentDate);
//   ranges.push({
//     ...currentRange,
//     label: `Week of ${currentRange.start} (Current week)`,
//   });

//   for (let i = 1; i <= futureWeeks; i++) {
//     const futureDate = addWeeks(currentDate, i);
//     const range = getWeekRange(futureDate);
//     ranges.push({ ...range, label: `Week of ${range.start} (Future)` });
//   }

//   return ranges;
// };

import { addWeeks, format, startOfWeek } from "date-fns";

export const getWeekRange = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = addWeeks(start, 1) - 1;
  return { start: format(start, "yyyy-MM-dd"), end: format(end, "yyyy-MM-dd") };
};

export const generateWeekRanges = (pastWeeks = 25, futureWeeks = 25) => {
  const weekRanges = [];
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  for (let i = -pastWeeks; i <= futureWeeks; i++) {
    const weekStart = addWeeks(currentWeekStart, i);
    const weekRange = getWeekRange(weekStart);
    let label = `${weekRange.start} - ${weekRange.end}`;

    if (i === 0) {
      label += " (Current week)";
    } else if (i === -1) {
      label += " (Last week)";
    } else if (i === -2) {
      label += " (Last to Last week)";
    } else if (i === 1) {
      label += " (Next week)";
    } else if (i === 2) {
      label += " (Next to Next week)";
    }

    weekRanges.push({ ...weekRange, label });
  }

  return weekRanges;
};
