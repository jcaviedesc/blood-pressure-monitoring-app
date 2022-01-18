import React from "react";

const initialState = {
  name: '',
  gender: 'M',
  weight: 0,
  birtdate: new Date(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'gender':
      return { ...state, gender: action.payload };
    case 'birtdate':
      return { ...state, birtdate: action.payload };
    default:
      throw 'No key';
  }
};

const useSingUp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchAction = (type, payload) => {
    dispatch({ type, payload });
  };
  return [state, dispatchAction];
};

export default useSingUp;
