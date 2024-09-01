const initialState = [];

const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TIMESHEETS":
      return action.payload;
    case "ADD_TIMESHEET":
      return [...state, action.payload];
    case "UPDATE_TIMESHEET":
      return state.map((timesheet) =>
        timesheet.id === action.payload.id ? action.payload : timesheet
      );
    case "DELETE_TIMESHEET":
      return state.filter((timesheet) => timesheet.id !== action.payload);
    default:
      return state;
  }
};

export default timesheetReducer;
