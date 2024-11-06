import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [empId, setEmpId] = useState(localStorage.getItem('empId') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'employee');

  useEffect(() => {
    if (empId && userRole) {
      localStorage.setItem('empId', empId);
      localStorage.setItem('userRole', userRole);
    }
  }, [empId, userRole]);

  return (
    <UserContext.Provider value={{ empId, setEmpId, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
