import { StyledConversationWrapper } from '../styles/ConversationWrapperStyles.js';
import ChatListElement from "./ChatListElement.jsx";
import Wrapper from "./Wrapper.jsx";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";
import MessageInput from './MessageInput.jsx';
// Conversation Page

export default function ConversationWrapper() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem('g6_chat_messages');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [selectedChat, setSelectedChat] = useState(false);
    const desktopMessagesRef = useRef(null);

    useEffect(() => {
        if (desktopMessagesRef.current) {
            desktopMessagesRef.current.scrollTo({ top: desktopMessagesRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleChatClick = () => {
        if (window.matchMedia('(min-width: 769px)').matches) {
            setSelectedChat(true);
            return;
        }

        navigate('/message/chat');
    }

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
        <StyledConversationWrapper>
            <Wrapper className="main">
                <aside className="chat-list-panel">
                    <h1 className="chat-list-title">Conversas</h1>
                    <div className="chats-group">
                        <ChatListElement onlyClick={handleChatClick}/>
                        <ChatListElement onlyClick={handleChatClick}/>
                        <ChatListElement onlyClick={handleChatClick}/>
                    </div>
                    <div className='ghost-element'></div>
                </aside>
                <div className="desktop-chat">
                    {selectedChat ? (
                        <>
                            <h1 className="recipient-username">Pessoa</h1>
                            <div className="desktop-messages" ref={desktopMessagesRef}>
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
                            <MessageInput className="desktop-message-input" onSendMessage={handleSendMessage} />
                        </>
                    ) : (
                        <p className="desktop-empty-message">
                            Selecione uma conversa<br />para começar
                        </p>
                    )}
                </div>
            </Wrapper>
        </StyledConversationWrapper>
    )
}
