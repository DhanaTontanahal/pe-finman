const initialState = [];

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CLIENTS":
      return action.payload;
    case "ADD_CLIENT":
      return state.some((client) => client.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case "UPDATE_CLIENT":
      return state.map((client) =>
        client.id === action.payload.id ? action.payload : client
      );
    case "DELETE_CLIENT":
      return state.filter((client) => client.id !== action.payload);
    default:
      return state;
  }
};

export default clientsReducer;
