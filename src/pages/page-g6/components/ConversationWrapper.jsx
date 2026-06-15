import { StyledConversationWrapper } from '../styles/ConversationWrapperStyles.js';
import ChatListElement from "./ChatListElement.jsx";
import Wrapper from "./Wrapper.jsx";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";
import MessageInput from './MessageInput.jsx';
import { connectWebSocket, sendWebSocketMessage, disconnectWebSocket } from "../../../services/webSocket.js";
import { getUserId, getChatList , getMessages} from "../../../services/chatData.js";
// Conversation Page

export default function ConversationWrapper() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(false);
    const [userId, setUserId] = useState("");
    const [conversationId, setConversationId] = useState("");
    const [conversationList, setConversationList] = useState([]);
    const [receiverId, setReceiverId] = useState("");
    const [receiverUserName, setReceiverUserName] = useState("");

    const tokenInput = localStorage.getItem("token");

    useEffect(() => {

        if(!tokenInput) {
            return console.log("Não há um token para se conectar ao WebSocket!");
        }

        connectWebSocket(tokenInput, (message) => {
            const messageBody = JSON.parse(message.body);
            setMessages((currentMessages) =>
                [...currentMessages, messageBody]);
        }, (conversation) => {
            const conversationBody = JSON.parse(conversation.body);
            setConversationList((currentConversations) =>
                [conversationBody, ...currentConversations]);
        });

        return () => {
            void disconnectWebSocket();
        }
    }, [tokenInput]);

    useEffect(() => {

        if(!tokenInput) {
            return console.log("Não há um token se para conectar à API!");
        }

        getUserId(tokenInput)
            .then((data) => {
                setUserId(data);
            });

        getChatList(tokenInput)
            .then((data) => {
                setConversationList(data);
            });
    }, [tokenInput]);

    const handleChatClick = (conversationId, receiverId, receiverUserName) => {
        if (window.matchMedia('(min-width: 769px)').matches) {
            setSelectedChat(true);
            setConversationId(conversationId);
            setReceiverId(receiverId);
            setReceiverUserName(receiverUserName);

            getMessages(tokenInput, conversationId)
                .then((data) => {
                    setMessages(data);
                });
            return;
        }

        navigate('/message/chat', {
            state: {
                tokenInput: tokenInput,
                userId: userId,
                conversationId: conversationId,
                receiverId: receiverId,
                receiverUserName: receiverUserName
            }
        });
    }

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
        <StyledConversationWrapper>
            <Wrapper className="main">
                <aside className="chat-list-panel">
                    <h1 className="chat-list-title">Conversas</h1>
                    <div className="chats-group">
                        {conversationList.map((conversation) => (
                            <ChatListElement
                                key={conversation.id}
                                onlyClick={() => handleChatClick(conversation.id,
                                    userId === conversation.adopter?.id ?
                                    conversation.owner?.id :
                                    conversation.adopter?.id,
                                    userId === conversation.adopter?.id ?
                                    conversation.owner?.fullName :
                                    conversation.adopter?.fullName)}
                                userName={userId === conversation.adopter?.id ?
                                    conversation.owner?.fullName :
                                    conversation.adopter?.fullName}
                                lastMessage={conversation.lastMessage}
                                lastMessageAt={formatTimestamp(conversation.lastMessageAt)}/>
                            )
                        )}
                    </div>
                    <div className='ghost-element'></div>
                </aside>
                <div className="desktop-chat">
                    {selectedChat ? (
                        <>
                            <h1 className="recipient-username">{receiverUserName}</h1>
                            <div className="desktop-messages">
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
