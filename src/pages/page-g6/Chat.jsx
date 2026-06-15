import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MessageInput from './components/MessageInput';
import { StyledChat } from "./ChatStyled";
import SenderMessage from "./components/SenderMessage";
import RecipientMessage from "./components/RecipientMessage";
import { connectWebSocket, disconnectWebSocket, sendWebSocketMessage } from "../../services/webSocket.js";
import { getMessages } from "../../services/chatData.js";

export default function Chat() {
    const location = useLocation();
    const { tokenInput, userId, conversationId, receiverId, receiverUserName  } = location.state || {};

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        if(!tokenInput) {
            return console.log("Não há um token para se conectar ao WebSocket!");
        }

        connectWebSocket(tokenInput, (message) => {
            const messageBody = JSON.parse(message.body);
            setMessages((currentMessages) =>
                [...currentMessages, messageBody]);
        });

        return () => {
            void disconnectWebSocket();
        }
    }, [tokenInput, conversationId]);

    useEffect(() => {

        if(!tokenInput) {
            return console.log("Não há um token se para conectar à API!");
        }

        getMessages(tokenInput, conversationId)
            .then((data) => {
                setMessages(data);
            });

    }, [tokenInput, conversationId]);

    function handleSendMessage(text) {
        const newMessage = {
            id: Date.now(),
            sender: {
                id: userId
            },
            content: text,
            sentAt: new Date().toISOString()
        }

        setMessages((currentMessages) => [...currentMessages, newMessage]);

        sendWebSocketMessage(text, receiverId, conversationId);
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        return date.toLocaleString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    return (
        <StyledChat>
            <Header />
            <Wrapper>
                <h1 className="recipient-username">{receiverUserName}</h1>
                <div className="chat-container">
                    {messages.map((message) =>
                        message.sender.id === userId ? (
                            <SenderMessage
                                key={message.id}
                                text={message.content}
                                hour={formatTimestamp(message.sentAt)}
                            />
                        ) : (
                            <RecipientMessage
                                key={message.id}
                                text={message.content}
                                hour={formatTimestamp(message.sentAt)}
                            />
                        )
                    )}
                </div>
            </Wrapper>
            <MessageInput onSendMessage={handleSendMessage} />
        </StyledChat>
    );
}
