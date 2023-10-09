import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [onMenuItemClickContext, setOnMenuItemClickContext] = useState("");

    return (
        <AppContext.Provider value={{ staticMenuInactive, setStaticMenuInactive, onMenuItemClickContext, setOnMenuItemClickContext }}>
            {children}
        </AppContext.Provider>
    );
};