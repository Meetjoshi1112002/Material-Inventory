import React, { createContext, useState } from 'react';

// 1. Create a context for our application
export const StudentContext = createContext();

export default function ContextProvider(props) {
    const [up,setUp] = useState(false);
    const [login, setLogin] = useState(false);
    const [currentUser,setCurrentUser] = useState(null);
    const handleLogin = () => {
        setLogin(true);
    };

    const handleCurrentUser = (data)=>{
        setCurrentUser(data);
    }

    const contextValue = {
        login,
        currentUser,
        up,
        setUp,
        handleLogin,
        handleCurrentUser
    };

    // 2. Use the context within the component
    return (
        <StudentContext.Provider value={contextValue}>
            {props.children}
        </StudentContext.Provider>
    );
}