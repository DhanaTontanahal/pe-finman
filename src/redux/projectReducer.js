const initialState = [];

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return action.payload;
    case "ADD_PROJECT":
      return state.some((project) => project.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case "UPDATE_PROJECT":
      return state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    case "DELETE_PROJECT":
      return state.filter((project) => project.id !== action.payload);
    default:
      return state;
  }
};

export default projectsReducer;
