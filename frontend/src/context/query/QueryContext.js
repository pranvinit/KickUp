import { useReducer, createContext } from "react";

// reducer function import
import QueryReducer from "./QueryReducer";

const INITIAL_STATE = {};

export const QueryContext = createContext(INITIAL_STATE);

// auth services imports
export const QueryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QueryReducer, INITIAL_STATE);

  return (
    <QueryContext.Provider
      value={{
        query: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
