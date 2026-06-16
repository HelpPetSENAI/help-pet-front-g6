import { createContext, useCallback, useContext, useState } from "react";

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            author: "recipient",
            text: "Olá! Como posso ajudar com seu pet hoje?",
            hour: "12:00",
            isNew: true,
        },
    ]);
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [chatList, setChatList] = useState([
        {
            id: 1,
            username: "Pessoa",
            lastMessage: "Olá! Como posso ajudar com seu pet hoje?",
            lastTime: "12:00",
            hasUnread: true,
        },
    ]);
    const markChatAsRead = useCallback((chatId) => {
        setChatList((currentChats) =>
            currentChats.map((chat) =>
                chat.id === chatId ? { ...chat, hasUnread: false } : chat
            )
        );
        setMessages((currentMessages) =>
            currentMessages.map((message) =>
                message.isNew ? { ...message, isNew: false } : message
            )
        );
    }, []);

    return (
        <MessagesContext.Provider value={{
            messages,
            setMessages,
            selectedChatId,
            setSelectedChatId,
            chatList,
            setChatList,
            markChatAsRead,
        }}>
            {children}
        </MessagesContext.Provider>
    );
}

export function useMessages() {
    return useContext(MessagesContext);
}
