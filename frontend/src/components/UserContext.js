// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [empId, setEmpId] = useState(null);

  return (
    <UserContext.Provider value={{ empId, setEmpId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
