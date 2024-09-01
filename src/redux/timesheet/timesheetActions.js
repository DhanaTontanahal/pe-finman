import axios from "axios";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { useFirebase } from "../../config";

export const setTimesheets = (timesheets) => ({
  type: "SET_TIMESHEETS",
  payload: timesheets,
});

export const addTimesheet = (timesheet) => ({
  type: "ADD_TIMESHEET",
  payload: timesheet,
});

export const updateTimesheet = (timesheet) => ({
  type: "UPDATE_TIMESHEET",
  payload: timesheet,
});

export const deleteTimesheet = (timesheetId) => ({
  type: "DELETE_TIMESHEET",
  payload: timesheetId,
});

export const fetchTimesheets = (useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const timesheetsRef = ref(db, "timesheets");
      onValue(timesheetsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const timesheets = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setTimesheets(timesheets));
        } else {
          dispatch(setTimesheets([]));
        }
      });
    } else {
      axios.get("/api/timesheets").then((response) => {
        dispatch(setTimesheets(response.data));
      });
    }
  };
};

export const saveTimesheet = (timesheet, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      if (timesheet.id) {
        const timesheetRef = ref(db, "timesheets/" + timesheet.id);
        update(timesheetRef, timesheet);
        dispatch(updateTimesheet(timesheet));
      } else {
        const newTimesheetRef = push(ref(db, "timesheets"));
        const newTimesheetId = newTimesheetRef.key;
        set(newTimesheetRef, { ...timesheet, id: newTimesheetId });
        dispatch(addTimesheet({ ...timesheet, id: newTimesheetId }));
      }
    } else {
      if (timesheet.id) {
        axios
          .put(`/api/timesheets/${timesheet.id}`, timesheet)
          .then((response) => {
            dispatch(updateTimesheet(response.data));
          });
      } else {
        axios.post("/api/timesheets", timesheet).then((response) => {
          dispatch(addTimesheet(response.data));
        });
      }
    }
  };
};

export const deleteTimesheetFromDb = (timesheetId, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const timesheetRef = ref(db, "timesheets/" + timesheetId);
      remove(timesheetRef);
      dispatch(deleteTimesheet(timesheetId));
    } else {
      axios.delete(`/api/timesheets/${timesheetId}`).then(() => {
        dispatch(deleteTimesheet(timesheetId));
      });
    }
  };
};
