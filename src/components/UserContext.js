import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [taskData, setTaskData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData , taskData, setTaskData }}>
            {children} 
        </UserContext.Provider>
    );
};
