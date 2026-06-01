import { StyledConversationWrapper } from '../styles/ConversationWrapperStyles.js';
import ChatListElement from "./ChatListElement.jsx";
import Wrapper from "./Wrapper.jsx";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, Fragment } from "react";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";
import MessageInput from './MessageInput.jsx';
import { useMessages } from '../context/MessagesContext.jsx';
// Conversation Page

export default function ConversationWrapper() {
    const navigate = useNavigate();
    const { messages, setMessages, selectedChatId, setSelectedChatId, chatList, setChatList, markChatAsRead } = useMessages();
    const [selectedChat, setSelectedChat] = useState(false);
    const desktopMessagesRef = useRef(null);
    const currentChat = chatList.find((chat) => chat.id === selectedChatId);
    const firstNewMessageIndex = messages.findIndex((message) => message.isNew);
    const showNewMessageDivider = currentChat?.hasUnread && firstNewMessageIndex !== -1;

    useEffect(() => {
        const el = desktopMessagesRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId);

        if (window.matchMedia('(min-width: 769px)').matches) {
            setSelectedChat(true);
            return;
        }

        navigate('/message/chat');
    }

    function handleSendMessage(text) {
        const hour = new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const newMessage = {
            id: Date.now(),
            author: "sender",
            text,
            hour,
        };

        setMessages((currentMessages) => [
            ...currentMessages.map((message) =>
                message.isNew ? { ...message, isNew: false } : message
            ),
            newMessage,
        ]);
        setChatList((currentChats) =>
            currentChats.map((chat) =>
                chat.id === selectedChatId
                    ? { ...chat, hasUnread: false, lastMessage: text, lastTime: hour }
                    : chat
            )
        );
    }

    return (
        <StyledConversationWrapper>
            <Wrapper className="main">
                <aside className="chat-list-panel">
                    <h1 className="chat-list-title">Conversas</h1>
                    <div className="chats-group">
                        {chatList.map((chat) => (
                            <ChatListElement
                                key={chat.id}
                                onlyClick={() => handleChatClick(chat.id)}
                                username={chat.username}
                                lastMessage={chat.lastMessage}
                                lastTime={chat.lastTime}
                                hasUnread={chat.hasUnread}
                            />
                        ))}
                    </div>
                    <div className='ghost-element'></div>
                </aside>
                <div className="desktop-chat">
                    {selectedChat ? (
                        <>
                            <h1 className="recipient-username">Pessoa</h1>
                            <div className="desktop-messages" ref={desktopMessagesRef}>
                                <div style={{ flex: 1 }} />
                                {messages.map((message, index) => (
                                    <Fragment key={message.id}>
                                        {showNewMessageDivider && message.isNew && index === firstNewMessageIndex && (
                                            <div className="new-message-divider">
                                                <span>Nova Mensagem</span>
                                            </div>
                                        )}
                                        {message.author === "recipient" ? (
                                            <RecipientMessage
                                                text={message.text}
                                                hour={message.hour}
                                            />
                                        ) : (
                                            <SenderMessage
                                                text={message.text}
                                                hour={message.hour}
                                            />
                                        )}
                                    </Fragment>
                                ))}
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
