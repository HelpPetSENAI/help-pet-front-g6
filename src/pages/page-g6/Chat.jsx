import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MessageInput from './components/MessageInput';
import { StyledChat } from "./ChatStyled";
import SenderMessage from "./components/SenderMessage";
import RecipientMessage from "./components/RecipientMessage";

export default function Chat() {
    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem('g6_chat_messages');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    function handleSendMessage(text) {
        const newMessage = {
            id: Date.now(),
            author: "sender",
            text,
            hour: new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((currentMessages) => {
            const updated = [...currentMessages, newMessage];
            localStorage.setItem('g6_chat_messages', JSON.stringify(updated));
            return updated;
        });
    }

    return (
        <StyledChat>
            <Header />
            <Wrapper>
                <h1 className="recipient-username">Pessoa</h1>
                <div className="chat-container" ref={chatContainerRef}>
                    {messages.map((message) =>
                        message.author === "recipient" ? (
                            <RecipientMessage
                                key={message.id}
                                text={message.text}
                                hour={message.hour}
                            />
                        ) : (
                            <SenderMessage
                                key={message.id}
                                text={message.text}
                                hour={message.hour}
                            />
                        )
                    )}
                </div>
            </Wrapper>
            <MessageInput onSendMessage={handleSendMessage} />
        </StyledChat>
    );
}
