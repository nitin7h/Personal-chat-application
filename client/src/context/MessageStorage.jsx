import React, { createContext, useContext, useState } from "react";

const ArrayContext = createContext(null);

export const useArrayContext = () => {
  const context = useContext(ArrayContext);
  return context;
};
export default function MessageStorage(props) {
  const [leftArrayMessages, setLeftArrayMessages] = useState([]);
  const [rightArrayMessages, setRightArrayMessages] = useState([]);

  // Context value to provide
  const value = {
    leftArrayMessages,
    setLeftArrayMessages,
    rightArrayMessages,
    setRightArrayMessages,
  };
  return (
    <ArrayContext.Provider value={value}>
      {props.children}
    </ArrayContext.Provider>
  );
}
