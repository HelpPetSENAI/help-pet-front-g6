import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MessageInput from './components/MessageInput';
import { StyledChat } from "./ChatStyled";
import SenderMessage from "./components/SenderMessage";
import RecipientMessage from "./components/RecipientMessage";
import { useMessages } from "./context/MessagesContext";

export default function Chat() {
    const { messages, setMessages } = useMessages();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

        setMessages((currentMessages) => [...currentMessages, newMessage]);
    }

    return (
        <StyledChat>
            <Header />
            <Wrapper>
                <h1 className="recipient-username">Pessoa</h1>
                <div className="chat-container">
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
                    <div ref={messagesEndRef} />
                </div>
            </Wrapper>
            <MessageInput onSendMessage={handleSendMessage} />
        </StyledChat>
    );
}
