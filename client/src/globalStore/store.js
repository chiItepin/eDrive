import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const StoreContext = createContext();
let initialState = {
  token: localStorage.getItem('token'),
};
let updated = {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateToken':
      updated = { ...initialState, token: action.value };
      initialState = updated;
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export const useStore = () => useContext(StoreContext);
