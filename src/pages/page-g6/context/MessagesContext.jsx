import { createContext, useContext, useState } from "react";

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState([]);
    return (
        <MessagesContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessagesContext.Provider>
    );
}

export function useMessages() {
    return useContext(MessagesContext);
}
